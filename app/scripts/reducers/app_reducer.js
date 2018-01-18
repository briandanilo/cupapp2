export default function AppReducer(state, action) {
  if (state === undefined) {
    return {};
  }

  switch (action.type) {
    case "SUCCESSFUL_GOOGLE_API_CALL":
      if (action.sheet == "cuppers")
        return Object.assign({}, state, { action: action.data })
      else if (action.sheet == "scorecard")
        return Object.assign({}, state, { scorecard: action.data })
  }

  console.log("Unhandled State!");
  return state;
}
