import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useResetPasswordMutation } from "@/lib/slices/apiSlice";

const { Title } = Typography;

const ResetPassword = () => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const token = Array.isArray(router.query.token)
        ? router.query.token[0]
        : router.query.token;

      if (!token) {
        throw new Error("Token is missing!");
      }

      const response = await resetPassword({
        token,
        newPassword: values.password,
      }).unwrap();

      if (response.status !== "success") {
        throw new Error("Password reset failed!");
      }
      message.success("Password reset successful!");
      router.push("/login");
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Password reset failed!";
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white w-full max-w-lg rounded-lg overflow-hidden p-6">
        <div className="h-full">
          <Title level={2}>Reset Password</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your new password" },
              ]}
              required={false}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Enter new password"
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
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Confirm new password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
