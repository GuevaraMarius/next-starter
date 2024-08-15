import React, { useState, FC } from "react";
import { Table, Tag, Space, Checkbox, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, DragOutlined } from "@ant-design/icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import classNames from "classnames";

interface DataType {
  key: string;
  status: string;
  due: string;
  task: string;
  created: string;
  edited?: string;
  completed: boolean;
}

type DragItem = {
  index: number;
};

interface DraggableBodyRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableBodyRow: FC<DraggableBodyRowProps> = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = React.useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: "row",
    collect: (monitor) => {
      const item = monitor.getItem<DragItem>();
      const dragIndex = item ? item.index : -1;
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? "drop-over-downward" : "drop-over-upward",
      };
    },
    drop: (item: DragItem) => {
      moveRow(item.index, index);
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "row",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={classNames(className, {
        "drop-over": isOver,
        "dragging-row": isDragging,
      })}
      style={{
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
        ...style,
      }}
      {...restProps}
    />
  );
};

const DraggableTable: FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "1",
      status: "On Track",
      due: "Today",
      task: "Run some errands in town",
      created: "14 July 2024",
      completed: false,
    },
    {
      key: "2",
      status: "On Track",
      due: "30 July 2024",
      task: "Buy PS4 Controller",
      created: "14 July 2024",
      edited: "14 July 2024",
      completed: false,
    },
    {
      key: "3",
      status: "Done",
      due: "10 July 2024",
      task: "Finish project report",
      created: "5 July 2024",
      completed: true,
    },
    {
      key: "4",
      status: "Off-track",
      due: "15 July 2024",
      task: "Submit tax forms",
      created: "10 July 2024",
      completed: false,
    },
    {
      key: "5",
      status: "Done",
      due: "12 July 2024",
      task: "Renew car insurance",
      created: "1 July 2024",
      completed: true,
    },
    {
      key: "6",
      status: "On Track",
      due: "20 July 2024",
      task: "Prepare presentation for meeting",
      created: "14 July 2024",
      completed: false,
    },
    {
      key: "7",
      status: "Off-track",
      due: "11 July 2024",
      task: "Schedule doctor's appointment",
      created: "5 July 2024",
      completed: false,
    },
  ]);

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "key",
      key: "key",
      render: () => <DragOutlined style={{ cursor: "grab" }} />,
    },
    {
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag
          color={
            text === "Off-track" ? "red" : text === "Done" ? "gray" : "green"
          }
          style={{ minWidth: "100px", textAlign: "center" }}
        >
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      dataIndex: "due",
      key: "due",
    },
    {
      dataIndex: "task",
      key: "task",
    },
    {
      dataIndex: "created",
      key: "created",
    },
    {
      dataIndex: "edited",
      key: "edited",
    },
    {
      key: "actions",
      render: () => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined />
          </Tooltip>
        </Space>
      ),
    },
    {
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => <Checkbox checked={completed} />,
    },
  ];

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = dataSource[dragIndex];
    const newData = [...dataSource];
    newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, dragRow);
    setDataSource(newData);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        columns={columns}
        dataSource={dataSource}
        components={{
          body: {
            row: DraggableBodyRow,
          },
        }}
        pagination={false}
        className="draggable-table"
        onRow={(record, index) => ({
          index: index!,
          className: "draggable-row",
          moveRow,
        })}
        showHeader={false}
        scroll={{ x: "max-content" }}
      />
    </DndProvider>
  );
};

export default DraggableTable;
