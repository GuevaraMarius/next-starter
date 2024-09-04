import { Form, Button, Typography, Input, message } from "antd";
import { MailOutlined, CheckOutlined } from "@ant-design/icons";
import React from "react";
import { useForgotPasswordMutation } from "@/lib/slices/apiSlice";

const { Title } = Typography;

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (values: { email: string }) => {
    try {
      const response = await forgotPassword(values.email).unwrap();
      if (response?.statusCode === 200 && response?.status === "success") {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      // Handle error response
      const errorMessage =
        error?.data?.statusCode === 404
          ? "User not found"
          : error?.data?.message ||
            "Failed to send password reset link. Please try again.";
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <Title level={3} className="mb-4">
          Forgot Password
        </Title>
        <Form layout="vertical" autoComplete="off" onFinish={handleSubmit}>
          <Form.Item
            label="Your Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter email"
              type="email"
            />
          </Form.Item>

          <div className="flex justify-between mt-4">
            <Button type="link" href="/login" className="p-0">
              Login Instead
            </Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit <CheckOutlined />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
