import { Outlet, useNavigate } from "react-router-dom";
import { BookingsIcon, FeedbackIcon, HomeIcon, LogoutIcon, NavItem, ProfileIcon, SessionHistoryIcon, SettingsIcon, TherapistIcon } from "./util";


const Layout = () => {
 const navigate = useNavigate();
 const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

 return (
    <div className="flex">
      {/* Sidebar */}
    <aside className="w-1/10 min-w-[200px] bg-white border-r flex flex-col justify-between">
        <div>
          <nav className="space-y-1">
            <NavItem
              label="home"
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
              onClick={() => navigate("/Landing")}
              icon={<HomeIcon />}
            />
            <NavItem
              label="profile"
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
              onClick={() => navigate("/Landing")}
              icon={<ProfileIcon />}
            />
            <NavItem
              label="session history"
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
              onClick={() => navigate("/session")}
              icon={<SessionHistoryIcon />}
            />
            <NavItem
              label="feedback"
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
              onClick={() => navigate("/Landing")}
              icon={<FeedbackIcon />}
            />
            <NavItem
              label="therapist"
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
              onClick={() => navigate("/therapists")}
              icon={<TherapistIcon />}
            />
              <NavItem
              label="bookings"
              className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
              onClick={() => navigate("/bookings")}
              icon={<BookingsIcon />}
            />
          </nav>
        </div>
        <div>
          <NavItem
            label="settings"
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
            onClick={() => navigate("/settings")}
            icon={<SettingsIcon />}
          />
          <NavItem
            label="log out"
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
            onClick={handleLogout}
            icon={<LogoutIcon />}
          />
          <div className="mt-4">
            <div className="text-sm flex justify-between font-satoshi">
              <span className="px-2 py-1 rounded border border-gray-400 text-gray-900 bg-white">
                {JSON.parse(localStorage.getItem("user") || "{}")?.plan?.name}
              </span>
              <span className="px-2 py-1 rounded text-gray-900 bg-white">
                {JSON.parse(localStorage.getItem("user") || "{}")?.session_count}/ {JSON.parse(localStorage.getItem("user") || "{}")?.plan?.sessionsRemaining} sessions
              </span>
            </div>
            <div className="h-2 bg-gray-300 w-full rounded overflow-hidden mt-2">
              <div className={`h-full bg-black w-${JSON.parse(localStorage.getItem("user") || "{}")?.session_count}/${JSON.parse(localStorage.getItem("user") || "{}")?.plan?.sessionsRemaining}`}></div>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-switzer font-semibold py-2 mt-2 rounded" onClick={() => navigate("/payment")}>
              upgrade
            </button>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ">
        <Outlet /> {/* This will render the current page */}
      </main>
    </div>
  );
};

export default Layout;
