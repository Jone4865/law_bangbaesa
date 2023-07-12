import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./PolicyModal.module.scss";
import className from "classnames/bind";
import { FIND_MANY_POLICY } from "src/graphql/query/findManyPolicy";
import { useLazyQuery } from "@apollo/client";
import { PolicyKind } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

type Props = {
  visible: boolean;
  partName: PolicyKind;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function PolicyModal({ visible, partName, setVisible }: Props) {
  const [policyContent, setPolicyContent] = useState("");

  const formattedContent = policyContent?.replace(/(?:\r\n|\r|\n)/g, "<br>");

  const [findManyPolicy] = useLazyQuery(FIND_MANY_POLICY, {
    onCompleted(data) {
      setPolicyContent(
        data.findManyPolicy.policies.filter((v) => v.policyKind === partName)[0]
          .content
      );
    },
  });

  useEffect(() => {
    findManyPolicy({
      variables: {
        take: 10,
        skip: 0,
        searchText: "",
      },
    });
  }, []);

  return (
    <div className={cx("container")} onClick={() => setVisible(false)}>
      <div onClick={(e) => e.stopPropagation()} className={cx("wrap")}>
        <div className={cx("top_title")}>
          {partName === PolicyKind.TermsAndConditions
            ? "서비스 이용약관"
            : "개인정보 처리방침"}
        </div>
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
        <div className={cx("btn_wrap")}>
          <button className={cx("btn")} onClick={() => setVisible(false)}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
