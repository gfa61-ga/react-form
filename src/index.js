import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  state = {
    editedRowId: "",
    editedRowValues: {},
    rows: [{
      name: "",
      mobile: "",
      test: "",
      ebg: "",
    }]
  };
  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {...rows[idx],
      [name]: value
    };
    this.setState({
      rows
    });
  };
  handleEditedRowChange = () => e => {
    const { name, value } = e.target;
    let editedRowValues = {...this.state.editedRowValues,
      [name]: value
    };
    this.setState({
      editedRowValues
    });
  };
  handleSaveSpecificRow = idx => e => {
    const rows = [...this.state.rows];
    rows[idx] = {...this.state.editedRowValues};
    this.setState({
      rows,  editedRowId: "",
    editedRowValues: {}
    });
  };

  handleAddRow = () => {
    const item = {
    };
    Object.keys(this.state.rows[0]).map((fieldName) => (
      item[fieldName]=""
    ))
    this.setState({
      rows: [...this.state.rows, item], editedRowId: this.state.rows.length, editedRowValues: item
    });
  };
  handleRemoveRow = () => {
    if (this.state.rows.length > 1) {
      this.setState({
        rows: this.state.rows.slice(0, -1), editedRowId: "",
      editedRowValues: {}
      });
    }
  };
  handleRemoveSpecificRow = (idx) => () => {
    if (idx > 0) {
      const rows = [...this.state.rows]
      rows.splice(idx, 1)
      this.setState({ rows, editedRowId: "" })
    }
  }
  handleEditSpecificRow = (idx) => () => {
    const editedRowId = idx
    this.setState({ editedRowId , editedRowValues: this.state.rows[idx]})
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                      <th className="text-center"> # </th>
                      {Object.keys(this.state.rows[0]).map((fieldName, i) => (
                        <th className="text-center" key={i}> {fieldName} </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>


                      {Object.keys(this.state.rows[0]).map((fieldName, i) => (
                          <td key={i}>
                            {this.state.editedRowId !=="" && this.state.editedRowId === idx ? (
                              <input
                                type="text"
                                name={fieldName}
                                value={this.state.editedRowValues[fieldName]}
                                onChange={this.handleEditedRowChange()}
                                className="form-control"
                              />
                            ) : (
                              <input  className="form-control" disabled
                                value={this.state.rows[idx][fieldName]}
                              />
                            )}
                          </td>
                        ))}

                      <td>
                        {this.state.editedRowId === "" || this.state.editedRowId !== idx ? (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={this.handleEditSpecificRow(idx)}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={this.handleSaveSpecificRow(idx)}
                          >
                            Save
                          </button>
                          )}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Row
              </button>
              <button
                onClick={this.handleRemoveRow}
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
}

render(<App />, document.getElementById("root"));