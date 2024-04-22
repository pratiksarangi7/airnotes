import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useFirebase } from "../context/firebase";
import { useRecentUploads } from "../context/recent_uploads";

function UploadsTable() {
  const firebase = useFirebase();
  const recentUploads = useRecentUploads();

  const getSetUploads = async () => {
    const uploads = await firebase.getAllUploads(10);
    console.log(uploads);
    recentUploads.setRecentUploadsList(uploads);
  };
  useEffect(() => {
    getSetUploads();
  }, []);

  return (
    <div className="w-full py-5">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="text-start font-outfit font-light w-1/2">Name</th>
            <th className="font-outfit font-light text-gray-700  pr-4 truncate max-w-40 ">
              Shared By
            </th>
            <th className="text-end font-outfit font-light pr-4">Share Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1" colSpan={3}></td>
          </tr>
          {recentUploads.recentUploadsList.map((upload, index) => (
            <tr key={index} className="border-b">
              <td className="font-outfit font-regular text-md text-gray-800 flex gap-3 pt-4  pb-4 w-full">
                {upload.fileName.split(" ").slice(0, -1).join(" ")}
              </td>
              <td className="font-outfit font-regular text-md text-gray-800 text-center pr-4 truncate max-w-40">
                {upload.uploadedBy}
              </td>
              <td className="font-outfit font-regular text-md text-gray-800 text-end pr-4">
                {upload.uploadedAt.toDate().toLocaleDateString()}
              </td>
              {/* Keep Download icon at the end */}
              <td className="font-outfit font-regular  flex items-center justify-end px-7">
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = upload.downloadUrl;
                    link.target = "_blank";
                    link.download = upload.fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    firebase.incrementDownloads(upload.uid, firebase.user.uid);
                  }}
                >
                  <ExternalLink size={22} strokeWidth={1.2} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UploadsTable;
