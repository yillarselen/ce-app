import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination component", () => {
  const mockSetLimit = jest.fn();
  const mockSetOffset = jest.fn();
  const mockReset = jest.fn();

  const props = {
    limit: 10,
    offset: 0,
    total: 100,
    setLimit: mockSetLimit,
    setOffset: mockSetOffset,
    reset: mockReset,
  };

  it("should render with correct initial state", () => {
    render(<Pagination {...props} />);
    const pageOneButton = screen.getByText("1");
    expect(pageOneButton).toHaveClass("bg-blue-500");
  });

  it("should display the correct pagination information", () => {
    render(<Pagination {...props} />);
    const pageInfo = screen.getByText("Showing 1 - 10 of 100");
    expect(pageInfo).toBeInTheDocument();
  });

  it("should call setOffset with correct value when clicking on a page button", () => {
    render(<Pagination {...props} />);
    const pageTwoButton = screen.getByText("2");
    fireEvent.click(pageTwoButton);
    expect(mockSetOffset).toHaveBeenCalledWith(10);
  });

  it("should call reset with correct value when changing limit", () => {
    render(<Pagination {...props} />);
    const select = screen.getByTestId("combobox");
    fireEvent.change(select, { target: { value: "20" } });
    expect(mockReset).toHaveBeenCalledWith(20);
  });

  it("should disable previous button when on first page", () => {
    render(<Pagination {...props} />);
    const previousButton = screen.getByTestId("previous-button");
    expect(previousButton).toBeDisabled();
  });

  it("should disable next button when on last page", () => {
    const propsWithOffset = { ...props, offset: 90 };
    render(<Pagination {...propsWithOffset} />);
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeDisabled();
  });
});
