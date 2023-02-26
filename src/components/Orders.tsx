import { useEffect, useState, useCallback } from "react";
import { Order, OrderResult } from "../models/Order.model";
import { ColorConfig } from "../models/ColorConfig.model";
import Pagination from "./Pagination";
import Table from "./Table";

const apiKey = process.env.REACT_APP_API_KEY;

const Orders = () => {
  const [tableData, setTableData] = useState<Order[]>([]);
  const [content, setContent] = useState<Record<string, OrderResult>>({});
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [servicePageIndex, setServicePageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const colorVariants: ColorConfig = {
    green: "bg-green-500 hover:bg-green-500",
    red: "bg-red-500 hover:bg-red-500",
    orange: "bg-orange-500 hover:bg-orange-500",
    gray: "bg-gray-400 hover:bg-gray-400",
  };

  const fetchOrders = useCallback(async () => {
    const response = await fetch(
      `https://api-dev.channelengine.net/api/v2/orders?page=${servicePageIndex}&apikey=${apiKey}`
    );
    const data = await response.json();
    return data;
  }, [servicePageIndex]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrders();
      setTotalCount(data.TotalCount);

      let original = { ...content };
      original[`page${servicePageIndex}`] = data;

      setContent(original);
      setItemsPerPage(data.ItemsPerPage);
    };

    const orders = content[`page${servicePageIndex}`];
    if (!orders) {
      fetchData();
    }
  }, [servicePageIndex, limit, content, fetchOrders]);

  useEffect(() => {
    if (itemsPerPage) {
      let pageIndex = Math.ceil((offset + limit) / itemsPerPage);
      if (content[`page${pageIndex}`]) {
        const subset = content[`page${pageIndex}`].Content.slice(
          offset % itemsPerPage,
          (offset % itemsPerPage) + limit
        );
        setTableData(subset);
      } else {
        setServicePageIndex(pageIndex);
      }
    }
  }, [offset, itemsPerPage, content, limit]);

  const resetTable = (value: number) => {
    setLimit(value);
    setOffset(0);
    setServicePageIndex(1);
    setContent({});
  };

  return (
    <>
      <div className="mb-5">
        <select
          id="status"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="">Choose a status</option>
          <option value="Returned">Returned</option>
          <option value="Shipped">Shipped</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>
      <Table data={tableData} colors={colorVariants} />
      <Pagination
        limit={limit}
        offset={offset}
        total={totalCount}
        setLimit={(value) => {
          setLimit(value);
        }}
        setOffset={(value) => {
          setOffset(value);
        }}
        reset={(value) => {
          resetTable(value);
        }}
      />
    </>
  );
};

export default Orders;
