import { Order } from "../models/Order.model";

interface TableProps {
  data?: Order[];
}

const Table = ({ data }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Channel</th>
          <th>Channel Order No</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Invoice Address</th>
          <th>Order Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.Id}>
            <td>{item.ChannelName}</td>
            <td>{item.ChannelOrderNo}</td>
            <td>{item.OrderDate}</td>
            <td>{item.Status}</td>
            <td>{item.BillingAddress?.FirstName}</td>
            <td>{item.TotalInclVat}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
