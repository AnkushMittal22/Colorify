import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionTaker } from "../../store/redux";
import { useHistory } from "react-router-dom";
import style from "./SignInUp.module.css";

// import axios from "axios";
const SignInUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [enterEmail, setEnterdEmail] = useState("");
  const [enterPassword, setenterPassword] = useState("");
  const [isValid, setisValid] = useState(true);

  const emailHandler = (event) => {
    setEnterdEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setenterPassword(event.target.value);
  };

  const signUpHanlder = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBio3H7WwyutXnSacjcU8l2bi-C21XZ-OQ",
        {
          email: enterEmail,
          password: enterPassword,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response);
        const uId = response.data.localId;
        localStorage.setItem("user", uId);
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        alert(error.response.data.error.message);
      });
  };
  const signInHandler = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBio3H7WwyutXnSacjcU8l2bi-C21XZ-OQ",
        {
          email: enterEmail,
          password: enterPassword,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        console.log(response);
        const uId = response.data.localId;
        localStorage.setItem("user", uId);
        history.replace("/home");
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        alert(error.response.data.error.message);
      });
  };

  return (
    <div className={style.signInUp}>
      <div>
        <p>COLORIFY</p>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" id="email" onChange={emailHandler} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" id="password" onChange={passwordHandler} />
      </div>
      <div className={style.action_sign}>
        <div>
          <button onClick={signUpHanlder}>Sign Up</button>
        </div>
        <div>
          <button onClick={signInHandler}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
