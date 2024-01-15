import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";

import Header from "@/components/layout/Header";
import CreateModal from "@/components/portal/CreateModal";
import CreateAlert from "@/components/portal/CreateAlert";
import Footer from "@/components/layout/Footer";
import CreateConfirm from "@/components/portal/CreateConfirm";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <html lang="ko">
        <body className={openSans.className}>
          <div id="modal" />
          <div id="back_drop" />
          <div id="confirm" />
          <div id="alert" />

          <Header />

          <main className="max-w-[1200px] mx-auto w-[90%] min-h-full">{children}</main>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
          <CreateModal />
          <CreateAlert />
          <CreateConfirm />
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
            strategy="beforeInteractive"
          />
          <Script src="https://cdn.iamport.kr/v1/iamport.js" />
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
