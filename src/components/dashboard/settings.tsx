import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row, message, Typography } from "antd";
import {
  UserOutlined,
  CheckOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/slices/apiSlice"; // Adjust the import path if needed

const { Title } = Typography;

const Settings = () => {
  const [form] = Form.useForm();

  // Fetch user profile data
  const {
    data: responseData,
    error: fetchError,
    isLoading: isFetching,
    refetch,
  } = useGetProfileQuery();

  // Extract userData from responseData
  const userData = responseData?.data;

  // Handle profile update mutation
  const [updateProfile, { isLoading: isUpdating, isSuccess, isError, error }] =
    useUpdateProfileMutation();

  // Handle success or error messages after mutation
  useEffect(() => {
    if (isSuccess) {
      message.success("Profile updated successfully!");
      refetch(); // Refetch data to ensure it's updated
    }
    if (isError) {
      message.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  }, [isSuccess, isError, error, refetch]);

  // Polling setup
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [refetch]);

  // Populate form with fetched user data
  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData);
    }
    if (fetchError) {
      message.error("Failed to load profile data.");
    }
  }, [userData, fetchError, form]);

  const handleProfileUpdate = async (values: any) => {
    try {
      await updateProfile(values).unwrap();
      form.resetFields();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl overflow-hidden"
        style={{ padding: 0 }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-col justify-center bg-gray-100 m-8 px-2 w-full rounded">
            <div className="m-auto p-16">
              <Title level={4} className="px-6">
                {userData?.firstName} {userData?.lastName}
              </Title>
              <span>{userData?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Update Form */}
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{ padding: 0 }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="px-6 w-full h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={4}>Edit my profile info</Title>
            <Form form={form} layout="vertical" onFinish={handleProfileUpdate}>
              <Row gutter={16}>
                {/* Column 1 */}
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>
                </Col>
                {/* Column 2 */}
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Last Name" />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-row justify-end bg-white p-2 w-full rounded">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdating}
                  className="my-auto mx-4"
                >
                  Save Changes <CheckOutlined />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      {/* Password Update Form */}
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{ padding: 0 }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="px-6 w-full h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={4}>Edit my password</Title>
            <Form layout="vertical" onFinish={handleProfileUpdate}>
              <Row gutter={16}>
                {/* Column 1 */}
                <Col span={12}>
                  <Form.Item
                    label="New Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your new password",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                </Col>
                {/* Column 2 */}
                <Col span={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!"),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm your password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-row justify-end bg-white py-4 w-full rounded">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdating}
                  className="my-auto mx-4"
                >
                  Save Password <CheckOutlined />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
