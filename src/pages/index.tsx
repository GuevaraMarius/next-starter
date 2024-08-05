import React from "react";
import { formatDate } from "@/utils/functions/date";
import BlogPost from "@/components/BlogPost";

const Home: React.FC = () => {
  const blog = {
    title: "Embracing the Foundations of Development",
    description:
      "A comprehensive guide to understanding the basics of web development.",
    date: "2024-08-02T00:00:00Z",
    link: "https://dev.to/irabiziguevara/embracing-the-foundations-of-development-7lf",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <BlogPost
        title={blog.title}
        description={blog.description}
        date={formatDate(blog.date)}
        link={blog.link}
      />
    </div>
  );
};

export default Home;
