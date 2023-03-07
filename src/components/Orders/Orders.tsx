import { useEffect, useState, useCallback } from "react";
import { Order, OrderResult } from "../../models/Order.model";
import { ColorConfig } from "../../models/ColorConfig.model";
import Pagination from "../Pagination";
import Table from "../Table";
import Filter from "../Filter";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const Orders = () => {
  const [tableData, setTableData] = useState<Order[]>([]);
  const [content, setContent] = useState<Record<string, OrderResult>>({});
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [servicePageIndex, setServicePageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [filterParam, setFilterParam] = useState("");

  const colorVariants: ColorConfig = {
    green: "bg-green-500 hover:bg-green-500",
    red: "bg-red-500 hover:bg-red-500",
    orange: "bg-orange-500 hover:bg-orange-500",
    gray: "bg-gray-400 hover:bg-gray-400",
  };

  const fetchOrders = useCallback(async () => {
    let url = `${apiUrl}/api/v2/orders?page=${servicePageIndex}&apikey=${apiKey}`;
    if (filterParam) {
      url = `${url}&statuses=${filterParam}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }, [servicePageIndex, filterParam]);

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
  }, [servicePageIndex, limit, content, fetchOrders, filterParam]);

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

  const handleFilter = (item: string) => {
    resetTable(limit);
    setFilterParam(item);
  };

  return (
    <>
      <Filter handleFilter={handleFilter} />
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
