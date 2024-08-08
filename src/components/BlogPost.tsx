import React from "react";

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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 role="heading" className="text-2xl font-bold mb-2">
        {title}
      </h1>
      <p role="description" className="text-gray-700 mb-4">
        {description}
      </p>
      <p role="date" className="text-gray-500 mb-4">
        {date}
      </p>
      <a
        href={link}
        role="link"
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Read more
      </a>
    </div>
  );
};

export default BlogPost;
