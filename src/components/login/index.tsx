import { Button, Card, Form, Input } from "antd";
import {
  CheckSquareOutlined,
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{
          padding: 0,
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side Content */}
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

          {/* Right Side Content */}
          <div className="p-6 md:w-1/2 h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={2}>Login</Title>
            <Form layout="vertical">
              <Form.Item label="Email">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter email"
                  type="email"
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Enter Password"
                  type="password"
                />
              </Form.Item>
              <div className="flex flex-row">
                <Form.Item>
                  <Button type="link" href="#">
                    Forgot Password?
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" href="/dashboard">
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
        style={{
          padding: 0,
        }}
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
              Register Here <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
