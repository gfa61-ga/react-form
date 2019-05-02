import React from "react";
import Table from "./Table";
import { useReducer, createContext } from "react";
import uuid from 'uuid/v4';
import {rowsReducer,editedRowValuesReducer, editedRowIdReducer}
  from "./reducers";

export const MyAppContext = createContext();

function App() {

  const fieldNames = Object.keys({
    name: "",
    mobile: "",
    test: "",
    ebg: "",
  });


  const [rows, dispatchRows] = useReducer(rowsReducer, [{
      id: uuid(),
      name: "",
      mobile: "",
      test: "",
      ebg: "",
    }]
  );

  const [editedRowValues, dispatchEditedRowValues] = useReducer(
    editedRowValuesReducer,
    {}
  );

  const [editedRowId, dispatchEditedRowId] = useReducer(editedRowIdReducer, "");


  const dispatch = action =>[
    dispatchRows,
    dispatchEditedRowValues,
    dispatchEditedRowId
  ].forEach(fn => fn(action));


  const handleAddRow = () => {
    dispatch({
      type: "ADD_ROW",
      payload: {
        newRowId: rows.length,
        fieldNames
      }
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