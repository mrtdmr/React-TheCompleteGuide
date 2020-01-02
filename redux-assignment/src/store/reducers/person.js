import * as actionTypes from "../actions";
const initialState = {
  persons: []
};
const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      return {
        ...state,
        persons: state.persons.concat(action.personData)
      };
    case actionTypes.DELETE_PERSON:
      const updatedPersons = state.persons.filter(p => p.id != action.id);
      return {
        ...state,
        persons: updatedPersons
      };
  }
  return state;
};
export default personReducer;
