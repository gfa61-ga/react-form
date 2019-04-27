import React from "react";
import Table from "./Table";
import {useState} from "react";

function App() {
  const [editedRowId, setEditedRowId] = useState("");
  const [editedRowValues, setEditedRowValues] = useState({});
  const [rows, setRows] = useState([{
      name: "",
      mobile: "",
      test: "",
      ebg: "",
    }]
  );
  const fieldNames = Object.keys({
    name: "",
    mobile: "",
    test: "",
    ebg: "",
  });

  const handleEditedRowChange = () => e => {
    const { name, value } = e.target;
    setEditedRowValues({
      ...editedRowValues,
      [name]: value
    });
  };

  const handleEditSpecificRow = (idx) => () => {
    const editedRowId = idx
    setEditedRowId(editedRowId)
    setEditedRowValues(rows[idx])
  }

  const handleSaveSpecificRow = idx => e => {
    const currentRows = [...rows];
    currentRows[idx] = {...editedRowValues};
    setRows(currentRows)
    setEditedRowId("")
    setEditedRowValues({})
  };

  const handleRemoveSpecificRow = (idx) => () => {
    const currentRows = [...rows];
    currentRows.splice(idx, 1);
    setRows(currentRows)
    setEditedRowId("")
  }


  const handleAddRow = () => {
    const item = {};
    fieldNames.map((fieldName) => (
      item[fieldName]=""
    ))
    setRows([...rows, item])
    setEditedRowId(rows.length)
    setEditedRowValues(item)
  };

  const handleRemoveRow = () => {
    setRows(rows.slice(0, -1))
    setEditedRowId("")
    setEditedRowValues({})
  };


  return (
    <div>
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column">
            <Table
              fieldNames={fieldNames}
              editedRowId={editedRowId}
              editedRowValues={editedRowValues}
              rows={rows}
              handleEditedRowChange={handleEditedRowChange}
              handleEditSpecificRow={handleEditSpecificRow}
              handleSaveSpecificRow={handleSaveSpecificRow}
              handleRemoveSpecificRow={handleRemoveSpecificRow}
            />

            <button
              onClick={handleAddRow}
              className="btn btn-primary"
            >
              Add Row
            </button>
            <button
              onClick={handleRemoveRow}
              className="btn btn-danger float-right"
            >
              Delete Last Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;