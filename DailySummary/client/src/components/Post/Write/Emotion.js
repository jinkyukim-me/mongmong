import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { faTired, faFrownOpen, faMeh, faSmile, faLaughBeam } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Emotion extends Component {
  render() {
    return(
      <div className="one-contents-emotion">
        <p className="emotion-describe">오늘 기분은??</p>
        <div className='iconList'>
          <Button key="emo4" value="4" onClick={this.props.clickHandler}>
            <span className="four"><FontAwesomeIcon icon={faLaughBeam} className="icon" /></span>
            {/* <Icon type="right" /> */}
          </Button>
          <Button key="emo3" value="3" onClick={this.props.clickHandler}>
            <span className="three"><FontAwesomeIcon icon={faSmile} className="icon" /></span>
            {/* <Icon type="right" /> */}
          </Button>         
          <Button key="emo2" value="2" onClick={this.props.clickHandler}>
           <span className="two"><FontAwesomeIcon icon={faMeh} className="icon" /></span>
           {/* <Icon type="right" /> */}
          </Button>
          <Button key="emo1" value="1" onClick={this.props.clickHandler}>
            <span className="one"><FontAwesomeIcon icon={faFrownOpen} className="icon" /></span>
            {/* <Icon type="right" /> */}
          </Button>         
          <Button key="emo0" value="0" onClick={this.props.clickHandler}>
            <span className="zero"><FontAwesomeIcon icon={faTired} className="icon" /></span>
            {/* <Icon type="right" /> */}
          </Button>        
        </div>
      </div>
    )
  }
}

export default Emotion
