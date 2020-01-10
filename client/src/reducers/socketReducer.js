import { socketActionTypes } from "../actions/socketActions";

const initialState = {
  socketDisconnected: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case socketActionTypes.updateSocketDisconnected:
      return Object.assign({}, state, {
        socketDisconnected: action.socketDisconnected,
      });
    default:
      return state;
  }
};
