import React, { useState } from "react";
import { Layout } from "antd";
import AppHeader from "../shared/header";
import AppFooter from "../shared/footer";
import DashboardData from "./data";
import Settings from "./settings";
import withAuth from "../withAuth";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <DashboardData />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardData />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader onNavigate={setActiveComponent} />
      <Content style={{ padding: "24px" }}>{renderComponent()}</Content>
      <AppFooter />
    </Layout>
  );
};

export default withAuth(Dashboard);
