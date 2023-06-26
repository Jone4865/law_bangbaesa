import { useLazyQuery } from "@apollo/client";
import styles from "./RoomSide.module.scss";
import className from "classnames/bind";
import { FIND_MANY_CHAT_ROOM_BY_USER } from "../../../src/graphql/generated/query/findManyChatRoomByUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

const cx = className.bind(styles);

type Data = {
  id: number;
  createdAt: string;
  otherIdentity: string;
  offerId: number;
  isNewChatMessage: boolean;
  isUnread: boolean;
};

type Props = {
  onClickRoomId: (id: number) => void;
  setOfferId: React.Dispatch<React.SetStateAction<number>>;
};

export default function RoomSide({ onClickRoomId, setOfferId }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Data[]>([]);
  const [take, setTake] = useState(10);

  const [nextRef, nextView] = useInView({
    threshold: 1,
  });

  const [findManyChatRoomByUser] = useLazyQuery(FIND_MANY_CHAT_ROOM_BY_USER, {
    onError: (e) => toast.error(e.message ?? `${e}`),
    onCompleted(data) {
      setData(data.findManyChatRoomByUser.chatRooms);
      setOfferId(
        data.findManyChatRoomByUser.chatRooms.find(
          (v: any) => router.query.id && v.id === +router.query.id
        ).offerId
      );
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    findManyChatRoomByUser({
      variables: {
        take,
        cursorId: data.length > 0 ? data[data.length - 1].id : null,
      },
    });
  }, [nextView]);

  return (
    <div className={cx("container")}>
      {data.map((v) => (
        <div
          className={cx("chat")}
          key={v.id}
          onClick={() => onClickRoomId(v.id)}
        >
          <div className={cx("img_wrap")}>
            {v.isNewChatMessage && <div className={cx("circle")} />}
            <Image fill alt="프로필 이미지" src={"/img/chat/profile.png"} />
          </div>
          <span>{v.otherIdentity}</span>
        </div>
      ))}
      <div ref={nextRef} />
    </div>
  );
}
