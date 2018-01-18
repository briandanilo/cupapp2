import React from 'react'
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js'
import ReactGoogleSheetConnector from "react-google-sheet-connector"
import google_auth from './google_auth.json'
import async from 'async'
import { GoogleTable } from "react-google-sheet-connector"
import { GoogleRoute } from "react-google-sheet-connector"

class Scorecard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {}
    //this.handleChange = this.handleChange.bind(this)
    //this.sendTestDispatch = this.sendTestDispatch.bind(this)
  }

  //AIzaSyD4pSJ2OOq1sKRKOwDDayEg0n0TyyNFEsg




  render () {
    console.log("gauth ",google_auth)
    // const leftStyle = {
    //   // background: 'blue',
    //   // text: "white"
    // };
    // const rightStyle = {
    //   background: 'red',
    // };
    var YOUR_CLIENT_ID = '874892869774-1r8ffk6of10tuis2ov0geptc6iv5gjfg.apps.googleusercontent.com'
    var YOUR_API_KEY = 'AIzaSyBAPR_o1Bs_xHi1zGkP2K8Ou5weX5zPwZs'
    var YOUR_SPREADSHEET_ID = '1U4N1HxNj9SGXn8ioG-NcUaG3Ulffmrlq7PisbDUOwLM'

    const MyComponent = (props) => {
      console.log("hi props ",props)
        return (
            <div>
                {
                    props.getSheet("Sheet Name")
                        .map((row, i) =>
                            JSON.stringify(row)
                        )
                }
            </div>
        )
    }

    return (<div>
      <ReactGoogleSheetConnector clientid={YOUR_CLIENT_ID}
        apiKey={YOUR_API_KEY}
        spreadsheetId={YOUR_SPREADSHEET_ID}
        spinner={ <div className="loading-spinner"/> }>
        <div>Success!</div>
      </ReactGoogleSheetConnector>
      <div className="panel panel-default scorecard">
        <div className="panel-heading">
          <h3 className="panel-title">Team Joe</h3>
        </div>
        <div className="panel-body">
          100
        </div>
      </div>
      <div className="panel panel-default scorecard">
        <div className="panel-heading">
          <h3 className="panel-title">Team Jen</h3>
        </div>
        <div className="panel-body">
          200
        </div>
      </div>
    </div>);
  }
}

export default connect(container.allState)(Scorecard)
