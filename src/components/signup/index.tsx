import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Checkbox,
  Typography,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useRegisterUserMutation } from "lib/slices/apiSlice";
import { useRouter } from "next/router";
const { Title } = Typography;

const Signup = () => {
  const [register, { isLoading }] = useRegisterUserMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await register(values).unwrap();

      // Check if the status is error or success
      if (response.statusCode === 400 || response.status === "error") {
        message.error(response.message || "Registration failed!");
      } else {
        message.success("Registration successful!");
        form.resetFields();
        router.push("/login");
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Registration failed!";
      message.error(errorMsg); // Display the error message from backend
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{ padding: 0 }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="p-6 w-full h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={2}>Register</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              initialValues={{ agree: true }}
            >
              <Row gutter={16}>
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
                    required={false}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your first name"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                    required={false}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                    required={false}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                </Col>
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
                    required={false}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your last name"
                    />
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
                    required={false}
                  >
                    <Input
                      type="phone"
                      prefix={<PhoneOutlined />}
                      placeholder="250 ___ ___ ___"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    hasFeedback
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
                    required={false}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm your password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-row justify-between bg-white p-2 w-full rounded-t-lg md:rounded-none md:rounded-l-lg">
                <div className="my-auto">
                  <Form.Item
                    name="agree"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                "Should accept terms and conditions",
                              ),
                      },
                    ]}
                  >
                    <Checkbox>
                      I agree to the <a href="#">terms and conditions</a>
                    </Checkbox>
                  </Form.Item>
                </div>
                <Button
                  type="default"
                  className="my-auto mx-4"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Register Here <LoginOutlined />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden mt-4"
        style={{ padding: 0 }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-row justify-between bg-white p-2 w-full rounded-t-lg md:rounded-none md:rounded-l-lg">
            <div className="mt-auto">
              <Title level={4} className="px-6">
                Already have an account?
              </Title>
              <Button type="link" href="#">
                Go to login
              </Button>
            </div>
            <Button type="default" className="my-auto mx-4" href="/login">
              Login <LoginOutlined />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
