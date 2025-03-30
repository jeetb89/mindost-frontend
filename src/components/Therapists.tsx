import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_URL,
  FeedbackIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SessionHistoryIcon,
  SettingsIcon,
  TherapistIcon,
} from "./util";
import axios from "axios";
import { Fab } from "@mui/material";
import { Row, Skeleton } from "antd";
import TherapistsCard from "./ui/TherapistsCard"; // Ensure this path is correct and the component exists
import axios from "axios";

// interface Message {
//   role: string;
//   content: string;
//   _id: string;
//   timestamp: string;
// }
interface Therapist {
  id: number;
  name: string;
  specialization: string;
  image: string;
  description: string;
  pricing: {
    originalPrice: number;
    discountedPrice: number;
    currency: string;
  };
  rating: {
    score: number;
    totalStars: number;
  };
  expertise: string[];
  languages: string[];
  actions: {
    bookNowUrl: string;
    viewProfileUrl: string;
  };
}

function NavItem({
  label,
  onClick,
  className,
  icon,
}: {
  label: string;
  onClick?: () => void | Promise<void>;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-gray-700 hover:text-black space-x-2 p-2 ${
        className || ""
      }`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export const Therapists: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [therapistsList, setTherapistsList] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No auth token found!");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/doctors/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTherapistsList(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, [API_URL]); // Add API_URL as a dependency if it's dynamic

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <aside className="w-1/10 min-w-[200px] bg-white border-r flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-switzer font-semibold mb-6 text-gray-900 text-center">
            MindDost
          </h1>
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
          </nav>
        </div>
        <div>
          <NavItem
            label="settings"
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
            onClick={() => navigate("/Landing")}
            icon={<SettingsIcon />}
          />
          <NavItem
            label="log out"
            className="font-satoshi bg-white text-gray-900 w-full hover:cursor-pointer hover:border-gray-400"
            //   onClick={handleLogout}
            icon={<LogoutIcon />}
          />
          <div className="mt-4">
            <div className="text-sm flex justify-between font-satoshi">
              <span className="px-2 py-1 rounded border border-gray-400 text-gray-900 bg-white">
                free
              </span>
              <span className="px-2 py-1 rounded text-gray-900 bg-white">
                1/3 sessions
              </span>
            </div>
            <div className="h-2 bg-gray-300 w-full rounded overflow-hidden mt-2">
              <div className="h-full bg-black w-1/3"></div>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-switzer font-semibold py-2 mt-2 rounded">
              upgrade
            </button>
          </div>
        </div>
      </aside> */}

      {/* Main Content */}
      <div className="flex-1 p-8 ml-10" style={{ overflowX: "auto" }}>
        <Row>
          <Fab
            variant="extended"
            size="medium"
            sx={{
              backgroundColor: "rgb(244 244 245/var(--tw-bg-opacity,1))",
              marginRight: "2%",
              color: "black",
              "&:hover": {
                backgroundColor: "#ffc800",
              },
              fontWeight: "600",
              fontSize: "small",
            }}
          >
            Meet Our Therapists
          </Fab>

          {/* <Fab
            variant="extended"
            size="medium"
            sx={{
              backgroundColor: "rgb(244 244 245/var(--tw-bg-opacity,1))",
              color: "black",
              "&:hover": {
                backgroundColor: "#ffc800", // Change hover color
              },
              marginRight: "2%",
              fontWeight: "600",
              fontSize: "small",
            }}
          >
            Your Booking
          </Fab> */}
        </Row>
        <Row
          style={{
            color: "black",
            fontSize: "x-large",
            fontWeight: "700",
            marginTop: "2%",
          }}
        >
          Book a Therapist
        </Row>
        <Row
          style={{
            color: "grey",
            fontSize: "medium",
            fontWeight: "500",
            marginTop: "2%",
          }}
        >
          We take a holistic,trauma-informed approach that addresses both mind
          and boy, helping you get to the root of your challenges. Using
          techniques like CBT, DBT, ACT, Gestalt. Transactional Analysis , and
          Somatic practices , we personalize each session to fit your unique
          needs.{" "}
        </Row>
        <Row
          style={{
            margin: "4% 0%",
            display: "flex",
            justifyContent: "space-between",
            rowGap: "40px",
          }}
        >
          {loading ? (
            <Skeleton />
          ) : therapistsList && therapistsList.length > 0 ? (
            therapistsList.map((therapist) => (
              <TherapistsCard key={therapist.id} therapist={therapist} />
            ))
          ) : (
            <Row
              style={{ textAlign: "center", width: "100%", marginTop: "20px" }}
            >
              No Therapists available...
            </Row>
          )}
        </Row>
      </div>
    </div>
  );
};
