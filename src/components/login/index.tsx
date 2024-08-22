import { Button, Form, Input, Typography, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { useLoginUserMutation } from "lib/slices/apiSlice";
import { useRouter } from "next/router";

const { Title } = Typography;

const Login = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginUserMutation();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await login(values).unwrap();

      if (!response.access_token) {
        throw new Error("Login failed!");
      }
      message.success("Login successful!");
      // Save the token and navigate to the desired page
      localStorage.setItem("access_token", response.access_token);
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Login failed!";
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{ padding: 0 }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-col justify-between bg-gray-100 p-6 md:w-1/2 rounded-t-lg md:rounded-none md:rounded-l-lg">
            <div className="mb-4">
              <CheckSquareOutlined style={{ fontSize: "48px" }} />
            </div>
            <div className="mt-auto">
              <Title level={1} className="mb-0">
                DoRoll
              </Title>
              <span>By Awesomity Lab</span>
            </div>
            <div className="mt-auto">
              <span>© 2024 Awesomity Lab</span>
            </div>
          </div>
          <div className="p-6 md:w-1/2 h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={2}>Login</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter email"
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
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Enter Password"
                />
              </Form.Item>
              <div className="flex flex-row justify-between">
                <Form.Item>
                  <Button type="link" href="/forgot">
                    Forgot Password?
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login <LoginOutlined />
                  </Button>
                </Form.Item>
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
                New here?
              </Title>
              <Button type="link" href="#">
                Create Account
              </Button>
            </div>
            <Button type="default" className="my-auto mx-4" href="/signup">
              Register Here <LoginOutlined />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
