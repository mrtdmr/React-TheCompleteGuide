import * as actionTypes from "../actions";
const initialState = {
  persons: []
};
const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      return {
        ...state,
        persons: state.persons.concat(action.person)
      };
  }
  return state;
};
export default personReducer;
