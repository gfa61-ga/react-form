import uuid from 'uuid/v4';

export const rowsReducer = (prevRows, action) => {
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
      action.payload.fieldNames.map((fieldName) => (
        item[fieldName]=""
      ))
      return [...prevRows, item];
    case "REMOVE_ROW":
      return prevRows.slice(0, -1);
    default:
      return prevRows;
  }
};

export const editedRowValuesReducer = (prevEditedRowValues, action) => {
  switch (action.type) {
    case "EDITED_ROW_CHANGE":
      return {
        ...prevEditedRowValues,
        [action.payload.name]: action.payload.value
      };
    case "EDIT_SPECIFIC_ROW":
      return action.payload.rowValues;
    case "SAVE_SPECIFIC_ROW":
      return {};
    case "ADD_ROW":
      const item = {id: uuid()};
      action.payload.fieldNames.map((fieldName) => (
        item[fieldName]=""
      ))
      return item;
    case "REMOVE_ROW":
      return {};
    default:
      return prevEditedRowValues;
  }
};

export const editedRowIdReducer = (prevEditedRowId, action) => {
  switch (action.type) {
    case "EDIT_SPECIFIC_ROW":
      return action.payload.idx;
    case "SAVE_SPECIFIC_ROW":
      return "";
    case "REMOVE_SPECIFIC_ROW":
      return "";
    case "ADD_ROW":
      return action.payload.newRowId;
    case "REMOVE_ROW":
      return "";
    default:
      return prevEditedRowId;
  }
};

