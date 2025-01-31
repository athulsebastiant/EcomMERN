import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import "./CatEdit.css";
const CatEdit = ({ token }) => {
  const [list, setList] = useState([]);
  [];
  const [editedRows, setEditedRows] = useState({});
  const paginationModel = { page: 0, pageSize: 5 };
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/category/list");
      console.log(response);
      if (response.data.success) {
        // Store products with category IDs only
        setList(response.data.categories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const handleEditCellChange = (params) => {
    console.log("handleEditCellChange called with params:", params);

    // Get the edited value from the event
    const { id, field, value } = params;
    const newValue = value; // This is the new value entered

    console.log("Editing cell:", { id, field, newValue });

    // Only update if there's a value change
    if (newValue !== undefined) {
      setEditedRows((prev) => {
        const updatedRows = {
          ...prev,
          [id]: {
            ...prev[id],
            [field]: newValue,
          },
        };
        console.log("Updated editedRows:", updatedRows);
        return updatedRows;
      });
    }
  };
  const handleSave = async () => {
    try {
      const updates = Object.entries(editedRows).map(async ([id, changes]) => {
        console.log("Processing update for id:", id, "changes:", changes);

        // Create update payload with only changed fields
        const updatePayload = {};
        if (changes.name !== undefined) updatePayload.name = changes.name;
        if (changes.description !== undefined)
          updatePayload.description = changes.description;

        // Only make the API call if there are changes
        if (Object.keys(updatePayload).length > 0) {
          const response = await axios.patch(
            `${backendUrl}/api/category/update/${id}`,
            updatePayload,
            {
              headers: { token },
            }
          );

          if (!response.data.success) {
            throw new Error(response.data.message);
          }
          return response;
        }
        return null;
      });

      // Filter out null responses (where no update was needed) and wait for all updates
      const responses = await Promise.all(updates);
      const completedUpdates = responses.filter(
        (response) => response !== null
      );

      if (completedUpdates.length > 0) {
        toast.success("Categories updated successfully");
        setEditedRows({}); // Clear edited rows after successful update
        await fetchList(); // Refresh the list
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to update categories");
    }
  };
  const columns = [
    { field: "name", headerName: "Category Name", width: 130, editable: true },

    {
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
    },
  ];

  const rows = list.map((category, index) => ({
    id: category._id || index,
    name: category.name,
    description: category.description,
  }));

  return (
    <>
      <h3 style={{ marginBottom: "1.5rem", color: "#ddd" }}>All Categories</h3>
      <Button
        variant="contained"
        sx={{ marginBottom: "1rem" }}
        onClick={handleSave}
        disabled={Object.keys(editedRows).length === 0}
      >
        Save ({Object.keys(editedRows).length} changes)
      </Button>
      <Paper sx={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowHeight={150}
          processRowUpdate={(updatedRow, originalRow) => {
            console.log("Processing row update:", { updatedRow, originalRow });

            // Find changed field
            const changedField = Object.keys(updatedRow).find(
              (key) => updatedRow[key] !== originalRow[key]
            );

            if (changedField) {
              handleEditCellChange({
                id: updatedRow.id,
                field: changedField,
                value: updatedRow[changedField],
              });
            }
            return updatedRow;
          }}
          onProcessRowUpdateError={(error) => {
            console.error("Error updating row:", error);
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell--editing": {
              backgroundColor: "#ffcccb",
              color: "#000000",
            },
          }}
        />
      </Paper>
    </>
  );
};

export default CatEdit;
