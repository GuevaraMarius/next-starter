import React, { useState, useMemo } from "react";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  theme,
  Statistic,
  Select,
  Typography,
} from "antd";
import {
  DownOutlined,
  HolderOutlined,
  FileOutlined,
  CheckOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import DraggableTable from "../data/table";
import { useFetchTasksQuery } from "@/lib/slices/apiSlice";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const DashboardData = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    undefined,
  );
  const [selectedSummaryPeriod, setSelectedSummaryPeriod] =
    useState<string>("week");

  const { data: tasksResponse, isLoading } = useFetchTasksQuery();

  // Filter tasks based on the selected filter
  const filteredTasks = useMemo(() => {
    if (!tasksResponse || !Array.isArray(tasksResponse.data)) return [];
    const tasks = tasksResponse.data;

    // Filter by status
    let filteredByStatus = tasks;
    if (selectedFilter) {
      filteredByStatus = tasks.filter(
        (task: any) => task.status === selectedFilter.toUpperCase(),
      );
    }

    // Filter by search term
    return filteredByStatus.filter((task: any) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tasksResponse, selectedFilter, searchTerm]);

  const handleFilterChange = (value: string) => {
    if (value === "clear") {
      handleClearFilters();
    } else {
      setSelectedFilter(value);
    }
  };

  // Function to clear all filters
  const handleClearFilters = () => {
    setSelectedFilter(undefined);
    setSearchTerm("");
  };

  const handleSummaryPeriodChange = (value: string) => {
    setSelectedSummaryPeriod(value);
  };

  // Calculate summary statistics
  const calculateStatistics = () => {
    if (!tasksResponse || !Array.isArray(tasksResponse.data)) return {};

    const tasks = tasksResponse.data;
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay(),
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const filteredByPeriod = (period: string) => {
      if (period === "today") {
        return tasks.filter(
          (task: any) => new Date(task.deadline) >= startOfToday,
        );
      }
      if (period === "week") {
        return tasks.filter(
          (task: any) => new Date(task.deadline) >= startOfWeek,
        );
      }
      if (period === "month") {
        return tasks.filter(
          (task: any) => new Date(task.deadline) >= startOfMonth,
        );
      }
      return tasks;
    };

    return {
      totalTasks: filteredByPeriod(selectedSummaryPeriod).length,
      completedTasks: filteredByPeriod(selectedSummaryPeriod).filter(
        (task: any) => task.status === "DONE",
      ).length,
      pendingTasks: filteredByPeriod(selectedSummaryPeriod).filter(
        (task: any) => task.status === "PENDING",
      ).length,
      offTrackTasks: filteredByPeriod(selectedSummaryPeriod).filter(
        (task: any) => task.status === "OFF-TRACK",
      ).length,
    };
  };

  const summaryStats = calculateStatistics();

  return (
    <>
      <div className="bg-white flex flex-col md:flex-row justify-between items-center px-6 py-2 mx-auto rounded-lg mx-5">
        <span className="text-lg">
          Pending tasks - {summaryStats.pendingTasks}
        </span>

        <Input
          prefix={<SearchOutlined />}
          placeholder="Search tasks"
          className="w-full md:w-1/3 my-2 md:my-0 mx-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => handleFilterChange("done")}>
                Done
              </Menu.Item>
              <Menu.Item onClick={() => handleFilterChange("off-track")}>
                Off-track
              </Menu.Item>
              <Menu.Item onClick={() => handleFilterChange("pending")}>
                Pending
              </Menu.Item>
              <Menu.Item onClick={() => handleFilterChange("clear")}>
                Clear Filter
              </Menu.Item>
            </Menu>
          }
        >
          <Button className="w-full md:w-auto">
            Filter List <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Layout>
        <Sider
          className="rounded-lg"
          width={400}
          style={{
            background: colorBgContainer,
            margin: "20px 0px 0px 0px",
          }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="p-4">
            <Title level={5}>Summary</Title>

            <Select
              defaultValue="week"
              style={{ width: "100%" }}
              onChange={handleSummaryPeriodChange}
            >
              <Select.Option value="today">Today</Select.Option>
              <Select.Option value="week">This Week</Select.Option>
              <Select.Option value="month">This Month</Select.Option>
            </Select>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <Card
                className="shadow-sm rounded-lg"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  padding: "2px",
                }}
              >
                <div className="flex justify-between items-center">
                  <Statistic
                    value={summaryStats.totalTasks}
                    precision={0}
                    valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                  />
                  <FileOutlined />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Total Tasks</div>
              </Card>

              <Card
                className="shadow-sm rounded-lg"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  padding: "2px",
                }}
              >
                <div className="flex justify-between items-center">
                  <Statistic
                    value={summaryStats.completedTasks}
                    precision={0}
                    valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                  />
                  <CheckOutlined />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Completed</div>
              </Card>

              <Card
                className="shadow-sm rounded-lg"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  padding: "2px",
                }}
              >
                <div className="flex justify-between items-center">
                  <Statistic
                    value={summaryStats.pendingTasks}
                    precision={0}
                    valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                  />
                  <InfoCircleOutlined />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Pending</div>
              </Card>

              <Card
                className="shadow-sm rounded-lg"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  padding: "2px",
                }}
              >
                <div className="flex justify-between items-center">
                  <Statistic
                    value={summaryStats.offTrackTasks}
                    precision={0}
                    valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                  />
                  <InfoCircleOutlined />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Off-Track</div>
              </Card>
            </div>
            <Card
              className="shadow-sm bg-gray-100 rounded-lg mt-4"
              style={{
                borderRadius: "6px",
                border: "1px solid #e0e0e0",
                padding: "8px",
              }}
            >
              <div className="text-gray-500 text-xs">Daily Tip:</div>
              <div className="mt-1 flex items-center">
                <HolderOutlined
                  style={{ cursor: "grab", transform: "rotate(90deg)" }}
                />
                <span className="ml-2 text-xs">
                  Use this icon on the left to re-arrange tasks
                </span>
              </div>
            </Card>
          </div>
        </Sider>

        <Layout style={{ padding: "20px" }}>
          <Content
            className="p-4"
            style={{
              padding: 24,
              marginTop: "20px",
              minHeight: 280,
              background: colorBgContainer,
              margin: 0,
              borderRadius: borderRadiusLG,
            }}
          >
            <DraggableTable data={filteredTasks} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardData;
