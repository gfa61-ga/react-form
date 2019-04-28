import React from "react";
import Table from "./Table";
import { useState, createContext } from "react";
import uuid from 'uuid/v4';

export const MyAppContext = createContext();

function App() {
  const [editedRowId, setEditedRowId] = useState("");

  const [editedRowValues, setEditedRowValues] = useState({});

  const [rows, setRows] = useState([{
      id: uuid(),
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

  const handleAddRow = () => {
    const item = {id: uuid()};
    fieldNames.map((fieldName) => (
      item[fieldName]=""
    ))
    console.dir(rows)
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

            <MyAppContext.Provider value={[
              editedRowId, setEditedRowId,
              editedRowValues, setEditedRowValues,
              rows, setRows,
              fieldNames
            ]}>
              <Table />
            </MyAppContext.Provider>

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