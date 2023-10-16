import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = userNameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setLoading(true);
    let url = "http://localhost:9092/authenticate";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const expirationTime = new Date(new Date().getTime() + 900 * 1000);
        authCtx.login(data.jwtToken, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input ref={userNameRef} type="text" id="username" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request</p>}
          <button type="button" className={classes.toggle}></button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
