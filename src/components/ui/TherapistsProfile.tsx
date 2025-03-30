import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarFilled } from "@ant-design/icons";
import { Avatar, Card, Row, Tag, Modal, Skeleton } from "antd";
import { Button } from "./button";
import {
  API_URL,
  FeedbackIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SessionHistoryIcon,
  SettingsIcon,
  TherapistIcon,
} from "../util";
import { useNavigate } from "react-router-dom";
import BookingSteps from "../BookingStep";
import { AvailabilityModal } from "../AvailabilityModal";
import { useParams } from "react-router-dom";

const { Meta } = Card;

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

const habbits = [
  "Eating disorders",
  "Confidence and self-esteem",
  "Fears and phobias",
  "Health anxiety",
  "Depression and low mood",
  "Anxiety",
  "OCD",
  "Social phobia",
  "Anger",
  "Addiction",
  "Substance disorder",
  "Autism",
  "ADHD",
  "Specific learning disability",
];

const TherapistsProfile = () => {
  const navigate = useNavigate();
  const [isBookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [therapistsProfile, setTherapistsProfile] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No auth token found!");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTherapistsProfile(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, [id]);

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
      {loading ? (
        <Skeleton />
      ) : (
        <div className="flex-1 p-8 ml-10" style={{ overflowX: "auto" }}>
          <Card>
            <Meta
              avatar={
                <Avatar
                  src={therapistsProfile?.image}
                  style={{
                    width: 80,
                    height: 90,
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                    objectFit: "cover",
                  }}
                />
              }
              title={therapistsProfile?.name}
              description={
                <span>
                  {therapistsProfile?.specialization}
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {therapistsProfile?.experience} | Speaks{" "}
                    {therapistsProfile?.languages?.join(", ")}
                  </Row>
                </span>
              }
            />
            <Row
              style={{ fontSize: "medium", fontWeight: "500", margin: "1% 0%" }}
            ></Row>

            {therapistsProfile?.expertise.map((habbit: string) => (
              <Tag color="gold" style={{ marginBottom: "1%" }} key={habbit}>
                {habbit}
              </Tag>
            ))}
          </Card>

          <Card style={{ margin: "2% 0%" }}>
            <Row
              style={{ fontSize: "medium", fontWeight: "700", margin: "2% 0%" }}
            >
              Thoughts on Counselling:
            </Row>
            <Row
              style={{ fontSize: "medium", fontWeight: "400", margin: "2% 0%" }}
            >
              {therapistsProfile?.thoughtsOnCounseling}
            </Row>
          </Card>

          <Card style={{ margin: "2% 0%" }}>
            <Row
              style={{ fontSize: "medium", fontWeight: "700", margin: "2% 0%" }}
            >
              My Philosophy:
            </Row>
            <Row
              style={{ fontSize: "medium", fontWeight: "400", margin: "2% 0%" }}
            >
              {therapistsProfile?.philosophy}
            </Row>
          </Card>

          <Row style={{ margin: "2%" }}>
            <Button
              style={{
                backgroundColor: "rgb(255, 200, 0)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginRight: "2%",
              }}
              onClick={() => setBookingDialogOpen(true)}
            >
              Book an Appointment
            </Button>
            <Button
              style={{
                backgroundColor: "#908d8d",
                color: "white",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
              onClick={() => setIsModalVisible(true)}
            >
              Check Availability
            </Button>
          </Row>
        </div>
      )}

      <AvailabilityModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      
    </div>
  );
};

export default TherapistsProfile;
