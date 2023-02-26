import { Status } from "../models/Status.model";

export const getOrderDate = (date: string): string => {
  const newDate = new Date(date).toLocaleString("en-GB", { timeZone: "UTC" });

  console.log(newDate);
  return newDate;
};

export const getStatusConfig = (status: string) => {
  switch (status) {
    case Status.NEW:
      return {
        text: "NEW",
        color: "gray",
      };
    case Status.IN_PROGRESS:
      return {
        text: "IN PROGRESS",
        color: "orange",
      };
    case Status.SHIPPED:
      return {
        text: "SHIPPED",
        color: "green",
      };
    case Status.RETURNED:
      return {
        text: "RETURNED",
        color: "red",
      };
    default:
      return {
        text: "N/A",
        color: "gray",
      };
  }
};
