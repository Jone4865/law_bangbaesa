import { useLazyQuery } from "@apollo/client";
import styles from "./RoomSide.module.scss";
import className from "classnames/bind";
import { FIND_MANY_CHAT_ROOM_BY_USER } from "../../../src/graphql/query/findManyChatRoomByUser";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { FindManyChatRoomByUserQuery } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  onClickRoomId: (id: number) => void;
};

export default function RoomSide({ onClickRoomId }: Props) {
  const router = useRouter();
  const [data, setData] = useState<
    FindManyChatRoomByUserQuery["findManyChatRoomByUser"]["chatRooms"]
  >([]);
  const [take, setTake] = useState(10);

  const [nextRef, nextView] = useInView({
    threshold: 1,
  });

  const [findManyChatRoomByUser] = useLazyQuery<FindManyChatRoomByUserQuery>(
    FIND_MANY_CHAT_ROOM_BY_USER,
    {
      onError: (e) => toast.error(e.message ?? `${e}`),
      onCompleted(data) {
        setData(data.findManyChatRoomByUser.chatRooms);
      },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    findManyChatRoomByUser({
      variables: {
        take,
        cursorId: data.length > 0 ? data[data.length - 1]?.id : undefined,
        offerId: 14,
      },
    });
  }, [nextView, router.pathname]);

  useEffect(() => {}, [data]);

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
            <Image
              fill
              alt="프로필 이미지"
              src={"/img/chat/profile.png"}
              priority
              quality={100}
            />
          </div>
          <span>{v.otherIdentity}</span>
        </div>
      ))}
      <div ref={nextRef} />
    </div>
  );
}
