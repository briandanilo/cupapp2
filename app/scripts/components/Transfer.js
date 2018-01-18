import React from 'react'
import { connect } from "react-redux";
import container from '../containers/all.js'
import callGoogleApi from '../actions/googleApi.js'

class Transfer extends React.Component {


  displayCuppers(){
    console.log("display cuppers! ",this.props.cuppers)
    if (this.props.cuppers)
    return this.props.cuppers.map((i)=>{
      console.log(" i ",i[0])
      return <a href="#" className="list-group-item">{i[0]}</a>
    })
  }

  render () {
    if (!this.props.cuppers)
      this.props.dispatch(callGoogleApi("cuppers"))

    return (
      <main>
        <h3>Send Chips To</h3>
        <div className="list-group">
          {this.displayCuppers()}
        </div>
      </main>
    );
  }
}
export default connect(container.allState)(Transfer)
