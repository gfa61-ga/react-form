import React from "react";
import Table from "./Table";
import { useReducer, createContext } from "react";
import uuid from 'uuid/v4';

export const MyAppContext = createContext();

function App() {

  const fieldNames = Object.keys({
    name: "",
    mobile: "",
    test: "",
    ebg: "",
  });


  const rowsReducer = (prevRows, action) => {
    let currentRows = [...prevRows];
    switch (action.type) {
      case "SAVE_SPECIFIC_ROW":
        currentRows[action.payload.idx] = {...action.payload.editedRowValues};
        return currentRows;
      case "REMOVE_SPECIFIC_ROW":
        currentRows.splice(action.payload.idx, 1);
        return currentRows;
      case "ADD_ROW":
        const item = {id: uuid()};
        fieldNames.map((fieldName) => (
          item[fieldName]=""
        ))
        return [...prevRows, item];
      case "REMOVE_ROW":
        return prevRows.slice(0, -1);
      default:
        return prevRows;
    }
  };

  const [rows, dispatchRows] = useReducer(rowsReducer, [{
      id: uuid(),
      name: "",
      mobile: "",
      test: "",
      ebg: "",
    }]
  );


  const editedRowValuesReducer = (prevEditedRowValues, action) => {
    switch (action.type) {
      case "EDITED_ROW_CHANGE":
        return {
          ...prevEditedRowValues,
          [action.payload.name]: action.payload.value
        };
      case "EDIT_SPECIFIC_ROW":
        return rows[action.payload.idx];
      case "SAVE_SPECIFIC_ROW":
        return {};
      case "ADD_ROW":
        const item = {id: uuid()};
        fieldNames.map((fieldName) => (
          item[fieldName]=""
        ))
        return item;
      case "REMOVE_ROW":
        return {};
      default:
        return prevEditedRowValues;
    }
  };

  const [editedRowValues, dispatchEditedRowValues] = useReducer(
    editedRowValuesReducer,
    {}
  );


  const editedRowIdReducer = (prevEditedRowId, action) => {
    switch (action.type) {
      case "EDIT_SPECIFIC_ROW":
        return action.payload.idx;
      case "SAVE_SPECIFIC_ROW":
        return "";
      case "REMOVE_SPECIFIC_ROW":
        return "";
      case "ADD_ROW":
        return rows.length-1;
      case "REMOVE_ROW":
        return "";
      default:
        return prevEditedRowId;
    }
  };

  const [editedRowId, dispatchEditedRowId] = useReducer(editedRowIdReducer, "");


  const dispatch = action =>[
    dispatchRows,
    dispatchEditedRowValues,
    dispatchEditedRowId
  ].forEach(fn => fn(action));


  const handleAddRow = () => {
    dispatch({
      type: "ADD_ROW"
    });
  };

  const handleRemoveRow = () => {
    dispatch({
      type: "REMOVE_ROW"
    });
  };


  return (
    <div>
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column">

            <MyAppContext.Provider value={{
              state: {
                editedRowId,
                editedRowValues,
                rows
              },
              dispatch,
              fieldNames
            }}>
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