import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import container from "../containers/all.js"

class Jeopardy extends React.Component {

  constructor(props) {
    super(props);
    this.getNewClue = this.getNewClue.bind(this);
    this.renderAnswer = this.renderAnswer.bind(this);
    this.state = {
      answer: "",
      question: "",
      category: "",
      value: "",
      showAnswer: false
    };
  }

  renderClue() {
    if (this.state.question && !this.state.showAnswer)
      return (<div className="jeopardy-clue-container">
        <h4>{this.state.value}</h4>
        <h5>{this.state.question}</h5>
        <button className="btn btn-default tools-btn" onClick={this.renderAnswer}>Show Answer</button>
      </div>);
    else if (this.state.question && this.state.showAnswer)
      return (<div className="jeopardy-clue-container">
        <h4>{this.state.value}</h4>
        <h5>{this.state.question}</h5>
        <p>{this.state.answer}</p>
      </div>)
  }

  renderAnswer() {
    this.setState({ showAnswer: true })
  }

  renderHeader() {
    if (!this.state.category)
      return (<h3>Jeopardy</h3>);
    else if (this.state.category)
      return (<h3>{this.state.category}</h3>)
  }

  getNewClue() {
    return fetch("http://jservice.io/api/random")
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson[0].category.title.length < 20) {
          this.setState({
            answer: resJson[0].answer,
            question: resJson[0].question,
            category: resJson[0].category.title.toUpperCase(),
            value: resJson[0].value,
            showAnswer: false,
          })
        } else {
          this.getNewClue().then(() => true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    return (<div><Link to="/">Back to Homepage</Link>
      <div className="Jeopardy Component">
        {this.renderHeader()}
        {this.renderClue()}
        <button className="btn btn-default tools-btn" onClick={this.getNewClue}>New Question</button>
      </div>
    </div>);
  }
}

export default connect(container.allState)(Jeopardy)
