import type { NextApiRequest, NextApiResponse } from "next";
import * as Crypto from "crypto-js";

const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

type Data = {
  data: any;
};

const getHTML = async () => {
  try {
    return await axios({
      url: process.env.NEXT_PUBLIC_DATA_FROM,
      method: "get",
      responseType: "arraybuffer",
    });
  } catch (error) {
    console.log(error);
  }
};

const parsing = async () => {
  const html = await getHTML();
  const $ = cheerio.load(iconv.decode(html.data, "euc-kr"));

  const tableData = $(
    `body > table > tbody > tr > td:nth-child(2) > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td > div > table > tbody`
  );
  const dataArr = [];
  var num;
  for (num = 3; num <= 96; num++) {
    const rowData = tableData.find(`tr:nth-of-type(${num})`).text();
    const replacedData = rowData;
    dataArr.push(replacedData);
  }
  return dataArr;
};

export default async function getData(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (res.statusCode === 200) {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY
      ? process.env.NEXT_PUBLIC_SECRET_KEY
      : "";
    const dataArr = await parsing();
    const ciphertext = Crypto.AES.encrypt(
      dataArr
        .join("| ")
        .split("| ")
        .filter((v) => !v.includes("주유") && !v.includes("기프트"))
        .filter(
          (v) =>
            v.includes("현대") ||
            v.includes("신세계") ||
            v.includes("관광") ||
            v.includes("롯데") ||
            v.includes("갤러리아")
        )
        .join("| ")
        .replace(/\n\t\t\t\t\t/g, "")
        .replace(/     /g, "")
        .toString(),
      secretKey
    ).toString();

    res.status(200).json({
      data: ciphertext,
    });
  }
}
