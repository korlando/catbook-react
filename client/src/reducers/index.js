import { combineReducers } from "redux";
import user from "./userReducer";
import story from "./storyReducer";
import socket from "./socketReducer";

export default combineReducers({
  user,
  story,
  socket,
});
