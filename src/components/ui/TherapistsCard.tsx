import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Avatar, Card, Row, Tag } from "antd";
import Column from "antd/es/table/Column";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

interface Therapist {
  id: number;
  name: string;
  specialization: string;
  image: string;
  description: string;
}

interface TherapistsCardProps {
  therapist: Therapist;
}

let habbits = [
  "Eating disorders",
  "Confidence and self-esteem",
  "Fears and phobias",
  "Health anxiety",
  "Depression and low mood",
  "Anxiety",
];

const TherapistsCard: React.FC<TherapistsCardProps> = ({ therapist }) => {

      const navigate = useNavigate();

  return (
    <Card style={{ width: 550 }}>
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          background: "#ffc800",
          padding: "5px 10px",
          borderRadius: "0px 8px 0px 8px",
          color: "white",
          fontWeight: "700",
          fontSize: "medium",
        }}
      >
        <span
          style={{
            fontSize: "small",
            textDecoration: "line-through",
            margin: "2px",
          }}
        >
          {" "}
          Rs 2000{" "}
        </span>
        Rs 1499 Only
      </span>

      <Meta
        avatar={
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
            style={{
              width: 80,
              height: 90,
              borderRadius: "8px",
              border: "2px solid #ccc",
              objectFit: "cover",
            }}
          />
        }
        title="Nishtha Singh"
        description={
          <span>
            Clinical Psychologist
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px", // Adds space between button & stars
              }}
            >
              <Tag
                color="rgb(255, 200, 0)"
                style={{
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                4.9
              </Tag>
              <StarFilled style={{ fontSize: "16px" }} />
              <StarFilled style={{ fontSize: "16px" }} />
              <StarFilled style={{ fontSize: "16px" }} />
              <StarFilled style={{ fontSize: "16px" }} />
            </Row>
          </span>
        }
      />
      <Row style={{ fontSize: "medium", fontWeight: "500", margin: "3% 0%" }}>
        6 years of experience | Speaks English and Hindi
      </Row>

      {habbits.map((habbit) => (
        <Tag color="gold" style={{ marginBottom: "1%" }} key={habbit}>
          {habbit}
        </Tag>
      ))}

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
        >
          Book Now
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
          onClick={() => navigate("/therapist-profile")}
        >
          View Profile
        </Button>
      </Row>
    </Card>
  );
};

export default TherapistsCard;
