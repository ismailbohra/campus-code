// CustomTable.js
import React from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Paper } from "@mui/material";

const CustomTable = ({ columns, data }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiTableBodyRowProps={{
        hover: true,
      }}
    />
  );
};

export default CustomTable;
