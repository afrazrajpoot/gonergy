// import node module libraries
import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Analytics } from "@vercel/analytics/react";
import axios from "axios";

// import theme style scss file
import "styles/theme.scss";

// import default layouts
import DefaultDashboardLayout from "layouts/DefaultDashboardLayout";
import { useEffect } from "react";
import { GlobalStateProvider } from "context/useGlobalState";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "GOENERGEE ADMIN ";
  const description = "DESIGNED BY PayMax ";
  const keywords = "Web Design";

  // Identify the layout, which will be applied conditionally
  const Layout =
    Component.Layout ||
    (router.pathname.includes("dashboard")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

  const getToken = async () => {
    try {
      const response = await axios.post(
        "https://dev-wtsepgno2gcc1wq8.us.auth0.com/oauth/token",
        {
          grant_type: "client_credentials",
          client_id: "1UGgHjaTgQ1PIUiRQUpgIV4IVSnwMmBY",
          client_secret:
            "K4LN8LWRFFuVAQ90SsgIeddd3RLXf67Prk0gg1RShnEPjzGX2Gd8_-g_346nmjpD",
          audience: "hello_identifier",
          code: "dZXAL9RY1KHq-_-lGJA5JfV0UaMpAyhHyQ97yTL6zLfbx",
          redirect_uri: "https://google.com",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "ACCESS_TOKEN",
        JSON.stringify(response?.data?.access_token)
      ); // Handle the response data here
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Call the getToken function to make the request
  useEffect(() => {
    getToken();
  }, []);

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName,
        }}
      />
      <Layout>
        <GlobalStateProvider>
          <Component {...pageProps} />
        </GlobalStateProvider>

        <Analytics />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
