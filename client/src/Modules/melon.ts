import { chartProps } from "../Components/Chart/ChartList";
export const INSERT = "melon/INSERT" as const;

type stateType = {
  melonChart: chartProps[];
  isLoading: boolean;
};

const initialState = { melonChart: [], isLoading: true };

const melon = (state: stateType = initialState, action: any) => {
  switch (action.type) {
    case INSERT:
      if (state.melonChart.length >= 100) {
        state.melonChart = [];
      }
      return {
        ...state,
        isLoading: false,
        melonChart: state.melonChart.concat(action.chart),
      };
    default:
      return state;
  }
};

export default melon;
