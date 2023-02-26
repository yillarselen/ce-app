import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PProps {
  limit: number;
  offset: number;
  total: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  reset: (value: number) => void;
}

const Pagination: React.FC<PProps> = ({
  limit,
  offset,
  total,
  setLimit,
  setOffset,
  reset,
}) => {
  const limitOptions = [10, 20, 30, 40, 50];

  const from = Math.min(offset + 1, total);
  const to = Math.min(offset + limit, total);
  const pageCount = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;
  const highestPossibleOffset = limit * (pageCount - 1);
  const pageArray = [-2, -1, 0, 1, 2]
    .map((v) => currentPage + v)
    .filter((page) => page > 0 && page <= pageCount);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {`${from} - ${to}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {total}
          </span>
        </span>

        <div className="flex">
          <select
            className="items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm p-2 py-2 dark:bg-gray-800 dark:text-white mr-5"
            onChange={(v: React.ChangeEvent<HTMLSelectElement>) => {
              reset(parseInt(v.target.value));
            }}
          >
            {limitOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
                className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <FontAwesomeIcon icon={["fas", "angle-left"]} />
              </button>
            </li>
            {pageArray.map((page) => {
              return (
                <li
                  key={page}
                  onClick={() => {
                    setOffset(limit * (page - 1));
                  }}
                >
                  <button
                    className={`${
                      currentPage === page
                        ? "bg-blue-500 text-white border-blue-300 hover:bg-blue-500 hover:text-white"
                        : ""
                    } px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            {!pageArray.includes(pageCount) && (
              <>
                <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  ...
                </span>

                <li
                  onClick={() => {
                    setOffset(highestPossibleOffset);
                  }}
                >
                  <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {pageCount}
                  </button>
                </li>
              </>
            )}
            <li>
              <button
                onClick={() =>
                  setOffset((prev) =>
                    Math.min(prev + limit, highestPossibleOffset)
                  )
                }
                className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <FontAwesomeIcon icon={["fas", "angle-right"]} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
