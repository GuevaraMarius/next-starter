import React from "react";
import {
  CheckSquareOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  SearchOutlined,
  FilterOutlined,
  FileOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  DragOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  theme,
  Statistic,
} from "antd";
import type { MenuProps } from "antd";
import { Typography } from "antd";
import DraggableTable from "../data/table";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const DashboardData = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "1",
      icon: <LogoutOutlined />,
    },
  ];

  const filterItems = [
    { label: "Done", key: "done" },
    { label: "Off-track", key: "off-track" },
    { label: "Pending", key: "pending" },
  ];

  const summaryItems = [
    { label: "Today", key: "today" },
    { label: "Week", key: "week" },
    { label: "Month", key: "month" },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div className="bg-white flex flex-col md:flex-row justify-between items-center px-6 py-2 mx-auto rounded-lg mt-5 mx-5">
        <span className="text-lg">Pending tasks - 7</span>

        <Input
          prefix={<SearchOutlined />}
          placeholder="Search tasks"
          className="w-full md:w-1/3 my-2 md:my-0 mx-4"
        />

        <Dropdown menu={{ items: filterItems }}>
          <Button className="w-full md:w-auto">
            Filter List <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Layout>
        <Sider
          className="rounded-lg"
          width={350}
          style={{
            background: colorBgContainer,
            margin: "20px 0px 0px 0px",
          }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="p-4">
            <Title level={5}>Summary</Title>

            <Dropdown menu={{ items: summaryItems }}>
              <Button style={{ width: "100%" }}>
                <Space>
                  <FilterOutlined />
                  This Week
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                {
                  value: 11,
                  label: "Total Tasks",
                  icon: <FileOutlined />,
                  change: "+10%",
                },
                {
                  value: 1,
                  label: "Completed",
                  icon: <CheckOutlined />,
                  change: "-10%",
                },
                {
                  value: 7,
                  label: "Pending",
                  icon: <InfoCircleOutlined />,
                  change: "+10%",
                },
                {
                  value: 3,
                  label: "Off-Track",
                  icon: <InfoCircleOutlined />,
                  change: "+10%",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="shadow-sm rounded-lg"
                  style={{
                    borderRadius: "6px",
                    border: "1px solid #e0e0e0",
                    padding: "8px",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-start">
                      <Statistic
                        value={item.value}
                        precision={0}
                        valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                      />
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#1f2937",
                          position: "relative",
                          top: "-8px",
                          marginLeft: "2px",
                        }}
                      >
                        {item.change}
                      </span>
                    </div>
                    {item.icon}
                  </div>
                  <div className="mt-1 text-gray-500 text-xs">{item.label}</div>
                </Card>
              ))}
            </div>

            <Card
              className="shadow-sm bg-gray-100 rounded-lg mt-4"
              style={{
                borderRadius: "6px",
                border: "1px solid #e0e0e0",
                padding: "8px",
              }}
            >
              <div className="text-gray-500 text-xs">Daily Tip:</div>
              <div className="mt-1 flex items-center">
                <DragOutlined style={{ fontSize: "20px", color: "#9ca3af" }} />
                <span className="ml-2 text-xs">
                  Use this icon on the left to re-arrange tasks
                </span>
              </div>
            </Card>
          </div>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              marginTop: "20px",
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <DraggableTable />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardData;
