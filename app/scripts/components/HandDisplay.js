import React from "react";
import PropType from "prop-types";
import { chunk } from "../utils";
import Card from "./Card";

class HandDisplay extends React.Component {

  render() {
    return (<div style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        minHeight: this.props.cardHeight
      }}>
        {chunk(
          this.props.hand, this.props.maxCardsPerLine)
          .map((row, index) =>
            <div
              key={index}
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                marginLeft: this.props.overlap,
              }}>{row.map((card, index) => <Card key={index}
                                                 card={card}
                                                 overlap={this.props.overlap}
                                                 height={this.props.cardHeight} />)}
            </div>
          )}
      </div>
    );
  }
}

HandDisplay.propTypes = {
  cardHeight: PropType.number.isRequired,
  maxCardsPerLine: PropType.number.isRequired,
  hand: PropType.array.isRequired,
  overlap: PropType.number.isRequired,
};

HandDisplay.defaultProps = {
  cardHeight: 77,
  maxCardsPerLine: 7,
  overlap: 15,
};

export default HandDisplay;