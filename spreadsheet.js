var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var doc = new GoogleSpreadsheet('1U4N1HxNj9SGXn8ioG-NcUaG3Ulffmrlq7PisbDUOwLM');
var sheet;

var YOUR_CLIENT_ID = '874892869774-1r8ffk6of10tuis2ov0geptc6iv5gjfg.apps.googleusercontent.com'
var YOUR_API_KEY = 'AIzaSyBAPR_o1Bs_xHi1zGkP2K8Ou5weX5zPwZs'
var YOUR_SPREADSHEET_ID = '1U4N1HxNj9SGXn8ioG-NcUaG3Ulffmrlq7PisbDUOwLM'

async.series([
  function setAuth(step) {
    var creds = require('./gsecret.json');
    doc.useServiceAccountAuth(creds, step);
    console.log("step ",creds)
  },
  function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
        step();
      });
    },
  ], function(err){
      if( err ) {
        console.log('Error: '+err);
      }
  });
