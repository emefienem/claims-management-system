import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ClaimsGrid = ({ rowData, onCellEdit }: { rowData: any[]; onCellEdit: any }) => {
  const columnDefs = [
    { headerName: "Claim ID", field: "Claim ID" },
    { headerName: "Provider Name", field: "Provider Name" },
    { headerName: "Claim Status", field: "Claim Status" },
    { headerName: "Provider ID", field: "Provider ID" },
    { headerName: "Procedure Code", field: "Procedure Code" },
    { headerName: "Place of Service", field: "Place of Service" },
    { headerName: "Billed", field: "Billed" },
    { headerName: "Allowed", field: "Allowed" },
    { headerName: "Paid", field: "Paid" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} onCellValueChanged={onCellEdit} />
    </div>
  );
};

export default ClaimsGrid;
