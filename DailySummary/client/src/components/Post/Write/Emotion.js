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
          <Button value="4" onClick={this.props.clickHandler}>
            <FontAwesomeIcon icon={faLaughBeam} className="icon" />
          </Button>
          <Button value="3" onClick={this.props.clickHandler}>
            <FontAwesomeIcon icon={faSmile} className="icon" />
          </Button>         
          <Button value="2" onClick={this.props.clickHandler}>
           <FontAwesomeIcon icon={faMeh} className="icon" />
          </Button>
          <Button value="1" onClick={this.props.clickHandler}>
            <FontAwesomeIcon icon={faFrownOpen} className="icon" />
          </Button>         
          <Button value="0" onClick={this.props.clickHandler}>
            <FontAwesomeIcon icon={faTired} className="icon" />
          </Button>        
        </div>
      </div>
    )
  }
}

export default Emotion
