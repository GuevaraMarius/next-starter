import React from "react";
import {
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
const AppFooter = () => {
  return (
    <>
      <div
        className="bg-gray-100 flex justify-between items-center px-16 py-2 mx-auto"
        style={{ width: "100%" }}
      >
        <span className="text-lg">
          ©<strong>2024 DoRoll</strong> By Awesomity Lab
        </span>
        <div className="flex space-x-4">
          <TwitterOutlined />
          <InstagramOutlined />
          <LinkedinOutlined />
        </div>
      </div>
    </>
  );
};
export default AppFooter;
