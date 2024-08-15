import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{
          padding: 0,
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="p-6 w-full h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={2}>Register</Title>
            <Form layout="vertical">
              <Row gutter={16}>
                {/* Column 1 */}
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your first name"
                    />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                </Col>
                {/* Column 2 */}
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your last name"
                    />
                  </Form.Item>
                  <Form.Item label="Phone Number" name="phone">
                    <Input
                      type="phone"
                      prefix={<PhoneOutlined />}
                      placeholder="250 ___ ___ ___"
                    />
                  </Form.Item>
                  <Form.Item label="Confirm Password" name="confirmPassword">
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm your password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-row justify-between bg-white p-2 w-full rounded-t-lg md:rounded-none md:rounded-l-lg">
                <div className="my-auto">
                  <Form.Item name="agree" valuePropName="checked">
                    <Checkbox>
                      I agree to the <a href="#">terms and conditions</a>
                    </Checkbox>
                  </Form.Item>
                </div>

                <Button type="default" className="my-auto mx-4" href="/signup">
                  Register Here <LoginOutlined />
                </Button>
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
                Already have account?
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
