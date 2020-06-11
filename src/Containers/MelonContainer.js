import Melon from "../Routers/Melon";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  melonChart: state,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Melon);
