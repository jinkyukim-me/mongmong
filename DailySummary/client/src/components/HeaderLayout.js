import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import { Link } from 'react-router-dom'
const { Header } = Layout;
class HeaderLayout extends Component {
  state = {    
    isLogined: localStorage.getItem('token') ? true : false,
  }
  render() {
    return (
      <>
        <Header className="one-header" style={{ background: '#fff', padding: 0 }} >
          {this.state.isLogined ? ( 
            <div className="one-logo flex flex-center" >         
            <Link to="/post/write">
            <span>몽&nbsp;&nbsp;글</span>
            </Link>
            </div>  
          ):(
            <div className="one-logo flex flex-center" > 
            <Link to="/">
              <span>몽&nbsp;&nbsp;글</span>
            </Link>
            </div>
          )}
        </Header>
      </>
    );
  }
}
export default HeaderLayout;