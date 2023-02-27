import { useState, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../Modal";
import { Order } from "../../models/Order.model";
import { getOrderDate } from "../../utils/helpers";
import ProductsList from "./Products/ProductsList";

interface OrderDetailProps {
  order: Order;
  status: ReactElement;
}

const OrderDetail = ({ order, status }: OrderDetailProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal>
          <>
            <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative px-6 w-auto my-6 mx-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <div>
                      <h3 className="text-2xl font-semibold">
                        Order #{order.ChannelOrderNo}
                      </h3>
                      <p className="text-base font-medium leading-6 text-gray-600">
                        {getOrderDate(order.OrderDate)}
                      </p>
                    </div>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <div>
                      <div className="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                          <ProductsList products={order.Lines} />
                          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                Summary
                              </h3>
                              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                  <p className="text-base leading-4 text-gray-800">
                                    Subtotal
                                  </p>
                                  <p className="text-base leading-4 text-gray-600">
                                    {order.CurrencyCode} {order.SubTotalInclVat}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                  <p className="text-base leading-4 text-gray-800">
                                    Shipping
                                  </p>
                                  <p className="text-base leading-4 text-gray-600">
                                    {order.ShippingCostsInclVat
                                      ? `${order.CurrencyCode} ${order.ShippingCostsInclVat}`
                                      : "Free"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center w-full">
                                <p className="text-base  font-semibold leading-4 text-gray-800">
                                  Total
                                </p>
                                <p className="text-base  font-semibold leading-4 text-gray-600">
                                  {order.CurrencyCode} {order.TotalInclVat}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
                              <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                                Status
                              </h3>
                              <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                  <div className="flex flex-col justify-start items-center">
                                    {status}
                                  </div>
                                </div>
                              </div>
                              <hr />
                              <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                                Payment Method
                              </h3>
                              <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                  <div className="flex flex-col justify-start items-center">
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                      {order.PaymentMethod}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                          <h3 className="text-xl  font-semibold leading-5 text-gray-800">
                            Customer
                          </h3>
                          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <div className="flex justify-start items-start flex-col space-y-2">
                                  <p className="text-base  font-semibold leading-4 text-left text-gray-800">
                                    {order.BillingAddress?.FirstName}{" "}
                                    {order.BillingAddress?.LastName}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                  <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                                    Shipping Address
                                  </p>
                                  <p className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                    {[
                                      order.BillingAddress.Line1,
                                      order.BillingAddress.Line2,
                                      order.BillingAddress.Line3,
                                    ]
                                      .filter((e) => e)
                                      .join(" ")}
                                    <br />
                                    {`${order.ShippingAddress.City} ${order.ShippingAddress.CountryIso} ${order.ShippingAddress.ZipCode}`}
                                  </p>
                                </div>
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                  <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">
                                    Billing Address
                                  </p>
                                  <p className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                    {[
                                      order.BillingAddress.Line1,
                                      order.BillingAddress.Line2,
                                      order.BillingAddress.Line3,
                                    ]
                                      .filter((e) => e)
                                      .join(" ")}
                                    <br />
                                    {`${order.BillingAddress.City} ${order.BillingAddress.CountryIso} ${order.BillingAddress.ZipCode}`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={["fas", "eye"]} />
      </button>
    </>
  );
};

export default OrderDetail;
