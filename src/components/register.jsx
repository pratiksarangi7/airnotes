import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  useEffect(() => {
    if (firebase.user) navigate("/app/home");
  });
  return (
    <div className="flex rounded-3xl flex-col  p-5 bg-white">
      <h1 className="text-gray-900 text-4xl text-center pt-2">
        GET REGISTERED
      </h1>
      <h4 className="text-gray-900 text-center p-1">
        Please enter your details
      </h4>
      <p className="text-gray-700 px-3 text-sm pt-9 pb-0.5">email</p>
      <input
        type="text"
        className="border border-gray-400 p-2 w-96 rounded-3xl text-gray-600"
        placeholder="Enter your username"
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="text-gray-700 px-3 pt-7 pb-0.5 text-sm">password</p>
      <input
        type="password"
        className="border border-gray-400 p-2 rounded-3xl text-gray-600"
        placeholder="enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="mt-16 mb-2 rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={async () => {
          try {
            console.log("signup start!");
            const result = await firebase.signupUserWithEmailPass(
              email,
              password
            );
            console.log(result);
          } catch (e) {
            alert(`An error occured: ${e.message}`);
          }
        }}
      >
        Register
      </button>
      <button
        type="button"
        onClick={() => {
          try {
            firebase.signInWithGoogle();
          } catch (e) {
            alert(`An error occured: ${e.message}`);
          }
        }}
        className=" mt-3 border-2 rounded-xl border-gray-400 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Signup with google
      </button>
      <div className="flex justify-center pt-6 ">
        <span className="text-gray-900 px-3">Already have an account? </span>
        <a href="/login" className="text-secondary">
          login now!
        </a>
      </div>
    </div>
  );
}

export default Register;
