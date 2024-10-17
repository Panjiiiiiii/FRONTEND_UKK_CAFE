import React from "react";

const Pagination = ({ currentPage, ordersPerPage, totalOrders, paginate }) => {
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  return (
    <nav>
      <ul className="flex justify-center mt-4">
        <li className="mx-1">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1} // Disable if on the first page
            className={`${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-800 hover:bg-yellow-900"
            } text-white font-bold py-2 px-4 rounded`}
          >
            Prev
          </button>
        </li>
        <li className="mx-1">
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages} // Disable if on the last page
            className={`${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-800 hover:bg-yellow-900"
            } text-white font-bold py-2 px-4 rounded`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
