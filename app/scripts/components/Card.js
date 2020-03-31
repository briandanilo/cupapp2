import React from "react";
import PropTypes from "prop-types";
import { Suits, Ranks } from "../models/deck";

class Card extends React.Component {

  render() {
    return (
      <div style={{
        width: this.props.width,
        height: this.props.height,
        border: "2px solid black",
        marginLeft: -1 * this.props.overlap,
        backgroundColor: this.props.backgroundColor,
        color: Suits[this.props.card.suit].suitColor,
        justifyContent: "flex-start",
        alignText: "left",
        fontSize: "22",
        display: "flex",
        paddingLeft: 4,
        borderRadius: "5px",
      }}>
        {Ranks[this.props.card.rank].rank}{Suits[this.props.card.suit].suitDisplay}
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  overlap: PropTypes.number,
  backgroundColor: PropTypes.string,
};

Card.defaultProps = {
  width: 60,
  height: 77,
  backgroundColor: "white",
  overlap: 15,
};

export default Card;