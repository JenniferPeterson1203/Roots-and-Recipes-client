import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../helpers/firebase";
import { register } from "../helpers/register";

function Register() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    nickname: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleClearState = () => {
    setNewUser({
      email: "",
      last_name: "",
      photo: "",
      nickname: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(newUser);
    try {
      const { email, password, nickname } = newUser;
      // createUser in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        nickname
      );

      // you need the JWT token to authenticate protected routes on the backend
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      const { uid, photoURL } = auth.currentUser;

      if (uid) {
        //register first
        const retrievedUser = await register(newUser, photoURL, uid);
        // no sign in the new user with signInWithEmailAndPassword
        if (retrievedUser.uid) {
          await signInWithEmailAndPassword(auth, email, password);

          handleClearState();
          toast.success("User Registered Successfully!!", {
            position: "top-center",
          });
          navigate("/home");
        } else {
          toast.error("User Not Found", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    // style={{ textAlign: "center" }}
    <div className="text-center ">
      <form onSubmit={handleRegister}>
        <h3>
          <span className="bg-orange-300 text-white">Roots & Recipes</span>
        </h3>
        <div>
          <label htmlFor="first_name">
            First Name:{" "}
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
              value={newUser.first_name}
              onChange={handleChange}
              required
            />
          </label>

          {/* <label htmlFor="last_name">
            Last Name:{" "}
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
              value={newUser.last_name}
              onChange={handleChange}
            />
          </label> */}

          <label htmlFor="email">
            Email Address:{" "}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={handleChange}
              required
            />
          </label>
          {/*Nickname */}
          <label htmlFor="nickname">
            Username:{" "}
            <input
              type="nickname"
              id="nickname"
              name="nickname"
              placeholder="Enter username"
              value={newUser.nickname}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="password">
            Password:{" "}
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" style={{ width: 140 }}>
            Sign Up
          </button>
        </div>
        <p>
          Already registered <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
