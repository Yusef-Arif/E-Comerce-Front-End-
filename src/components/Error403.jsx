import React from "react";

const Error403 = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column mt-5">
      <h1 className="text-danger fw-bold">ERROR 403</h1>
      <h4 className="text-dark fw-semibold">
        You do not have permission to access this page.
      </h4>
    </div>
  );
};

export default Error403;
