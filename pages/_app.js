import Layout from "../src/components/Layout/Layout";
import "../styles/globals.css";
import { useRouter } from "next/router";
import AuthProvider from "../src/context/auth";
import PrivateRoute from "../HOC/PrivateRoute/PrivateRoute";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const excludedRoutes = ["/login", "/", "/register"];
  const showLayout = excludedRoutes.includes(router.pathname) ? false : true;
  return showLayout ? (
    <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    
    </AuthProvider>
  ) : (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
