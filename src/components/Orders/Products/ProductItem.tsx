import { Line } from "../../../models/Order.model";

interface ProductItemProps {
  item: Line;
}

const ProductItem = ({ item }: ProductItemProps) => {
  return (
    <div className="py-6 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full border-t border-gray-200">
      <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="w-full flex flex-col justify-start items-start space-y-8">
          <h3 className="text-xl  xl:text-xl font-semibold leading-6 text-gray-800">
            {item.Description}
          </h3>
        </div>
        <div className="flex justify-between space-x-8 items-start">
          <p className="text-base  xl:text-lg leading-6 text-gray-800">
            x{item.Quantity}
          </p>
          <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">
            {item.UnitPriceInclVat}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
