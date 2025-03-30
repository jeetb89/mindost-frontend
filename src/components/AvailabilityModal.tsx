import React, { useState } from "react";
import { Modal, Button, Space, Popover, DatePicker } from "antd";
import { LeftOutlined, RightOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

interface AvailabilityModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  visible,
  onClose,
}) => {
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Generate 7 days dynamically
  const dates = Array.from({ length: 7 }, (_, i) =>
    dayjs().add(i, "day").format("DD MMM")
  );

  // Time slots per date
  const timesByDate: Record<string, string[]> = {
    [dates[0]]: ["8:00 AM", "10:00 AM", "2:00 PM"],
    [dates[1]]: ["9:00 AM", "12:00 PM", "4:00 PM"],
    [dates[2]]: ["7:00 AM", "11:00 AM", "3:00 PM"],
    [dates[3]]: ["10:00 AM", "1:00 PM", "5:00 PM"],
    [dates[4]]: ["9:30 AM", "12:30 PM", "3:30 PM"],
    [dates[5]]: ["8:45 AM", "11:45 AM", "2:45 PM"],
    [dates[6]]: ["7:15 AM", "10:15 AM", "1:15 PM"],
  };

  // Get available times for the selected date
  const availableTimes = timesByDate[selectedDate.format("DD MMM")] || [];

  // Date navigation
  const handlePrevDates = () => {
    setCurrentDateIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextDates = () => {
    setCurrentDateIndex((prev) => Math.min(dates.length - 4, prev + 1));
  };

  // Handle date selection from calendar
  const handleCalendarSelect = (date: Dayjs) => {
    setSelectedDate(date);
    const newIndex = dates.findIndex((d) => d === date.format("DD MMM"));
    if (newIndex !== -1) {
      setCurrentDateIndex(Math.max(0, Math.min(newIndex, dates.length - 4)));
    }
    setIsOpen(false);
  };

  return (
    <Modal
      title={<span style={{ color: "#fff" }}>Availability</span>}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      {/* Date Selection */}
      <Space size="middle" style={{ display: "flex", justifyContent: "center" }}>
        <Button
          icon={<LeftOutlined />}
          shape="circle"
          onClick={handlePrevDates}
          disabled={currentDateIndex === 0}
        />
        {dates.slice(currentDateIndex, currentDateIndex + 4).map((date) => (
          <Button
            key={date}
            type={selectedDate.format("DD MMM") === date ? "primary" : "default"}
            style={{
              background: selectedDate.format("DD MMM") === date ? "#6c5ce7" : "#333",
              color: "#fff",
            }}
            onClick={() => setSelectedDate(dayjs(date, "DD MMM"))}
          >
            {date}
          </Button>
        ))}
        <Button
          icon={<RightOutlined />}
          shape="circle"
          onClick={handleNextDates}
          disabled={currentDateIndex + 4 >= dates.length}
        />

        {/* Calendar Popover for Date Selection */}
        <Popover
          content={
            <DatePicker
              value={selectedDate}
              onChange={handleCalendarSelect}
              open={isOpen}
              onOpenChange={setIsOpen}
            />
          }
          trigger="click"
          open={isOpen}
          onOpenChange={setIsOpen}
          placement="bottomRight"
        >
          <Button icon={<CalendarOutlined />} shape="circle" />
        </Popover>
      </Space>

      {/* Time Selection */}
      <Space size="middle" style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        {availableTimes.length > 0 ? (
          availableTimes.map((time) => (
            <Button
              key={time}
              type={selectedTime === time ? "primary" : "default"}
              style={{
                background: selectedTime === time ? "#6c5ce7" : "#333",
                color: "#fff",
              }}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </Button>
          ))
        ) : (
          <span style={{ color: "#fff" }}>No slots available</span>
        )}
      </Space>
    </Modal>
  );
};
