import { combineReducers } from "redux";
import user from "./userReducer";
import story from "./storyReducer";

export default combineReducers({
  user,
  story,
});
