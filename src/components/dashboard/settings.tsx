import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import {
  UserOutlined,
  CheckOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const Settings = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl overflow-hidden"
        style={{
          padding: 0,
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-col justify-center bg-gray-100 m-8 px-2 w-full rounded">
            <div className="m-auto p-16 ">
              <Title level={4} className="px-6">
                Yves Honore B.
              </Title>
              <span>yveshonore@awesomity.rw</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{
          padding: 0,
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="px-6 w-full h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={4}>Edit my profile info</Title>
            <Form layout="vertical">
              <Row gutter={16}>
                {/* Column 1 */}
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input prefix={<UserOutlined />} placeholder="Bisemage" />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="yves@gmail.com"
                      type="email"
                    />
                  </Form.Item>
                </Col>
                {/* Column 2 */}
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Yves Honore"
                    />
                  </Form.Item>
                  <Form.Item label="Phone Number" name="phone">
                    <Input
                      type="phone"
                      prefix={<PhoneOutlined />}
                      placeholder="250 788 123 456"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-row justify-between bg-white p-2 w-full rounded ">
                <div className="my-auto"></div>

                <Button type="primary" className="my-auto mx-4" href="/signup">
                  Save Changes <CheckOutlined />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div
        className="bg-white w-full max-w-lg md:max-w-2xl rounded-lg overflow-hidden"
        style={{
          padding: 0,
        }}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="px-6 w-full h-full rounded-b-lg md:rounded-none md:rounded-r-lg">
            <Title level={4}>Edit my password</Title>
            <Form layout="vertical">
              <Row gutter={16}>
                {/* Column 1 */}
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                </Col>
                {/* Column 2 */}
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm your password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-row justify-between bg-white py-4 w-full rounded-t-lg md:rounded-none md:rounded-l-lg">
                <div className="my-auto"></div>

                <Button type="primary" className="my-auto mx-4" href="#">
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
