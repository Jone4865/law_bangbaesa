import react, { useEffect, useState } from "react";
import router from "next/router";
import styles from "./Terms.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import MarketPrice from "components/MarketPrice/MarketPrice";

const cx = className.bind(styles);

export default function test() {
  function rsaEncryptionWithPublicKey(text: string) {
    const publicKey = process.env.NEXT_PUBLIC_BACK_SECRET_KEY;
    const NodeRSA = require("node-rsa");
    const key = new NodeRSA();
    key.importKey(publicKey, "pkcs8-public-pem");

    return key.encrypt(text, "base64");
  }

  const encryptedText = rsaEncryptionWithPublicKey("dd1");

  useEffect(() => {
    console.log(encryptedText);
  }, []);

  return (
    <div>
      <MarketPrice />
    </div>
  );
}
