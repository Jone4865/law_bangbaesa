import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default function postQuestion(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: process.env.NEXT_PUBLIC_SEND_SITE,
    auth: {
      user: process.env.NEXT_PUBLIC_SEND_ADDRESS,
      pass: process.env.NEXT_PUBLIC_SEND_PASSWORD,
    },
  });

  if (req.body) {
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_SEND_ADDRESS,
      to: "bangbaesa@naver.com",
      subject: `${process.env.NEXT_PUBLIC_SURVICE_NAME} 문의 메일`,
      html: `<p><div>문의자 이메일 : ${
        JSON.parse(req.body).email
      }</div><div>문의 내용 : ${JSON.parse(req.body).content}</div>
    <div>연락처 : ${JSON.parse(req.body).cellPhone}</div></p>`,
    };

    transporter.sendMail(mailOptions, (err: any) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: res.statusCode.toString() });
      } else {
        res.status(200).json({ status: res.statusCode.toString() });
      }
    });
  }

  res.status(200).json({ status: res.statusCode.toString() });
}
