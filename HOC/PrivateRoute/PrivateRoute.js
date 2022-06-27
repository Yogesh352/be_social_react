import { useContext, } from "react";
import { AuthContext } from "../../src/context/auth";
import { useRouter } from "next/router"

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const Router = useRouter();
  if(user){
      return<>{children}</>
  } else{
      Router.push("/login");
      return <></>
  }
};

export default PrivateRoute;
