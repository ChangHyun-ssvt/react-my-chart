const INSERT = "melon/INCERT";

export const insert = () => ({ type: INSERT });

const initialState = { melonChart: [], isLoading: true };

const melon = (state = initialState, action) => {
  switch (action.type) {
    case insert:
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
