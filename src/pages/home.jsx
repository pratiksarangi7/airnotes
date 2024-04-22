import React from "react";
import { SearchBar } from "../components/search_bar";
import NotesArea from "../components/notes_area";
function HomeScreen() {
  return (
    <div className="flex flex-col gap-8 w-full h-full px-10 py-8">
      <SearchBar />
      <NotesArea />
    </div>
  );
}

export default HomeScreen;
