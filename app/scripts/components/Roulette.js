import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import '../../stylesheets/Roulette.scss';


class Roulette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinAngleStart: 0,
      startAngle: Math.random() * 360,
      spinTime: 0,
      arc: Math.PI / (props.options.length / 2),
      spinTimeExtra: 3000,
    };
    this.spinTimer = null;
    this.handleOnClick = this.handleOnClick.bind(this);
    this.spin = this.spin.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    baseSize: PropTypes.number,
    spinAngleStart: PropTypes.number,
    spinTimeTotal: PropTypes.number,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    options:  ['Win 1', 'Lose 2', 'Win 2', 'Push', 'Lose 1'],
    // options:  ['Win 1', 'Lose 2', 'Win 2', 'Push', 'Lose 1', 'Win 1', 'Lose 2', 'Win 2', 'Push', 'Lose 1', 'Win 1', 'Lose 2', 'Win 2', 'Push', 'Lose 1'],
    baseSize: 150,
    spinAngleStart: Math.random() * 360,
    spinTimeTotal: Math.random() * 1000,
  };

  componentDidMount() {
    this.drawRouletteWheel();
  }

  resetState() {
    console.log("hi")
  }

  byte2Hex(n) {
    const nybHexString = '0123456789ABCDEF';
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

  RGB2Color(r,g,b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 128;
    const frequency = Math.PI*2/maxitem;

    const red   = Math.sin(frequency*item+2+phase) * width + center;
    const green = Math.sin(frequency*item+0+phase) * width + center;
    const blue  = Math.sin(frequency*item+4+phase) * width + center;

    return this.RGB2Color(red,green,blue);
  }

  drawRouletteWheel() {
    const { options, baseSize } = this.props;
    let { startAngle, arc } = this.state;

    // const spinTimeout = null;
    // const spinTime = 0;
    // const spinTimeTotal = 0;

    let ctx;

    console.log("Spin Time", this.state.spinTime, this.state.spinTimeTotal);

    const canvas = this.refs.canvas;
    if (canvas.getContext) {
      const outsideRadius = baseSize - 25;
      const textRadius = baseSize - 45;
      const insideRadius = baseSize - 55;

      ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,600,600);

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      ctx.font = '14px Helvetica, Arial';

      for(let i = 0; i < options.length; i++) {
        const angle = startAngle + i * arc;

        ctx.fillStyle = this.getColor(i, options.length);

        ctx.beginPath();
        ctx.arc(baseSize, baseSize, outsideRadius, angle, angle + arc, false);
        ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.translate(baseSize + Math.cos(angle + arc / 2) * textRadius,
          baseSize + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      //Arrow
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.lineTo(baseSize + 10, baseSize - (outsideRadius + 20));
      ctx.lineTo(baseSize + 0, baseSize - (outsideRadius - 5));
      ctx.lineTo(baseSize - 10, baseSize - (outsideRadius + 20));
      ctx.fill();
      ctx.stroke();
    }
  }

  spin() {
    this.spinTimer = null;
    this.setState({ spinTime: 0, spinTimeTotal: Math.random() * 360 + 360*2}, () => this.rotate());
  }

  rotate(){
    const { spinAngleStart, spinTimeTotal } = this.props;
    // const { spinAngleStart } = this.props;
    // let spinTimeTotal = 3000 + this.state.spinTimeExtra;
    // console.log('spintime', this.state.spinTime, 'spin extra', this.state.spinTimeExtra);
    if(this.state.spinTime > this.state.spinTimeTotal ) {
      console.log("Stopping", this.state.spinTime, this.state.spinTimeTotal);
      clearTimeout(this.spinTimer);
      this.stopRotateWheel();
    } else {
      const spinAngle = spinAngleStart - this.easeOutBounce(this.state.spinTime, 0, spinAngleStart, this.state.spinTimeTotal);
      // if( this.spinTimeTotal - this.state.spinTime > 500) {
      //   const spinAngle = spinAngleStart - this.easeOut(this.state.spinTime, 0, spinAngleStart, this.state.spinTimeTotal);
      // } else {
      //   const spinAngle = spinAngleStart - this.easeOut(this.state.spinTime, 0, spinAngleStart, this.state.spinTimeTotal);
      // }
      this.setState({
        startAngle: this.state.startAngle + spinAngle * Math.PI / 180,
        spinTime: this.state.spinTime + 30,
      }, () => {
        this.drawRouletteWheel();
        clearTimeout(this.spinTimer);
        this.spinTimer = setTimeout(() => this.rotate(), 30);
      })
    }
  }

  stopRotateWheel() {
    let { startAngle, arc } = this.state;
    const { options, baseSize } = this.props;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 20px Helvetica, Arial';
    const text = options[index];
    ctx.fillText(text, baseSize - ctx.measureText(text).width / 2, baseSize + 10);
    ctx.restore();
    //this.props.onComplete(text);
  }

  easeOut(t, b, c, d) {
    const ts = (t/=d)*t;
    const tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

  easeOutQuart(t, b, c, d){
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  }

  easeOutExpo(t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  }


  easeOutElastic(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  }

  easeOutBounce(t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  }

  easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  }

  handleOnClick() {
    this.spin();
  }

  render() {
    const { baseSize } = this.props;

    return (  <div>
      <div>
      <div className="roulette">
        <div className="roulette-container">
          <canvas ref="canvas" width={baseSize * 2} height={baseSize * 2} className="roulette-canvas"></canvas>
        </div>
        <div className="roulette-container">
          <input type="button" value="spin" onClick={this.handleOnClick} className="button" id="spin" />
        </div>
      </div>
    </div></div>);
  }
}

export default Roulette;
