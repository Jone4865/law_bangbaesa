import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextRouter, useRouter } from "next/router";
import "../public/fonts/style.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import Header from "../components/Header/Header";
import Side from "../components/Side/Side";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import { useApollo } from "../src/config/apolloClient";

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & { router: NextRouter }) {
  return (
    <>
      <RecoilRoot>
        <InnerApp {...{ Component, pageProps, router }} />
      </RecoilRoot>
    </>
  );
}

function InnerApp({ Component, pageProps }: AppProps & { router: NextRouter }) {
  const [modal, setModal] = useState(false);
  const appRouter = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const apolloClient = useApollo(pageProps);

  const setModalState = (modal: boolean) => {
    setModal(modal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as HTMLElement)
    ) {
      toast.dismiss(); // 모든 토스트 메시지를 닫습니다.
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>방배사</title>
          <meta name="Keywords" content="bangbaesa" />
          <meta name="Keywords" content="bangbae" />
          <meta
            property="og:url"
            content={process.env.NEXT_PUBLIC_SURVICE_URL}
          />
          <meta property="og:title" content="방배사" />
          <meta
            property="og:description"
            content="방배사, 기쁨을 선물하세요."
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            property="og:article:author"
            content="방배사, 기쁨을 선물하세요."
          />
          <meta property="og:image" content="/img/meta_img.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="500" />
        </Head>
        <Header setModalState={setModalState} />
        <Side modal={modal} setModalState={setModalState} />
        <div
          ref={containerRef}
          onClick={handleClickOutside as (event: any) => void}
        >
          <Component {...pageProps} />
        </div>
        <Footer />
        <ToastContainer
          style={{
            wordBreak: "keep-all",
            width: "400px",
          }}
          position="top-center"
          autoClose={3000}
          pauseOnFocusLoss={false}
          hideProgressBar
          closeButton={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>닫기</div>
            </div>
          }
        />
      </ApolloProvider>
    </>
  );
}
