import { userActionTypes } from "../actions/userActions";

const initialState = {
  userId: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.updateUserId:
      return Object.assign({}, state, {
        userId: action.userId,
      });
    default:
      return state;
  }
};
