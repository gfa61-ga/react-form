import React from "react";

class Table extends React.Component {
  render() {
    let { fieldNames, editedRowId, editedRowValues, rows } = this.props;
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
              >
              <input
                disabled
                value={fieldName}
                className="form-control"
                style={{
                  textAlign: "center",
                  textDecoration: "underline",
                  color: "red"
                }}
              />
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
                      onChange={this.props.handleEditedRowChange()}
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
                    onClick={this.props.handleEditSpecificRow(idx)}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={this.props.handleSaveSpecificRow(idx)}
                  >
                    Save
                  </button>
                )}
              </td>

              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={this.props.handleRemoveSpecificRow(idx)}
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
}

export default Table;