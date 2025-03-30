import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Form } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

interface Slot {
  date: string;
  time: string;
  period: string;
}

const slotsData: Slot[] = [
  { date: "25th March 2025", time: "8:00 AM", period: "Morning" },
  { date: "25th March 2025", time: "1:00 PM", period: "Afternoon" },
  { date: "26th March 2025", time: "8:00 AM", period: "Morning" },
  { date: "26th March 2025", time: "1:00 PM", period: "Afternoon" },
];

const ChooseYourSlot: React.FC<{ onSlotSelect: (slot: Slot) => void; selectedSlot: Slot | null }> = ({
  onSlotSelect,
  selectedSlot,
}) => {
  const [view, setView] = useState<"next" | "all">("next");

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "large", fontWeight: "400", marginBottom: "16px" }}>Choose Your Slot (IST)</h2>

      {/* Toggle Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <Button
          type={view === "next" ? "primary" : "default"}
          onClick={() => setView("next")}
          style={{ marginRight: "10px" }}
        >
          Next Slots
        </Button>
        <Button type={view === "all" ? "primary" : "default"} onClick={() => setView("all")}>
          All Slots
        </Button>
      </div>

      <Row justify="center" style={{ display: "flex", justifyContent: "space-evenly" }}>
        {slotsData.map((slot, index) => (
          <Col key={index} style={{ marginTop: "12px" }}>
            <Card
              hoverable
              style={{
                textAlign: "center",
                background: selectedSlot?.date === slot.date && selectedSlot?.time === slot.time ? "#fffee6" : "#fff",
                color: selectedSlot?.date === slot.date && selectedSlot?.time === slot.time ? "#ffc800" : "#000",
                border: selectedSlot?.date === slot.date && selectedSlot?.time === slot.time ? "2px solid #ffc800" : "1px solid #ddd",
                fontWeight: "600",
              }}
              onClick={() => onSlotSelect(slot)}
            >
              <p>
                <CalendarOutlined /> {slot.date}
              </p>
              <p>Slot: {slot.period}</p>
              <p>
                <ClockCircleOutlined /> {slot.time}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ChooseYourSlot;
