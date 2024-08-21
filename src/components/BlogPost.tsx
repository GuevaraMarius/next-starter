import React from "react";
import { Card, Typography, Space, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;

interface BlogPostProps {
  title: string;
  description: string;
  date: string;
  link: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  description,
  date,
  link,
}) => {
  return (
    <Card>
      <Space direction="vertical" size="middle">
        <Title level={3}>{title}</Title>
        <Paragraph role="description" ellipsis={{ rows: 3, expandable: false }}>
          {description}
        </Paragraph>
        <Text role="date" type="secondary">
          {date}
        </Text>
        <Link role="link" href={link} target="_blank">
          <Button type="primary">
            Read more <ArrowRightOutlined />
          </Button>
        </Link>
      </Space>
    </Card>
  );
};

export default BlogPost;
