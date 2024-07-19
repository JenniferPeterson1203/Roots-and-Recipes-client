import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../helpers/firebase";
import { register } from "../helpers/register";
import { fetchUser } from "../helpers/fetchUser";

import googleBadge from "../assets/google.png";

async function handleGoogleSignIn() {
  const provider = new GoogleAuthProvider();
  try {
    // Sign into Firebase
    const { user } = await signInWithPopup(auth, provider);
    // Retrieve JWT token from firebase
    const token = await user.getIdToken();
    localStorage.setItem("token", token);

    // Check if user exists in your backend
    const foundUser = await fetchUser(user, token);
    if (!foundUser.uid) {
      // User does not exist in backend, create the user
      const { photoURL, uid } = user;
      await register(user, photoURL, uid);
    }

    // Return key/value to use for the navigate in the googleLogin function below
    return { navigateTo: "/profile" };
  } catch (error) {
    localStorage.removeItem("token");
    throw error;
  }
}

function SignInWithGoogle() {
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      const result = await handleGoogleSignIn();
      navigate(result.navigateTo);
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div
      className="flex justify-center mt-4 cursor-pointer"
      onClick={googleLogin}
    >
      <img src={googleBadge} className="w-48 h-12 bg-white" alt="Sign in with Google" />
    </div>
  );
}

export default SignInWithGoogle;
