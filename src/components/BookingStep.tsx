import React, { useState } from "react";
import {
  Steps,
  Button,
  Radio,
  ConfigProvider,
  Row,
  Form,
  Input,
  Col,
  Typography,
  Card,
  Avatar,
  Tooltip,
  message,
  Checkbox,
} from "antd";
import ChooseYourSlot from "./ui/ChooseSlot";
import { VideoCameraOutlined, HourglassOutlined } from "@ant-design/icons";
import moment from "moment";

const { Step } = Steps;
const { Text } = Typography;
const { Meta } = Card;

interface FormData {
  therapyBefore: string | null;
  discussionTopic: string | null;
  age: string | null;
  therapyFor: string | null;
}

const sessionOptions = [
  {
    value: "1-session",
    label: (
      <Text>
        1 Session : <del>₹1999</del> ₹1499
      </Text>
    ),
    price: <del>₹1999</del>,
    discountedPrice: 1499,
  },
  {
    value: "5-sessions",
    label: (
      <Text>
        5 Sessions : <del>₹9995</del> ₹7124
      </Text>
    ),
    price: <del>₹9995</del>,
    discountedPrice: 7124,
  },
  {
    value: "10-sessions",
    label: (
      <Text>
        10 Sessions : <del>₹19990</del> ₹15990
      </Text>
    ),
    price: <del>₹19990</del>,
    discountedPrice: 15990,
  },
];

interface Slot {
  //   id: string;
  //   startTime: string;
  //   endTime: string;
  date: string;
  time: string;
  period: string;
}

const BookingSteps = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    therapyBefore: null,
    discussionTopic: null,
    age: null,
    therapyFor: null,
  });
  const [form] = Form.useForm();
  const [personalInfo, setPersonalinfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    typeOfSession: null,
    slots: null,
  });
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isStepCompleted, setIsStepCompleted] = useState(false);


  const findPrice = (session: any) => {
    const option = sessionOptions.find((options) => options.value === session);
    return option?.price || null;
  };

  const findDiscountedPrice = (session: any) => {
    const option = sessionOptions.find((options) => options.value === session);
    return option?.discountedPrice || null;
  };

  const onFinish = (values: any) => {
    // console.log(values);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);

    const allFieldsFilled = Object.values(updatedFormData).every(
      (val) => val !== null
    );
    setIsStepCompleted(allFieldsFilled);
  };

  const handlePersonalInfoChange = (
    field: keyof typeof personalInfo,
    value: any
  ) => {
    setPersonalinfo((prev) => {
      const updatedInfo = { ...prev, [field]: value };

      const allFieldsFilled = Object.values(updatedInfo).every(
        (val) => val !== null && val !== "" && val !== undefined
      );

      setIsStepCompleted(allFieldsFilled);

      return updatedInfo;
    });
  };

  const next = () => {
    if (current === 0 && isStepCompleted) {
      setCurrent(current + 1);
      setIsStepCompleted(false);
    } else if (current === 1) {
      const allPersonalFieldsFilled = Object.values(personalInfo).every(
        (val) => val !== null && val !== ""
      );

      if (allPersonalFieldsFilled) {
        setCurrent(current + 1);
      } else {
        message.error("Please fill all required fields.");
      }
    }
  };

  const prev = () => setCurrent(current - 1);

  const onValuesChange = (changedValues: any, allValues: any) => {
    setPersonalinfo(allValues);

    const allFieldsFilled = Object.values(allValues).every(
      (val) => val !== null && val !== "" && val !== undefined
    );
    setIsStepCompleted(allFieldsFilled);
  };

  const steps = [
    {
      title: "Basic Information",
      content: (
        <div>
          <h3>Have you ever taken therapy before?</h3>
          <Radio.Group
            onChange={(e) => handleChange("therapyBefore", e.target.value)}
            value={formData.therapyBefore}
            style={{ marginTop: "2%" }}
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>

          <h3 className="mt-4">What do you want to discuss about?</h3>
          <Radio.Group
            onChange={(e) => handleChange("discussionTopic", e.target.value)}
            value={formData.discussionTopic}
            style={{ marginTop: "2%" }}
          >
            <Radio value="relationship">Relationship</Radio>
            <Radio value="career">Career</Radio>
            <Radio value="sexual wellness">Sexual Wellness</Radio>
            <Radio value="academic">Academic</Radio>
            <Radio value="lgbtqia+">LGBTQIA+</Radio>
            <Radio value="psychological disorders">
              Psychological Disorders
            </Radio>
            <Radio value="others">Others</Radio>
          </Radio.Group>

          <h3 className="mt-4">How old are you?</h3>
          <Radio.Group
            onChange={(e) => handleChange("age", e.target.value)}
            value={formData.age}
            style={{ marginTop: "2%" }}
          >
            <Radio value="<18">{"< 18"}</Radio>
            <Radio value="18-25">18-25</Radio>
            <Radio value="25-30">25-30</Radio>
            <Radio value="30-40">30-40</Radio>
            <Radio value="40-50">40-50</Radio>
            <Radio value=">50">{"> 50"}</Radio>
          </Radio.Group>

          <h3 className="mt-4">Is this therapy for you or someone else?</h3>
          <Radio.Group
            onChange={(e) => handleChange("therapyFor", e.target.value)}
            style={{ marginTop: "2%" }}
            value={formData.therapyFor}
          >
            <Radio value="individual">Individual (for myself)</Radio>
            <Radio value="teen">Teen (for my child)</Radio>
            <Radio value="couple">Couple (me and my partner)</Radio>
          </Radio.Group>
        </div>
      ),
    },
    {
      title: "Personal Information",
      content: (
        <div>
          <div
            style={{
              fontSize: "large",
              fontWeight: "500",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Personal Details
          </div>

          <Form
            layout="vertical"
            form={form}
            onValuesChange={onValuesChange}
            onFinish={onFinish}
          >
            <Row
              gutter={16}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <Col span={8}>
                <Form.Item
                  label={
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      Name
                    </span>
                  }
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your name"
                    value={personalInfo.name}
                    onChange={(e) =>
                      handlePersonalInfoChange("name", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      Email
                    </span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      handlePersonalInfoChange("email", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span style={{ fontSize: "16px", fontWeight: "400" }}>
                      Phone Number
                    </span>
                  }
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your phone number"
                    value={personalInfo.phoneNumber}
                    onChange={(e) =>
                      handlePersonalInfoChange("phoneNumber", e.target.value)
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="slots">
                  <ChooseYourSlot
                    onSlotSelect={(slot) => {
                      setSelectedSlot(slot);
                      handlePersonalInfoChange("slots", slot ? slot.time : "");
                    }}
                    selectedSlot={selectedSlot}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="typeOfSession"
              rules={[{ required: true, message: "Please select a session!" }]}
            >
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Radio.Group
                  value={personalInfo.typeOfSession}
                  onChange={(e) =>
                    handlePersonalInfoChange("typeOfSession", e.target.value)
                  }
                >
                  {sessionOptions.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Preview",
      content: (
        <Typography>
          {/* <Row gutter={[16, 16]} style={{ alignItems: "center" }}>
            <Col span={24}>
              <Typography.Text strong>Coupon Code</Typography.Text>
            </Col>

            <Col span={6}>
              <Input placeholder="Enter your Coupon Code" />
            </Col>
            <Col span={2}>
              <Button
                style={{
                  background: "rgb(255, 200, 0)",
                  color: "#000",
                  width: "100%", // Makes button responsive
                }}
              >
                Apply
              </Button>
            </Col>
          </Row> */}
          <Row style={{ display: "flex", justifyContent: "space-around" }}>
            <Col>
              <Card
                style={{
                  background: "#f5f5f5",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 700,
                  marginTop: "3%",
                }}
              >
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
                          gap: "8px",
                        }}
                      >
                        6 years of experience | Speaks English and Hindi
                      </Row>
                    </span>
                  }
                />
                <Row style={{ display: "flex", margin: "5%" }}>
                  <Button
                    style={{
                      backgroundColor: "rgb(255, 200, 0)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      marginRight: "12px",
                      border: "none",
                      gap: "8px",
                    }}
                  >
                    <VideoCameraOutlined />
                    Online
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "rgb(255, 200, 0)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "1px solid",
                      gap: "8px",
                    }}
                  >
                    <HourglassOutlined />
                    45 Mins
                  </Button>
                </Row>
              </Card>

              <Card
                style={{
                  background: "#f5f5f5",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 24px",
                  width: 700,
                  marginTop: "3%",
                }}
              >
                <Row
                  justify="space-between"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <Col style={{ fontWeight: "bold" }}>Name</Col>
                  <Col>{personalInfo?.name ?? "-"}</Col>
                </Row>

                <Row
                  justify="space-between"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <Col style={{ fontWeight: "bold" }}>Email</Col>
                  <Col>{personalInfo?.email ?? "-"}</Col>{" "}
                  {/* Add dynamic email here */}
                </Row>

                <Row justify="space-between" style={{ width: "100%" }}>
                  <Col style={{ fontWeight: "bold" }}>Phone Number</Col>
                  <Col>+91 {personalInfo?.phoneNumber ?? "-"}</Col>{" "}
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                style={{
                  background: "#f5f5f5",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 24px",
                  width: 700,
                  marginTop: "3%",
                }}
              >
                <Row style={{ width: "100%", marginBottom: "8px" }}>
                  <Col style={{ fontWeight: "bold" }}>Session Date : </Col>
                  <Col> {selectedSlot?.date ?? "-"}</Col>
                </Row>

                <Row style={{ width: "100%", marginBottom: "8px" }}>
                  <Col style={{ fontWeight: "bold" }}>Time Slot : </Col>
                  <Col>
                    {selectedSlot?.time
                      ? `${selectedSlot.time} - ${moment(
                          selectedSlot.time,
                          "h:mm A"
                        )
                          .add(45, "minutes")
                          .format("h:mm A")}`
                      : "Select a time"}
                  </Col>
                </Row>
              </Card>

              <Card
                style={{
                  background: "#f5f5f5",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 24px",
                  width: 700,
                  marginTop: "3%",
                }}
              >
                <Row style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Order Summary
                </Row>
                <Row
                  justify="space-between"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <Col style={{ fontWeight: "bold" }}>Session Price</Col>
                  <Col> {findPrice(personalInfo?.typeOfSession)}</Col>
                </Row>

                <Row
                  justify="space-between"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <Col style={{ fontWeight: "bold" }}>
                    {" "}
                    {personalInfo?.typeOfSession}{" "}
                  </Col>
                  <Col>₹{findDiscountedPrice(personalInfo?.typeOfSession)}</Col>
                </Row>

                <Row
                  justify="space-between"
                  style={{
                    width: "100%",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <Col style={{ fontSize: "20px" }}>Total :</Col>
                  <Col style={{ fontSize: "20px" }}>
                    ₹{findDiscountedPrice(personalInfo?.typeOfSession)}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col>
              <Checkbox
                checked={isConsentGiven}
                onChange={(e) => setIsConsentGiven(e.target.checked)}
              >
                Please read and agree to the consent form by checking the box
              </Checkbox>
            </Col>
            <Col>
              <Tooltip
                title={!isConsentGiven ? " Please accept consent form" : undefined}
              >
                <Button
                  style={{
                    background: "rgb(255, 200, 0)",
                    color: "#000",
                    width: "100%",
                  }}
                  disabled={!isConsentGiven} // Button enabled only when checked
                >
                  Pay now
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Typography>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(255, 200, 0)",
        },
      }}
    >
      <div>
        <Steps current={current} style={{ color: "rgb(255, 200, 0)" }}>
          {steps.map((step, index) => (
            <Step
              key={index}
              title={
                <span>
                  {step.title}{" "}
                  {index < steps.length - 1 && (
                    <span style={{ marginLeft: "14%" }}> &gt; </span>
                  )}
                </span>
              }
            />
          ))}
        </Steps>
        <div className="mt-4">{steps[current].content}</div>
        <div className="mt-4">
          {current > 0 && (
            <Button
              onClick={prev}
              style={{
                background: "rgb(255, 200, 0)",
                // border: "none",
                color: "#000",
              }}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Tooltip title={!isStepCompleted ? "Answer all the questions" : ""}>
              <Button
                type="primary"
                onClick={next}
                className="ml-2"
                style={{
                  background: "rgb(255, 200, 0)",
                  // border: "none",
                  color: "#000",
                }}
                disabled={!isStepCompleted}
              >
                Next
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default BookingSteps;
