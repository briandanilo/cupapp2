import readChipBetHistory from './readChipBetHistory'
export default function postExpense (expense) {

  return function (dispatch) {

    dispatch( { type: "STARTING_DB_CALL" });

    const BASE_URL = 'https://friendlywager.herokuapp.com/write/';
    const DB_NAME = 'cupBets';
    const URL = BASE_URL + DB_NAME;

    let settings = {
      type: 'POST',
      contentType: 'application/json',
      url: URL,
      data: JSON.stringify(expense),
    };

    /*eslint-env jquery*/
    return $.ajax(settings).then((d,s,x)=>{
      console.log("dsx ",d,x,s);
      if (s === "success") {
        alert("successfully posted chip bet");
        dispatch(readChipBetHistory());
      } else {
        alert("error ", s);
      }
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
