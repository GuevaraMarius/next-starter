import React, { useState, FC, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Checkbox,
  Tooltip,
  Modal,
  Form,
  Button,
  Row,
  Col,
  DatePicker,
  Input,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  HolderOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  useFetchTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskOrderMutation,
} from "@/lib/slices/apiSlice";
const { TextArea } = Input;

interface DataType {
  id: string;
  title: string;
  deadline: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

const DraggableTable: FC<{ data: DataType[] }> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    data: tasksResponse,
    isLoading,
    refetch,
  } = useFetchTasksQuery(undefined, {
    pollingInterval: 5000,
  });
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTaskOrder] = useUpdateTaskOrderMutation();
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [editingTask, setEditingTask] = useState<DataType | null>(null);
  const [deletingTask, setDeletingTask] = useState<DataType | null>(null);
  const [viewingTask, setViewingTask] = useState<DataType | null>(null);
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const handleEdit = (task: DataType) => {
    setEditingTask(task);
    setIsModalOpen(true);
    form.setFieldsValue({
      title: task.title,
      deadline: dayjs(task.deadline),
      description: task.description,
    });
  };

  const handleDelete = (task: DataType) => {
    setDeletingTask(task);
  };

  const handleDeleteConfirm = async () => {
    if (deletingTask) {
      try {
        await deleteTask(deletingTask.id).unwrap();
        message.success("Task deleted successfully!");
        setDeletingTask(null);
        refetch();
      } catch (error: any) {
        message.error(`Failed to delete task: ${error.message}`);
      }
    }
  };

  const handleEditSave = async (values: any) => {
    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title: values.title,
        deadline: values.deadline.format("YYYY-MM-DD"),
        description: values.description,
      };

      try {
        await updateTask({ id: editingTask.id, data: updatedTask }).unwrap();
        message.success("Task updated successfully!");
        setEditingTask(null);
        setIsModalOpen(false);
        refetch();
      } catch (error: any) {
        message.error(`Failed to update task: ${error.message}`);
      }
    }
  };

  const moveRow = async (dragIndex: number, hoverIndex: number) => {
    const dragRow = dataSource[dragIndex];
    const newData = [...dataSource];
    newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, dragRow);

    setDataSource(newData);

    // Create a payload with the new order
    const payload = newData.map((task, index) => ({
      id: task.id,
      position: index + 1,
    }));

    try {
      // Assuming you have a mutation or API call for updating the order
      await updateTaskOrder(payload).unwrap();
      message.success("Task order updated successfully!");
    } catch (error: any) {
      message.error(`Failed to update task order: ${error.message}`);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number,
  ) => {
    e.dataTransfer.setData("dragIndex", index.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number,
  ) => {
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    moveRow(dragIndex, index);
  };

  const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("MMMM D, YYYY");
  };

  const formatDeadline = (deadline: string): string => {
    const now = dayjs();
    const deadlineDate = dayjs(deadline);

    if (deadlineDate.isSame(now, "day")) return "Due Today";
    if (deadlineDate.isSame(now.subtract(1, "day"), "day"))
      return "Due Yesterday";
    return `Due ${formatDate(deadline)}`;
  };

  const formatCreatedOrUpdated = (dateString: string, type: string): string => {
    return `${type} ${formatDate(dateString)}`;
  };

  const handleLabelClick = async (task: DataType) => {
    const newStatus = task.status === "PENDING" ? "ON-TRACK" : "PENDING";
    const updatedTask = { ...task, status: newStatus };

    try {
      await updateTask({ id: task.id, data: updatedTask }).unwrap();
      message.success("Task status updated successfully!");
      setDataSource((prevData) =>
        prevData.map((item) =>
          item.id === task.id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error: any) {
      message.error(`Failed to update task status: ${error.message}`);
    }
  };
  const disabledDate = (current: any) => {
    return current && current.isBefore(dayjs().startOf("day"), "day");
  };

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "drag",
      key: "drag",
      render: () => (
        <HolderOutlined
          style={{ cursor: "grab", transform: "rotate(90deg)" }}
        />
      ),
    },
    {
      dataIndex: "number",
      key: "number",
      render: (_, __, index) => <>{index + 1}</>,
    },
    {
      dataIndex: "status",
      key: "status",
      render: (status: string, record) => {
        const deadlineOverdue =
          dayjs(record.deadline).isBefore(dayjs()) && status !== "DONE";

        let color = "blue";
        let text = "PENDING";

        if (status === "DONE") {
          color = "success";
          text = "DONE";
        } else if (status === "ON-TRACK") {
          color = "gray";
          text = "ON-TRACK";
        } else if (deadlineOverdue) {
          color = "red";
          text = "OFF-TRACK";
        }

        return (
          <Tag color={color} onClick={() => handleLabelClick(record)}>
            {text}
          </Tag>
        );
      },
    },
    {
      dataIndex: "deadline",
      key: "deadline",
      render: (deadline: string) => formatDeadline(deadline),
    },
    {
      dataIndex: "title",
      key: "title",
      render: (text: string, record: DataType) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleRowClick(record)}
        >
          {text}
        </span>
      ),
    },
    {
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string, record) =>
        record.status === "DONE"
          ? formatCreatedOrUpdated(record.updatedAt, "Edited")
          : formatCreatedOrUpdated(createdAt, "Created"),
    },
    {
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined onClick={() => handleDelete(record)} />
          </Tooltip>
        </Space>
      ),
    },
    {
      dataIndex: "status",
      key: "status-checkbox",
      render: (status: string, record) => {
        const isChecked = status === "DONE";
        return (
          <Checkbox
            checked={isChecked}
            style={{ color: "primary" }}
            onChange={() => handleCheckboxChange(record)}
          />
        );
      },
    },
  ];

  const handleCheckboxChange = async (task: DataType) => {
    const updatedStatus = task.status === "DONE" ? "ON-TRACK" : "DONE";
    const updatedTask = { ...task, status: updatedStatus };
    try {
      await updateTask({ id: task.id, data: updatedTask }).unwrap();
      message.success("Task status updated successfully!");
      setDataSource((prevData) =>
        prevData.map((item) =>
          item.id === task.id ? { ...item, status: updatedStatus } : item,
        ),
      );
    } catch (error: any) {
      message.error(`Failed to update task status: ${error.message}`);
    }
  };
  const handleRowClick = (record: DataType) => {
    setViewingTask(record);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        className="draggable-table"
        showHeader={false}
        scroll={{ x: "max-content" }}
        loading={isLoading}
        onRow={(record, index) => ({
          index: index!,
          draggable: true,
          onDragStart: (e) => handleDragStart(e, index!),
          onDrop: (e) => handleDrop(e, index!),
          onDragOver: (e) => e.preventDefault(),
        })}
      />
      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTask(null);
          form.resetFields();
        }}
        footer={null}
      >
        <div>
          <div>
            <Form form={form} layout="vertical" onFinish={handleEditSave}>
              <Row gutter={32}>
                <Col span={12}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please enter a title" },
                    ]}
                  >
                    <Input placeholder="Enter Title" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Due date"
                    name="deadline"
                    rules={[
                      { required: true, message: "Please select a date" },
                    ]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      format="YYYY-MM-DD"
                      suffixIcon={<CalendarOutlined />}
                      style={{ padding: "10px", width: "100%" }}
                      placeholder="--/--/--"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={32}>
                <Col span={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      { required: true, message: "Please enter a description" },
                    ]}
                  >
                    <TextArea placeholder="Enter description" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end">
                <Button type="primary" className="mx-4" htmlType="submit">
                  Edit <EditOutlined />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={!!deletingTask}
        onOk={handleDeleteConfirm}
        onCancel={() => setDeletingTask(null)}
        okButtonProps={{ danger: true }}
        okText="Delete"
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>

      <Modal
        visible={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">{viewingTask?.title}</h2>
          <div className="flex items-center space-x-4">
            <Tag
              className="py-1 border-1 rounded-xl px-4"
              color={viewingTask?.status === "DONE" ? "green" : "gray"}
            >
              {viewingTask?.status}
            </Tag>
            <span className="text-gray-500">
              Due:{" "}
              {viewingTask?.deadline
                ? formatDeadline(viewingTask.deadline)
                : "No deadline set"}
            </span>
          </div>
          <p className="text-gray-700">{viewingTask?.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">
              {formatCreatedOrUpdated(viewingTask?.createdAt ?? "", "Created")}
            </span>
            <div className="space-x-2">
              <Button
                type="text"
                icon={<EditOutlined />}
                className="text-gray-500 hover:text-blue-600"
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="text-gray-500 hover:text-red-600"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DraggableTable;
