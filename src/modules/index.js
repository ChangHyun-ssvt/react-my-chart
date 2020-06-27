import { combineReducers } from "redux";
import genie from "./genie";
import melon from "./melon";
import bugs from "./bugs";

const rootReducer = combineReducers({
  genie,
  melon,
  bugs,
});

export default rootReducer;
