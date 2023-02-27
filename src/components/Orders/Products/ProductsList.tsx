import { Line } from "../../../models/Order.model";
import ProductItem from "./ProductItem";

interface OrderProductsProps {
  products: Line[];
}

const ProductsList = ({ products }: OrderProductsProps) => {
  return (
    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
      <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800 mb-6">
        Products
      </p>
      {products.map((item) => (
        <ProductItem key={item.Gtin} item={item} />
      ))}
    </div>
  );
};

export default ProductsList;
