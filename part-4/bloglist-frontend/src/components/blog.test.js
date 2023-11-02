import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Blog } from "./Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog />,", () => {
  const blog = {
    title: "test-title",
    author: "tester",
    url: "testing.com",
    likes: 4,
  };

  test("renders title and author but not url and likes", () => {
    render(<Blog blog={blog} />);

    screen.debug();

    const element = screen.getByText("test-title tester");
    expect(element).toBeDefined();
  });

  test("renders url and likes when button clicked", async () => {
    const { container } = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const div = container.querySelector("toggled-content");
    expect(div).toBeDefined();
    //when button that has a value of view clicked is there a any div with className of "toggle-content"
  });

  test("prop called twice when like butoon clicked 2 times", async () => {
    const mockHandler = jest.fn();

    render(<Blog blog={blog} handleLikes={mockHandler} />);

    const user = userEvent.setup();
    const toggleButton = screen.getByText("view");
    await user.click(toggleButton);
    // like button appears after view button clicked so first handle view button click

    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
