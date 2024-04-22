import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginRegisterBase from "./pages/login_register_base";
import HomeScreen from "./pages/home";
import { Outlet } from "react-router-dom";
import { MySideBar } from "./components/side_bar";
import LeaderBoard from "./pages/leaderboard";
import Profile from "./pages/profile";

function Layout() {
  return (
    <div className="flex">
      <MySideBar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<LoginRegisterBase showLogin={true} />} />
        <Route path="/app" element={<Layout />}>
          <Route path="home" element={<HomeScreen />} />
          <Route path="profile" element={<Profile />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
        </Route>

        <Route path="/login" element={<LoginRegisterBase showLogin={true} />} />
        <Route path="/register" element={<LoginRegisterBase />} />
      </Routes>
    </div>
  );
}

export default App;
