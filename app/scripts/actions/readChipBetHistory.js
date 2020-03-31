export default function readExpenseHistory () {

  return function (dispatch) {

    dispatch( { type: "STARTING_DB_CALL" });

    const BASE_URL = 'https://friendlywager.herokuapp.com/read/';
    const DB_NAME = 'cupBets';
    const URL = BASE_URL + DB_NAME;

    let settings = {
      contentType: 'application/json',
      url: URL,
    };

    /*eslint-env jquery*/
    return $.ajax(settings).then((d,s,x)=>{
      console.log("dsx ",d,x,s);
      //dispatch(sendEmail(bet))
      dispatch( { type: "GOT_CHIP_BET_HISTORY", data:d })
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
