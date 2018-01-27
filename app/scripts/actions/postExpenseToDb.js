export default function postExpense (expense) {

  return function (dispatch) {

    dispatch( { type: "STARTING_DB_CALL" });

    var BASE_URL = 'https://friendlywager.herokuapp.com/write/'
    var DB_NAME = 'cupdemo'
    var URL = BASE_URL + DB_NAME

    let settings = {
      type: 'POST',
      contentType: 'application/json',
      url: URL,
      data: JSON.stringify(expense),
    }

    return $.ajax(settings).then((d,s,x)=>{
      console.log("dsx ",d,x,s)
      //dispatch(sendEmail(bet))
      //dispatch( { type: "CLOSE_BETSLIP" })
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
