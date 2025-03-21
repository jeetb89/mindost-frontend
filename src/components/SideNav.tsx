import  { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ height: "100vh" }}>
      <div className="logo" style={{ height: "32px", margin: "16px", background: "rgba(255, 255, 255, 0.2)" }} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {/* <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>Users</Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item> */}
      </Menu>
      <div style={{ textAlign: "center", marginTop: "auto", paddingBottom: "10px" }}>
        {collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: "18px", color: "white" }} onClick={() => setCollapsed(false)} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: "18px", color: "white" }} onClick={() => setCollapsed(true)} />
        )}
      </div>
    </Sider>
  );
};

export default SideNavBar;
