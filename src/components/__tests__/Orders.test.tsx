import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import Orders from "../Orders/Orders";

describe("Orders", () => {
  const mockSetFilterParam = jest.fn();

  const mockData = {
    TotalCount: 20,
    ItemsPerPage: 10,
    Content: [
      {
        id: 1,
        customer: "John Doe",
        status: "Shipped",
        date: "2022-02-25T12:00:00.000Z",
      },
      {
        id: 2,
        customer: "Jane Doe",
        status: "Cancelled",
        date: "2022-02-24T12:00:00.000Z",
      },
    ],
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;
  });

  it("fetches data on mount", async () => {
    render(<Orders />);
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api-dev.channelengine.net/api/v2/orders?page=1&apikey=${process.env.REACT_APP_API_KEY}`
      )
    );
  });
});
