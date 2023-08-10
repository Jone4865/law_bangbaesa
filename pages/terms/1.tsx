import react, { useEffect, useState } from "react";
import router from "next/router";
import styles from "./Terms.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import { FIND_MANY_POLICY } from "src/graphql/query/findManyPolicy";
import { PolicyKind } from "src/graphql/generated/graphql";

const cx = className.bind(styles);

export default function Terms() {
  const [policyContent, setPolicyContent] = useState("");

  const formattedContent = policyContent?.replace(/(?:\r\n|\r|\n)/g, "<br>");

  const [findManyPolicy] = useLazyQuery(FIND_MANY_POLICY, {
    onCompleted(data) {
      setPolicyContent(
        data.findManyPolicy.policies.filter(
          (v) => v.policyKind === PolicyKind.TermsAndConditions
        )[0].content
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
    <div className={cx("container")}>
      <div className={cx("logo_wrap")}>
        <div className={cx("terms_logo")}>
          <Image
            src="/img/logo/logo_on.png"
            alt="약관로고"
            fill
            priority
            quality={100}
          />
        </div>
      </div>
      <div className={cx("terms_body")}>
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </div>
      <div className={cx("btn_wrap")}>
        <button className={cx("button")} onClick={() => router.push("/")}>
          확인
        </button>
      </div>
    </div>
  );
}
