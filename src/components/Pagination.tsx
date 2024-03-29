import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationProps {
  limit: number;
  offset: number;
  total: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  reset: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  limit,
  offset,
  total = 0,
  setLimit,
  setOffset,
  reset,
}) => {
  const limitOptions = [10, 20, 30, 40, 50];

  const from = Math.min(offset + 1, total) | 0;
  const to = Math.min(offset + limit, total) | 0;
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
        <span className="text-sm font-normal text-gray-500">
          {`Showing ${from} - ${to} of ${total}`}
        </span>

        {total ? (
          <div className="flex">
            <select
              data-testid="combobox"
              className="items-center text-gray-500 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm p-2 py-2 mr-5"
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
                  data-testid="previous-button"
                  disabled={currentPage === 1}
                  onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
                  className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
                    currentPage !== 1
                      ? "hover:bg-gray-100 hover:text-gray-700"
                      : " opacity-50"
                  }`}
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
                          ? "bg-blue-500 text-white border-blue-300 hover:bg-blue-500"
                          : " hover:bg-gray-100 hover:text-gray-700"
                      } px-3 py-2 leading-tight text-gray-500 border border-gray-300`}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}
              {!pageArray.includes(pageCount) && (
                <>
                  <span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    ...
                  </span>

                  <li
                    onClick={() => {
                      setOffset(highestPossibleOffset);
                    }}
                  >
                    <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                      {pageCount}
                    </button>
                  </li>
                </>
              )}
              <li>
                <button
                  data-testid="next-button"
                  disabled={currentPage === pageCount}
                  onClick={() =>
                    setOffset((prev) =>
                      Math.min(prev + limit, highestPossibleOffset)
                    )
                  }
                  className={`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
                    currentPage !== pageCount
                      ? "hover:bg-gray-100 hover:text-gray-700"
                      : " opacity-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <FontAwesomeIcon icon={["fas", "angle-right"]} />
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Pagination;
