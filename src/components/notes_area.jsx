import { RotateCcw, Upload } from "lucide-react";
import React, { useState } from "react";
import Modal from "./modal";
import UploadsTable from "./uploads_table";
import { useRecentUploads } from "../context/recent_uploads";
import { useFirebase } from "../context/firebase";

function NotesArea() {
  const [openModal, setOpenModal] = useState(false);
  const recentUploads = useRecentUploads();
  const firebase = useFirebase();

  return (
    <div className="flex flex-col gap-5 h-full w-full  ">
      <div className="flex justify-between">
        <div className="text-2xl">Recent Uploads</div>
        <div className="flex gap-3">
          <button
            className="rounded-lg bg-gray-100 p-2"
            onClick={async () => {
              const newData = await firebase.getAllUploads();
              recentUploads.setRecentUploadsList(newData);
            }}
          >
            <RotateCcw strokeWidth={1.5} size={18} />
          </button>
          <button
            type="button"
            className="flex gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => {
              console.log("opening modal!");
              setOpenModal(true);
              console.log("opened modal");
            }}
          >
            <Upload color="white" size={16} />
            Upload Notes
          </button>
        </div>
      </div>
      {openModal && <Modal closeModal={setOpenModal} />}
      <UploadsTable />
    </div>
  );
}

export default NotesArea;
