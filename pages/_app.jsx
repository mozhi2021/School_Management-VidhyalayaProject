import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import theme from "../styles/theme";
import "/styles/globals.css";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script
          src="https://content.digitaldisbursements.com/v1.4.3/assets/host.js"
          async
        ></script>
        {/* <title>{CaseInfo.CaseName}</title> */}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}
