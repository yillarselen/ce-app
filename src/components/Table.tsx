import { getOrderDate, getStatusConfig } from "../utils/helpers";
import { ColorConfig } from "../models/ColorConfig.model";
import { Order } from "../models/Order.model";
import OrderDetail from "./Orders/OrderDetail";

interface TableProps {
  data?: Order[];
  colors: ColorConfig;
}

const Table = ({ data, colors }: TableProps) => {
  const getStatus = (status: string) => {
    const config = getStatusConfig(status);

    return (
      <span
        className={`${
          colors[config.color]
        } text-white rounded py-1 px-3 text-xs inline-block truncate`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Channel
            </th>
            <th scope="col" className="px-6 py-3">
              Channel Order No
            </th>
            <th scope="col" className="px-6 py-3">
              Order Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Invoice Address
            </th>
            <th scope="col" className="px-6 py-3">
              Order Total
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr
              key={item.Id}
              className="even:bg-gray-50 odd:bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{item.ChannelName}</td>
              <td className="px-6 py-4">{item.ChannelOrderNo}</td>
              <td className="px-6 py-4">
                {item.OrderDate && getOrderDate(item.OrderDate)}
              </td>
              <td className="px-6 py-4">{getStatus(item.Status)}</td>
              <td className="px-6 py-4">
                {`${item.BillingAddress?.FirstName} ${item.BillingAddress?.LastName}`}
                <br />
                {`${item.BillingAddress?.ZipCode} ${item.BillingAddress?.City} (${item.BillingAddress?.CountryIso})`}
              </td>
              <td className="px-6 py-4">
                {item.CurrencyCode} {item.TotalInclVat}
              </td>
              <td className="px-6 py-4">
                <OrderDetail order={item} status={getStatus(item.Status)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
