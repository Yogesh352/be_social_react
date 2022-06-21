import Layout from "../src/components/Layout/Layout";
import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const excludedRoutes = ['/login', '/']
  const showLayout = excludedRoutes.includes(router.pathname) ? false : true;
  console.log(router.pathname);
  return showLayout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;

