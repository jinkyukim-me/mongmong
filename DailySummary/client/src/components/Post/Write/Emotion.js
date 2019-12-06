import React, { Component } from 'react'
import { Button, Icon } from 'antd'

class Emotion extends Component {
  render() {
    return(
      <div className="one-contents-emotion">
        <p className="emotion-describe">오늘 기분은??</p>
        <div className='iconList'>
          <Button value="4" onClick={this.props.clickHandler}>
            <Icon type="like" />
          </Button>
          <Button value="3" onClick={this.props.clickHandler}>
            <Icon type="smile" />
          </Button>         
          <Button value="2" onClick={this.props.clickHandler}>
           <Icon type="meh" />
          </Button>
          <Button value="1" onClick={this.props.clickHandler}>
            <Icon type="frown" />
          </Button>         
          <Button value="0" onClick={this.props.clickHandler}>
            <Icon type="dislike" />
          </Button>        
        </div>
      </div>
    )
  }
}

export default Emotion

// import React, { Component } from 'react'
// import { Button, Icon } from 'antd'
// import axios from 'axios';

// class Emotion extends Component {
  

//   render() {
//     return(
//       <div className="App-Content-Emotion">
//         <p>오늘 기분은??</p>
//         <div className='iconList' style={{ padding: 5, background: '#fff', minHeight: 20}}>
//           <Button >
//             <Icon type="like" />
//           </Button>
//           <Button >
//             <Icon type="smile" />
//           </Button>         
//           <Button >
//            <Icon type="meh" />
//           </Button>
//           <Button >
//             <Icon type="frown" />
//           </Button>         
//           <Button >
//             <Icon type="dislike" />
//           </Button>        
//         </div>
//       </div>
//     )
//   }
// }

// export default Emotion