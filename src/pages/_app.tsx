import "@/styles/globals.css";
import store from "lib/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#c2cb16",
          colorInfo: "#c2cb16",
        },
        components: {
          Button: {
            primaryColor: "rgb(0,0,0)",
            paddingBlock: 20,
            paddingInline: 25,
            fontWeight: 500,
          },
          Input: {
            paddingBlock: 10,
            colorBgContainer: "rgb(243,244,246)",
            colorIcon: "rgb(194,203,22)",
            colorIconHover: "rgb(194,203,22)",
          },
          Typography: {
            marginXS: 1,
            marginXXS: 1,
            paddingSM: 1,
            titleMarginBottom: "0",
            titleMarginTop: "0",
          },
        },
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ConfigProvider>
  );
}
