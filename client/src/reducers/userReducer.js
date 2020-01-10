import { userActionTypes } from "../actions/userActions";

const initialState = {
  userId: '',
  user: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.updateUserId:
      return Object.assign({}, state, {
        userId: action.userId,
      });
    case userActionTypes.updateUser:
      return Object.assign({}, state, {
        user: action.user,
      });
    default:
      return state;
  }
};
