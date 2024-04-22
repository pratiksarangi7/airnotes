import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { useRecentUploads } from "../context/recent_uploads";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllUploads } = useFirebase(); // get the firebase function
  const [searchResults, setSearchResults] = useState([]);
  const { setRecentUploadsList } = useRecentUploads();
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm) {
        const uploads = await getAllUploads();
        // console.log("searchTerm: ", searchTerm);
        const results = uploads.filter((upload) =>
          upload.fileName
            .split(" ")
            .slice(0, -1)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        console.log("results", results);
        setSearchResults(results);
        setRecentUploadsList(results);
      } else {
        console.log(`${searchTerm} not found`);
        setSearchResults([]);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, getAllUploads]);

  return (
    <div className="flex w-auto items-center space-x-2">
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Enter file name"
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <button
        type="button"
        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        <Search />
      </button>
    </div>
  );
}
