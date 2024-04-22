import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import { useRecentUploads } from "../context/recent_uploads";

function Modal({ closeModal }) {
  const firebase = useFirebase();
  const recentUploads = useRecentUploads();
  const [fileName, setFileName] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    // fixed positions the element wrt the viewport, if fix is removed, the element is positioned wrt it's nearest ancestor
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-10">
      <div className="flex flex-col justify-between bg-white p-4 rounded-xl h-3/4 xl:w-1/4 lg:w-2/7 md:w-1/3  sm:w-1/2">
        <div className="flex flex-col gap-1 justify-center ">
          <h1 className="text-center text-3xl p-5">Upload Notes</h1>
          <div className="flex flex-col gap-1 h-auto p-2 ">
            <label className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              File Name
            </label>
            <input
              className="flex h-10 w-full rounded-lg border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter file name"
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 h-auto p-2 ">
            <label className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name
            </label>
            <input
              className="flex h-10 w-full rounded-lg border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter your name(visible to others)"
              onChange={(e) => setUploadedBy(e.target.value)}
            />
          </div>
          <input type="file" className="p-2" onChange={handleFileChange} />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md border border-primary-dark px-3 py-2 text-sm font-semibold text-primary-dark hover:border-primary-light hover:text-primary-light shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-light  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={async () => {
              try {
                await firebase.handleUpload(
                  file,
                  fileName,
                  uploadedBy,
                  firebase.user
                );
                const newData = await firebase.getAllUploads();
                recentUploads.setRecentUploadsList(newData);
              } catch (e) {
                alert(e);
              }
              closeModal(false);
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
