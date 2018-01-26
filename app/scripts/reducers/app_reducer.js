export default function AppReducer(state, action) {
  if (state === undefined) {
    return {};
  }

  switch (action.type) {
    case "SUCCESSFUL_GOOGLE_API_CALL":
      if (action.sheet == "cuppers")
        return Object.assign({}, state, { action: action.data })
      else if (action.sheet == "Points")
        var scoreArray = [action.data[1][6],action.data[1][7]]
        console.log("score array ",scoreArray)
        return Object.assign({}, state, { scorecard: scoreArray })
  }

  console.log("Unhandled State!");
  return state;
}
