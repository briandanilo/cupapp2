export default function AppReducer(state, action) {
  if (state === undefined) {
    return {};
  }

  switch (action.type) {
    case "SUCCESSFUL_GOOGLE_API_CALL":
      if (action.sheet == "cuppers")
        return Object.assign({}, state, { action: action.data })
      else if (action.sheet == "Super Bowl")
        var scoreArray = [action.data[1][7],action.data[1][8]]
        console.log("score array ",scoreArray)
        return Object.assign({}, state, { scorecard: scoreArray })
    case "GOT_EXPENSE_HISTORY":
      console.log("current state ",state)
      return Object.assign({}, state, { expenseHistory: action.data })

  }

  console.log("Unhandled State!");
  return state;
}
