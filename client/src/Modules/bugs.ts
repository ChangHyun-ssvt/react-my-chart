import { chartProps } from "../Components/Chart/ChartList";

export const INSERT = "bugs/INCERT";

type stateType = {
  bugsChart: chartProps[];
  isLoading: boolean;
};

const initialState = { bugsChart: [], isLoading: true };

const bugs = (state: stateType = initialState, action: any) => {
  switch (action.type) {
    case INSERT:
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
