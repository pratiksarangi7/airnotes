import React from "react";
import Login from "../components/login";
import Register from "../components/register";
function LoginRegisterBase({ showLogin }) {
  return (
    <div className="flex items-center text-primary-content  bg-primary h-full w-full px-10 py-15">
      <div className="w-1/2">
        <h1 className="text-7xl py-3 ">AirNotes</h1>

        <h3 className="text-2xl ">
          Share and Learn Together. Your Notes, Your Community, Your Success!
        </h3>
      </div>
      <div className=" h-full w-1/2 flex justify-center items-center">
        {showLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default LoginRegisterBase;
