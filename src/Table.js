import React, { useContext } from "react";
import { MyAppContext } from "./App"

function Table() {

  const [
    editedRowId, setEditedRowId,
    editedRowValues, setEditedRowValues,
    rows, setRows,
    fieldNames
  ] = useContext(MyAppContext);

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