import React, { useState } from "react";
import {
  CheckSquareOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Layout,
  Space,
  Typography,
  Modal,
  DatePicker,
  Col,
  Form,
  Input,
  Row,
} from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/router";
const { TextArea } = Input;
const { Header } = Layout;
const { Title } = Typography;

interface AppHeaderProps {
  onNavigate: (route: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onNavigate }) => {
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      router.push("/login");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "1",
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Header className="bg-white flex justify-between items-center px-4 py-2">
        {/* Logo and Title */}
        <div className="flex items-center">
          <CheckSquareOutlined className="text-xl sm:text-2xl md:text-3xl" />
          <Title className="ml-2 mt-1" level={4}>
            DoRoll
          </Title>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <span
            onClick={() => onNavigate("dashboard")}
            className="cursor-pointer flex items-center"
          >
            <HomeOutlined className="mr-1" /> Home
          </span>
          <span
            onClick={() => onNavigate("settings")}
            className="cursor-pointer flex items-center"
          >
            <SettingOutlined className="mr-1" /> Settings
          </span>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Button
            onClick={showModal}
            type="primary"
            className="text-xs sm:text-sm md:text-base"
          >
            New Task +
          </Button>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                <UserOutlined />
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </Header>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-center space-x-4 py-2 bg-white shadow-sm">
        <span
          onClick={() => onNavigate("dashboard")}
          className="cursor-pointer flex items-center"
        >
          <HomeOutlined className="mr-1" /> Home
        </span>
        <span
          onClick={() => onNavigate("settings")}
          className="cursor-pointer flex items-center"
        >
          <SettingOutlined className="mr-1" /> Settings
        </span>
      </div>

      {/* Modal for New Task */}
      <Modal
        open={isModalOpen}
        footer={null}
        closable={false}
        maskClosable={true}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden p-4">
            <Title level={4}>New Task</Title>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Todo" name="todo">
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter Title"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Due date" name="dueDate">
                    <DatePicker
                      suffixIcon={<CalendarOutlined />}
                      style={{ padding: "10px", width: "100%" }}
                      placeholder="--/--/--"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={32}>
                <Col span={24}>
                  <Form.Item label="Description" name="description">
                    <TextArea placeholder="Enter description" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end">
                <Button
                  type="primary"
                  className="mx-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  Add Task +
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppHeader;
