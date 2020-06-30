const INSERT = "bugs/INCERT";

export const insert = () => ({ type: INSERT });

const initialState = { bugsChart: [], isLoading: true };

const bugs = (state = initialState, action) => {
  switch (action.type) {
    case insert:
      if (state.bugsChart.length >= 100) {
        state.bugsChart = [];
      }
      return {
        ...state,
        isLoading: false,
        bugsChart: state.bugsChart.concat(action.chart),
      };
    default:
      return state;
  }
};

export default bugs;
