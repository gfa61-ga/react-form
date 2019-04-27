import React from "react";

function Table(props) {

    let { fieldNames, editedRowId, editedRowValues, rows } = props;
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
              key={idx}
            >
              <td>
                {idx}
              </td>

              {fieldNames.map((fieldName, i) => (
                <td
                  key={i}
                >
                  {editedRowId !=="" && editedRowId === idx ? (
                    <input
                      type="text"
                      name={fieldName}
                      value={editedRowValues[fieldName]}
                      onChange={props.handleEditedRowChange()}
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
                {editedRowId === "" || editedRowId !== idx ? (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={props.handleEditSpecificRow(idx)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={props.handleSaveSpecificRow(idx)}
                  >
                    Save
                  </button>
                )}
              </td>

              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={props.handleRemoveSpecificRow(idx)}
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