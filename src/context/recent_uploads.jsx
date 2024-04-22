import React, { createContext, useContext, useState } from "react";

const RecentUploadsContext = createContext(null);

export const useRecentUploads = () => useContext(RecentUploadsContext);

function RecentUploadsProvider(props) {
  const [recentUploadsList, setRecentUploadsList] = useState([]);
  return (
    <RecentUploadsContext.Provider
      value={{ recentUploadsList, setRecentUploadsList }}
    >
      {props.children}
    </RecentUploadsContext.Provider>
  );
}

export default RecentUploadsProvider;
