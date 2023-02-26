import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../Table";
import { getOrderDate } from "../../utils/helpers";
import { ColorConfig } from "../../models/ColorConfig.model";
import { Order } from "../../models/Order.model";

describe("Table", () => {
  const colors: ColorConfig = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  const orders: Order[] = [
    {
      Id: 17,
      ChannelName: "Amazon.nl (v3) - TEST ACCOUNT ROWIN",
      ChannelOrderNo: "405-5742577-7982719",
      Status: "RETURNED",
      BillingAddress: {
        Line1: "Parallelweg 165",
        Line2: undefined,
        Line3: undefined,
        Gender: undefined,
        CompanyName: "",
        FirstName: "Eva",
        LastName: "de Vries",
        StreetName: "Parallelweg",
        HouseNr: "165",
        HouseNrAddition: "",
        ZipCode: "4624JB",
        City: "BERGEN OP ZOOM",
        Region: undefined,
        CountryIso: "NL",
        Original: undefined,
      },
      ShippingAddress: {
        Line1: "Parallelweg 165",
        Line2: undefined,
        Line3: undefined,
        Gender: undefined,
        CompanyName: "",
        FirstName: "Eva",
        LastName: "de Vries",
        StreetName: "Parallelweg",
        HouseNr: "165",
        HouseNrAddition: "",
        ZipCode: "4624JB",
        City: "BERGEN OP ZOOM",
        Region: undefined,
        CountryIso: "NL",
        Original: undefined,
      },
      SubTotalInclVat: 6.25,
      TotalInclVat: 10.5,
      Lines: [
        {
          Gtin: undefined,
          Description: "Valma 1830572 W21 Rubber Stick 38 ml",
          Quantity: 1,
          UnitPriceInclVat: 6.25,
        },
      ],
      ShippingCostsInclVat: 4.25,
      PaymentMethod: "OTHER",
      CurrencyCode: "EUR",
      OrderDate: "2023-02-21T14:01:40+00:00",
    },
  ];

  it("renders table rows with order data", () => {
    render(<Table data={orders} colors={colors} />);

    expect(screen.getAllByRole("row")).toHaveLength(2);
    expect(
      screen.getByText("Amazon.nl (v3) - TEST ACCOUNT ROWIN")
    ).toBeInTheDocument();
    expect(screen.getByText("405-5742577-7982719")).toBeInTheDocument();
    expect(
      screen.getByText(getOrderDate(orders[0].OrderDate))
    ).toBeInTheDocument();
    expect(screen.getByText("RETURNED")).toBeInTheDocument();
    expect(screen.getByText("EUR 10.5")).toBeInTheDocument();
  });

  it("displays correct status color and text", () => {
    render(<Table data={orders} colors={colors} />);

    const newOrderStatus = screen.getByText("RETURNED");
    expect(newOrderStatus).toHaveClass("bg-red-500");
    expect(newOrderStatus).toHaveTextContent("RETURNED");
  });
});
