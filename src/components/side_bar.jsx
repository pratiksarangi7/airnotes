import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Newspaper,
  BellRing,
  Paperclip,
  User,
  HomeIcon,
  BarChartIcon,
  LogOut,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useFirebase } from "../context/firebase";

export function MySideBar() {
  const { logout } = useFirebase();
  const navigate = useNavigate();

  const location = useLocation();
  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <h1 className="text-3xl text-primary-dark font-semibold">AirNotes</h1>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <a
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                location.pathname === "/app/home" ? "bg-primary text-white" : ""
              }`}
              href="/app/home"
            >
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Home</span>
            </a>
            <a
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                location.pathname === "/app/profile"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="/app/profile"
            >
              <User className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </a>

            <a
              className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 ${
                location.pathname === "/app/leaderboard"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="/app/leaderboard"
            >
              <BarChartIcon className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Leader Board</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Paperclip className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Checklists</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              <LogOut className="h-5 w-5" color="red" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium text-red-500">
                Logout
              </span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
}
