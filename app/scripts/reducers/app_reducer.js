import teams from '../teams.js'
export default function AppReducer(state, action) {
  if (state === undefined) {
    return {
    };
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
    case "GOT_CHIP_BET_HISTORY":
      let chipCounts = updateChipCounts(action.data)
      let teamTotals = getTeamTotals(chipCounts)
      return Object.assign({}, state, {teamTotals: teamTotals}, { chipHistory: action.data}, {chipCounts:chipCounts})
  }

  console.log("Unhandled State!");
  return state;
}

function updateChipCounts(history){
  let temp = JSON.parse(JSON.stringify(teams));
  history.forEach((i)=>{
    temp[i.verifiedUser].chipCount -= i.amount;
    temp[i.transferee].chipCount += i.amount;
  })
  return temp
}

function getTeamTotals(chipCounts){
  let totals = {
    barnesTotal: 0,
    fowlerTotal: 0
  }
  Object.keys(chipCounts).map((i)=>{
    if (chipCounts[i].team == "Team Barnes")
      totals.barnesTotal += chipCounts[i].chipCount
    else
      totals.fowlerTotal += chipCounts[i].chipCount
  })
  return totals
}
