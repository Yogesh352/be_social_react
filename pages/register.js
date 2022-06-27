import { Grid, Typography} from "@material-ui/core";
import RegisterForm from "../src/components/Register/RegisterForm";
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
          <Typography variant = "h4">
            Create an Account
          </Typography>
          <RegisterForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;