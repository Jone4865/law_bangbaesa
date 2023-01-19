import "../public/fonts/style.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const AppKey = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}`;
  return (
    <>
      <Head>
        <title>방배사</title>
        <meta name="Keywords" content="bangbaesa" />
        <meta name="Keywords" content="bangbae" />
        {/* <meta property="og:url" content="http://realfiex.com/" /> */}
        <meta property="og:title" content="방배사" />
        <meta property="og:description" content="방배사, 기쁨을 선물하세요." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:article:author"
          content="방배사, 기쁨을 선물하세요."
        />
        {/* <meta property="og:image" content="/img/meta_img.png" /> */}
        {/* <meta property="og:image:width" content="450" /> */}
        {/* <meta property="og:image:height" content="260" /> */}

        <script type="text/javascript" src={AppKey}></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
