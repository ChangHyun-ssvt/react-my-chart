const INSERT = "genie/INCERT";

export const insert = () => ({ type: INSERT });

const initialState = { genieChart: [], isLoading: true };

const genie = (state = initialState, action) => {
  switch (action.type) {
    case insert:
      if (state.genieChart.length >= 100) {
        state.genieChart = [];
      }
      return {
        ...state,
        isLoading: false,
        genieChart: state.genieChart.concat(action.chart),
      };
    default:
      return state;
  }
};

export default genie;
