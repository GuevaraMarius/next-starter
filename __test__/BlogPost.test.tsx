import React from "react";
import { render, screen } from "@testing-library/react";
import BlogPost from "@/components/BlogPost";
import { describe, test } from "node:test";
import "@testing-library/jest-dom";

describe("Render blog post", () => {
  const mockProps = {
    title: "Test Title",
    description: "Test Description",
    date: "Test Date",
    link: "https://example.com",
  };

  it("renders the blog post correctly", () => {
    render(<BlogPost {...mockProps} />);

    const titleElement = screen.getByRole("heading");
    const descriptionElement = screen.getByRole("description");
    const dateElement = screen.getByRole("date");
    const linkElement = screen.getByRole("link");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", mockProps.link);
  });
});
