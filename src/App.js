import React from "react";
import Table from "./Table";

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

  fieldNames = Object.keys(this.state.rows[0]);

  handleEditedRowChange = () => e => {
    const { name, value } = e.target;
    let editedRowValues = {
      ...this.state.editedRowValues,
      [name]: value
    };
    this.setState({
      editedRowValues
    });
  };

  handleEditSpecificRow = (idx) => () => {
    const editedRowId = idx
    this.setState({
      editedRowId,
      editedRowValues: this.state.rows[idx]
    })
  }

  handleSaveSpecificRow = idx => e => {
    const rows = [...this.state.rows];
    rows[idx] = {...this.state.editedRowValues};
    this.setState({
      rows,
      editedRowId: "",
      editedRowValues: {}
    });
  };

  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({
      rows,
      editedRowId: ""
    })
  }


  handleAddRow = () => {
    const item = {};
    this.fieldNames.map((fieldName) => (
      item[fieldName]=""
    ))
    this.setState({
      rows: [...this.state.rows, item],
      editedRowId: this.state.rows.length,
      editedRowValues: item
    });
  };

  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1),
      editedRowId: "",
      editedRowValues: {}
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <Table
                fieldNames={this.fieldNames}
                editedRowId={this.state.editedRowId}
                editedRowValues={this.state.editedRowValues}
                rows={this.state.rows}
                handleEditedRowChange={this.handleEditedRowChange}
                handleEditSpecificRow={this.handleEditSpecificRow}
                handleSaveSpecificRow={this.handleSaveSpecificRow}
                handleRemoveSpecificRow={this.handleRemoveSpecificRow}
              />

              <button
                onClick={this.handleAddRow}
                className="btn btn-primary"
              >
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

export default App;