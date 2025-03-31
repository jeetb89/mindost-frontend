import React, { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Avatar, Card, Modal, Row, Tag } from "antd";
import Column from "antd/es/table/Column";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { AvailabilityModal } from "../AvailabilityModal";
import BookingSteps from "../BookingStep";

const { Meta } = Card;

interface Therapist {
  id: number;
  name: string;
  specialization: string;
  image: string;
  description: string;
  expertise: string[]; // Added expertise property
  rating?: {
    score: number;
    totalStars?: number; // Added totalStars property
  }; // Added rating property
  pricing?: {
    originalPrice?: number; // Added originalPrice property
    discountedPrice?: number; // Added discountedPrice property
  }; // Added pricing property
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

interface TherapistsCardProps {
  therapist: Therapist;
}

const TherapistsCard: React.FC<TherapistsCardProps> = ({ therapist }) => {
  const navigate = useNavigate();
  const [isBookingDialogOpen, setBookingDialogOpen] = useState(false);

  return (
    <Card style={{ width: 500 }}>
      <>
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
            ₹{therapist?.pricing?.originalPrice}{" "}
          </span>
          ₹{therapist?.pricing?.discountedPrice} Only
        </span>

        <Meta
          avatar={
            <Avatar
              src={therapist?.image}
              style={{
                width: 80,
                height: 90,
                borderRadius: "8px",
                border: "2px solid #ccc",
                objectFit: "cover",
              }}
            />
          }
          title={therapist?.name}
          description={
            <span>
              {therapist?.specialization}
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
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
                  {therapist?.rating?.score}
                </Tag>
                {therapist?.rating?.totalStars
                  ? [...Array(therapist.rating.totalStars)].map((_, index) => (
                      <StarFilled
                        key={index}
                        style={{ fontSize: "16px", color: "#fadb14" }}
                      />
                    ))
                  : "-"}
              </Row>
            </span>
          }
        />
        <Row style={{ fontSize: "medium", fontWeight: "500", margin: "3% 0%" }}>
          {therapist?.description}
        </Row>

        {therapist?.expertise.map((habbit) => (
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
            onClick={() => setBookingDialogOpen(true)}
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
            onClick={() => navigate(`/therapist-profile/${therapist?.id}`)}
          >
            View Profile
          </Button>
        </Row>
      </>
      <Modal
        title="Book an Appointment"
        open={isBookingDialogOpen}
        onCancel={() => setBookingDialogOpen(false)}
        footer={null}
        width={1600}
        bodyStyle={{ height: 600, overflowY: "auto" }}
      >
        <BookingSteps therapist={therapist}  />
      </Modal>
    </Card>
  );
};

export default TherapistsCard;
