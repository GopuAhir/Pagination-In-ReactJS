import React, { useEffect, useState } from "react";
import { getUsers, getLenght } from "./api/users";
import Table from "./components/DataTable";
import Pagination from "./components/Pagination";
import SelectLimit from "./components/SelectLimit";

const App = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  let totalPage = Math.ceil(getLenght() / limit);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const handlePageChange = (value) => {
    if (value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if ("&rsaquo;") {
      if (page !== totalPage) {
        setPage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPage);
    } else {
      setPage(value);
    }
  };

  return (
    <div className="container">
      <Table users={getUsers(page, limit)} />
      <div className="pagination-container">
        <SelectLimit onLimitChange={setLimit} />
      </div>
      <Pagination
        totalPage={totalPage}
        page={page}
        limit={limit}
        siblings={1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
