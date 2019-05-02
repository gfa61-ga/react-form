import React, { useContext } from "react";
import { MyAppContext } from "./App"

function Table() {

  const { state, dispatch, fieldNames } = useContext(MyAppContext);

  const { editedRowId, editedRowValues, rows } = state;

  const handleEditedRowChange = () => e => {
    dispatch({
      type: "EDITED_ROW_CHANGE",
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    });
  };

  const handleEditSpecificRow = (idx) => () => {
    dispatch({
      type: "EDIT_SPECIFIC_ROW",
      payload: {
        idx
      }
    });
  };

  const handleSaveSpecificRow = (idx) => () => {
    dispatch({
      type: "SAVE_SPECIFIC_ROW",
      payload: {
        idx,
        editedRowValues
      }
    });
  };

  const handleRemoveSpecificRow = (idx) => () => {
    dispatch({
      type: "REMOVE_SPECIFIC_ROW",
      payload: {
        idx
      }
    });
  };

  return (
    <table
      className="table table-bordered table-hover"
      id="tab_logic"
    >
      <thead>
        <tr>
          <th className="text-center"> # </th>
          {fieldNames.map((fieldName, i) => (
            <th
              key={i}
              className="text-center"
            >
              {fieldName}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((item, idx) => (
          <tr
            key={item.id}
          >
            <td>
              {idx}
            </td>

            {fieldNames.map((fieldName, i) => (
              <td
                key={i}
              >
                {editedRowId === idx ? (
                  <input
                    type="text"
                    name={fieldName}
                    value={editedRowValues[fieldName]}
                    onChange={handleEditedRowChange()}
                    className="form-control"
                  />
                ) : (
                  <input
                    disabled
                    value={rows[idx][fieldName]}
                    onChange={()=>{}}
                    className="form-control"
                  />
                )}
              </td>
            ))}

            <td>
              {editedRowId !== idx ? (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleEditSpecificRow(idx)}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleSaveSpecificRow(idx)}
                >
                  Save
                </button>
              )}
            </td>

            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleRemoveSpecificRow(idx)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;