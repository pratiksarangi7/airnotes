import { CircleUserRound, Delete, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";

function Profile() {
  const [userData, setUserData] = useState({});
  const firebase = useFirebase();
  useEffect(() => {
    const fetchUserData = async () => {
      if (firebase.user) {
        const data = await firebase.getUserData(firebase.user);
        setUserData(data);
      }
    };

    fetchUserData();
  }, [firebase]);

  const handleDelete = (file) => {
    console.log(`Delete ${file}`);
    // Add your delete logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl w-auto">
        <div className="flex items-center space-x-4">
          <CircleUserRound size={50} />
          <div>
            <h2 className="text-xl font-bold">{userData.email}</h2>
            <p className="text-sm text-gray-500">
              Total Views: {userData.downloadCount}
            </p>
            <p className="text-sm text-gray-500">
              Total Uploads till date: {userData.uploadCount}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Upload History: </h3>
          <table className="mt-4 min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start">File Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userData.files &&
                userData.files.map((file, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 ">
                      {file.split(" ").slice(0, -1).join(" ")}
                    </td>
                    <td className="px-4 py-2 flex justify-end">
                      <button
                        onClick={() => handleDelete(file)}
                        className="px-2 py-1 flex justify-center  text-white rounded"
                      >
                        <Trash2 color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;
