import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

function LeaderDetails() {
  const { getLeaderBoard } = useFirebase();
  const [leaders, setLeaders] = useState([]);
  const getSetLeaders = async () => {
    const leaderData = await getLeaderBoard();
    console.log(leaderData);
    setLeaders(leaderData);
  };

  useEffect(() => {
    getSetLeaders();
  }, []);

  return (
    <table className="min-w-full table-auto">
      <thead className="justify-between">
        <tr className="bg-primary">
          <th className="px-16 py-2">
            <span className="text-white">Rank</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-white">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-white">Number of Views</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {leaders.map((leader, index) => (
          <tr className="bg-white border-4 border-gray-200 " key={index}>
            <td className="px-16 py-2 text-center font-outfit font-medium text-2xl">
              {index + 1}
            </td>
            <td className="px-16 py-2 text-center font-outfit font-medium text-2xl">
              {leader.email}
            </td>
            <td className="px-16 py-2 text-center font-outfit font-medium text-2xl">
              {leader.downloadCount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderDetails;
