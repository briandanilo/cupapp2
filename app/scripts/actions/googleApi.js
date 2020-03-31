export default function callGoogleApi (sheetName) {

  return function (dispatch) {

    dispatch( { type: "STARTING_GOOGLE_API_CALL" });


    const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
    // const CLIENT_ID = '874892869774-1r8ffk6of10tuis2ov0geptc6iv5gjfg.apps.googleusercontent.com'
    const API_KEY = 'AIzaSyBAPR_o1Bs_xHi1zGkP2K8Ou5weX5zPwZs';
    //var SPREADSHEET_ID = '1ktpnUeTwGUM4gmKoKZvktbSaiNbth4gFEIrr2Hhhl04'
    const SPREADSHEET_ID = '1TqizJjnNGR2aTdkP5xGJJPHNepsJpgRhXTqhIR5mRJw';
    const url = baseUrl + SPREADSHEET_ID + '/values/' + sheetName + '?key=' + API_KEY;

    /*eslint-env jquery*/
    return $.ajax({
      url: url,
      headers: {},
      data: {}
    }).then(function (data,err) {
      console.log("data : ",data.values);
      if (err === "success")
        dispatch( { type: "SUCCESSFUL_GOOGLE_API_CALL", sheet: sheetName, data: data.values });
      else
        dispatch( { type: "FAILED_GOOGLE_API_CALL", sheet: sheetName, data: err });
    })
  }
}
