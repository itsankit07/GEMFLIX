import { AuthForm } from "../../components/Authentication";
import { BackgroundImage } from "../../types/constants";

import * as styles from "./Login.module.scss";

export const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageDiv}>
        <img src={BackgroundImage} alt="bg-img" className={styles.image} />
      </div>

      <div className={styles.authForm}>
        <AuthForm />
      </div>
    </div>
  );
};
