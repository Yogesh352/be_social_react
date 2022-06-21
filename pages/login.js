import { Grid, Typography, Stack } from "@material-ui/core";
import LoginForm from "../src/components/Login/LoginForm";
import styles from "../styles/Login.module.css"

const Login = () => {
  return (
    <div className={styles.overallLoginPage}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography>
            <span>Welcome to </span>{" "}
            <span className="text-2xl text-blue-600 font-bold"> BeSocial</span>{" "}
          </Typography>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
