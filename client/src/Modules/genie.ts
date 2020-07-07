import { chartProps } from "../Components/Chart/ChartList";
export const INSERT = "melon/INSERT" as const;

type stateType = {
  genieChart: chartProps[];
  isLoading: boolean;
};

const initialState = { genieChart: [], isLoading: true };

const genie = (state: stateType = initialState, action: any) => {
  switch (action.type) {
    case INSERT:
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
