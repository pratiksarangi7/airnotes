import React, { useEffect } from "react";
import LeaderDetails from "../components/leader_details";
import { useFirebase } from "../context/firebase";

function LeaderBoard() {
  return (
    <div className="w-full h-full p-10">
      <h1 className="text-5xl text-center font-outfit font-bold text-teal-700">
        Top Contributors
      </h1>
      <div className="h-10"></div>
      <LeaderDetails />
    </div>
  );
}

export default LeaderBoard;
