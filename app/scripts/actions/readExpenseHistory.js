export default function readExpenseHistory (expense) {

  return function (dispatch) {

    dispatch( { type: "STARTING_DB_CALL" });

    var BASE_URL = 'https://friendlywager.herokuapp.com/read/'
    var DB_NAME = 'cupdemo'
    var URL = BASE_URL + DB_NAME

    let settings = {
      contentType: 'application/json',
      url: URL,
    }

    return $.ajax(settings).then((d,s,x)=>{
      console.log("dsx ",d,x,s)
      //dispatch(sendEmail(bet))
      dispatch( { type: "GOT_EXPENSE_HISTORY", data:d })
    })

    // .then(function (data,err,x) {
    //   console.log("data : ",data.values)
    //   if (err == "success")
    //     dispatch( { type: "SUCCESSFUL_GOOGLE_API_CALL", sheet: sheetName, data: data.values })
    //   else
    //     dispatch( { type: "FAILED_GOOGLE_API_CALL", sheet: sheetName, data: err })
    // })
  }
}
