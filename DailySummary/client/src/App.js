import React, { Component, Fragment } from 'react'
import './App.scss'
import Home from './components/Home/Home'
import HeaderLayout from './components/HeaderLayout'
import Write from './components/Post/Write/Write'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import NormalLoginForm from './components/Login/Login'
import { Modal, Layout, Menu, Icon, DatePicker } from 'antd'
import PostList from './components/Post/PostList/PostList'
import NotFound from './components/NotFound'
import Settings from './components/Settings'
import SignUp from './components/Login/SignUp'
import Unsubscribe from './components/Login/Unsubscribe'
import Review from './components/Post/Write/Review'
import Summary from './components/Post/Summary/Summary'
import { LoginContext } from './contexts/login'

const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu
const { MonthPicker } = DatePicker;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      visible: false,
      isLogined: localStorage.getItem('token') ? true : false,
    }
    // this.onChange = this.onChange.bind(this)
    //this.showModal = this.showModal.bind(this)
    //this.handleOk = this.handleOk.bind(this)
    //this.handleCancel = this.handleCancel.bind(this)
  }

  setIsLogined = (isLogined) => {
    this.setState({ isLogined })
  }

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  pickedMonth = (date, dateString) => {
    const dateStr = dateString.replace(/-/g, '');
    const url = '/posts/' + dateStr.substring( 0, 4 ) + 
                '/' + dateStr.substring( 4, 6 );
    console.log(url);
    this.props.history.push(url);
  }

  pickedDate = (date, dateString) => {
    const dateStr = dateString.replace(/-/g, '');
    const url = '/summary/' + dateStr.substring( 0, 4 ) + 
                '/' + dateStr.substring( 4, 6 ) + 
                '/' + dateStr.substring( 6, 8 );
    console.log(url);
    this.props.history.push(url);
  }

  showModal = () => {
    console.log("showModal");
    this.setState({
      visible: true,
    });     
  };

  handleLogout = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    localStorage.removeItem("token")
    this.setState({
      visible: false,
      isLogined: false,
    });
    this.props.history.push('/')
  };
  
  handleCancel = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('cancel clicked');
    console.log(this.state);
    this.setState({
      visible: false,
    });
  };

  // writeBtnClicked = e => {
  //   console.log(e)
  //   if(this.state.isLogined) {
  //     this.props.history.push('/post/write')
  //   } else {
  //     this.props.history.push('/login')
  //   }
  // }

  render () {
    return (
      <LoginContext.Provider value={{
        setIsLogined: this.setIsLogined,
      }}>
        <Fragment>
        {/* Sider, Header, Footer는 모든 화면에 보여진다.  */}
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                
              }}
              onCollapse={(collapsed, type) => {
                
              }}
              className="one-sidebar"
            >
            <div className="one-menu-logo flex flex-center"  >
              <Link to="/">
                <span>몽 글</span>
              </Link>
            </div>
              <Menu theme="light" mode="inline" className="one-nav">
                <Menu.Item key="1" className="menuWrite"  onClick={this.writeBtnClicked}>
                  <Link to='/post/write'> 
                    <Icon type="form" />
                    <span className="nav-text">글쓰기</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="Sub1"
                  title={
                    <span>
                      <Icon type="read" />
                      <span>본문</span>
                    </span>
                  }
                >
                  <Menu.Item key="2">
                      <MonthPicker
                        onChange={this.pickedMonth}
                        placeholder="Select month" />
                  <span className="nav-text"></span>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="Sub2"
                  title={
                    <span>
                      <Icon type="edit" />
                      <span>요약</span>
                    </span>
                  }
                >
                  <Menu.Item key="3">
                      <DatePicker
                        onChange={this.pickedDate}
                      />
                  <span className="nav-text"></span>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="4">
                  <Link to="/setting">
                    <Icon type="setting" />
                    <span className="nav-text">설정</span>
                  </Link>
                </Menu.Item>
                {
                  this.state.isLogined ? ( 
                <Menu.Item key="5"
                  className="one-logout"
                  onClick={this.showModal}
                  >
                    <Icon type="logout" />
                    <span className="nav-text">
                      로그아웃
                    </span>
                    <Modal
                      title="Basic Modal"
                      visible={this.state.visible}
                      onOk={this.handleLogout}
                      onCancel={this.handleCancel}
                    >
                      로그아웃 하시겠습니까?
                    </Modal>   {/* 로그아웃 클릭시 로그인 버튼으로 전환 및 연동 부분 추가 */}
                </Menu.Item>
                  ) : (
                    <Menu.Item key="5"
                    className="one-login"
                    >
                  <Link to="/login">
                    <Icon type="login" />
                    <span className="nav-text">로그인</span>
                  </Link>
                  </Menu.Item>
                    )
                }
              </Menu>
            </Sider>
            <Layout className="one-main">
              <HeaderLayout />
              <Content className="Content-section-layout one-content">
                {
                  this.state.isLogined ? ( 
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/posts/:year/:month/:day" component={PostList} />
                      <Route path="/posts/:year/:month" component={PostList} />
                      <Route path="/posts/:year" component={PostList} />
                      <Route path="/posts" component={PostList} />
                      <Route path="/post/write" component={Write} />
                      <Route path="/post/:view" component={Review} />
                      <Route path="/summary/:year/:month/:day" component={Summary} />
                      <Route path="/summary" component={Summary} />
                      <Route path="/setting" component={Settings} />
                      <Route path="/signup" component={SignUp} /> */}
                      <Route path="/login" component={NormalLoginForm} />
                      <Route path="/unsubscribe" component={Unsubscribe} />
                      <Route component={NotFound} />
                    </Switch>
                   ) : (
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/posts/:year/:month/:day" component={NormalLoginForm} />
                      <Route path="/posts/:year/:month" component={NormalLoginForm} />
                      <Route path="/posts/:year" component={NormalLoginForm} />
                      <Route path="/posts" component={NormalLoginForm} />
                      <Route path="/post/write" component={NormalLoginForm} />
                      <Route path="/post/:view" component={NormalLoginForm} />
                      <Route path="/summary/:year/:month/:day" component={NormalLoginForm} />
                      <Route path="/summary" component={NormalLoginForm} />
                      <Route path="/setting" component={NormalLoginForm} />
                      <Route path="/signup" component={SignUp} />
                      <Route path="/login" component={NormalLoginForm} />
                      <Route path="/unsubscribe" component={NormalLoginForm} />
                      <Route component={NotFound} />
                    </Switch>
                   )
                }
              </Content>
              <Footer style={{ textAlign: 'center' }}>ㅁㅗㅇㄱㅡㄹ ©2019 Created by 한:글</Footer>
            </Layout>
          </Layout>
        </Fragment>
      </LoginContext.Provider>
    )          
  };
};
export default withRouter(App);


//로그인, 로그아웃 등 기능하는 버젼/ 사이드바 메뉴 수정 전 임시 주석처리
// import React, { Component, Fragment } from 'react'
// import './App.scss'
// import Home from './components/Home/Home'
// import HeaderLayout from './components/HeaderLayout'
// import Write from './components/Post/Write/Write'
// import { Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'
// import NormalLoginForm from './components/Login/Login'
// import { Modal, Layout, Menu, Icon, DatePicker } from 'antd'
// import PostList from './components/Post/PostList/PostList'
// import NotFound from './components/NotFound'
// import Settings from './components/Settings'
// import SignUp from './components/Login/SignUp'
// import Unsubscribe from './components/Login/Unsubscribe'
// import Review from './components/Post/Write/Review'
// import Summary from './components/Post/Summary/Summary'
// import axios from 'axios'
// import { LoginContext } from './contexts/login'

// const { Sider, Content, Footer } = Layout
// const { SubMenu } = Menu
// const { MonthPicker } = DatePicker;

// const config = require('./config');

// class App extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       collapsed: false,
//       visible: false,
//       isLogined: localStorage.getItem('token') ? true : false,
//     }
//     // this.onChange = this.onChange.bind(this)
//     //this.showModal = this.showModal.bind(this)
//     //this.handleOk = this.handleOk.bind(this)
//     //this.handleCancel = this.handleCancel.bind(this)
//   }

//   setIsLogined = (isLogined) => {
//     this.setState({ isLogined })
//   }

//   onCollapse = (collapsed) => {
//     console.log(collapsed)
//     this.setState({ collapsed })
//   }

//   pickedMonth = (date, dateString) => {
//     const dateStr = dateString.replace(/-/g, '');
//     const url = '/posts/' + dateStr.substring( 0, 4 ) + 
//                 '/' + dateStr.substring( 4, 6 );
//     console.log(url);
//     this.props.history.push(url);
//   }

//   pickedDate = (date, dateString) => {
//     const dateStr = dateString.replace(/-/g, '');
//     const url = '/summary/' + dateStr.substring( 0, 4 ) + 
//                 '/' + dateStr.substring( 4, 6 ) + 
//                 '/' + dateStr.substring( 6, 8 );
//     console.log(url);
//     this.props.history.push(url);
//   }

//   showModal = () => {
//     console.log("showModal");
//     this.setState({
//       visible: true,
//     });     
//   };

//   handleOk = e => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log(e);
//     localStorage.removeItem("token")
//     this.setState({
//       visible: false,
//       isLogined: false,
//     });
//     this.props.history.push('/')
//   };
  
//   handleCancel = e => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('cancel clicked');
//     console.log(this.state);
//     this.setState({
//       visible: false,
//     });
//   };

//   render () {
//     return (
//       <LoginContext.Provider value={{
//         setIsLogined: this.setIsLogined,
//       }}>
//         <Fragment>
//         {/* Sider, Header, Footer는 모든 화면에 보여진다.  */}
//           <Layout>
//             <Sider
//               breakpoint="lg"
//               collapsedWidth="0"
//               onBreakpoint={broken => {
//                 console.log(broken)
//               }}
//               onCollapse={(collapsed, type) => {
//                 console.log(collapsed, type)
//               }}
//               className="one-sidebar"
//             >
//             <div className="one-menu-logo flex flex-center"  >
//               <Link to="/">
//                 <span>몽 글</span>
//               </Link>
//             </div>
//               <Menu theme="light" mode="inline" className="one-nav">
//                 <Menu.Item key="1">
//                   <Link to="/post/write">
//                     <Icon type="form" />
//                     <span className="nav-text">글쓰기</span>
//                   </Link>
//                 </Menu.Item>
//                 <SubMenu
//                   key="Sub1"
//                   title={
//                     <span>
//                       <Icon type="read" />
//                       <span>본문</span>
//                     </span>
//                   }
//                 >
//                   <Menu.Item key="2">
//                       <MonthPicker
//                         onChange={this.pickedMonth}
//                         placeholder="Select month" />
//                   <span className="nav-text"></span>
//                   </Menu.Item>
//                 </SubMenu>
//                 <SubMenu
//                   key="Sub2"
//                   title={
//                     <span>
//                       <Icon type="edit" />
//                       <span>요약</span>
//                     </span>
//                   }
//                 >
//                   <Menu.Item key="3">
//                       <DatePicker
//                         onChange={this.pickedDate}
//                       />
//                   <span className="nav-text"></span>
//                   </Menu.Item>
//                 </SubMenu>
//                 <Menu.Item key="4">
//                   <Link to="/setting">
//                     <Icon type="setting" />
//                     <span className="nav-text">설정</span>
//                   </Link>
//                 </Menu.Item>
//                 <Menu.Item key="5"
//                   className="one-logout"
//                   onClick={this.showModal}
//                   >
//                     <Icon type="logout" />
//                     <span className="nav-text">
//                       로그아웃
//                     </span>
//                     <Modal
//                       title="Basic Modal"
//                       visible={this.state.visible}
//                       onOk={this.handleOk}
//                       onCancel={this.handleCancel}
//                     >
//                       로그아웃 하시겠습니까?
//                     </Modal>   {/* 로그아웃 클릭시 로그인 버튼으로 전환 및 연동 부분 추가 */}
//                 </Menu.Item>
//               </Menu>
//             </Sider>
//             <Layout className="one-main">
//               <HeaderLayout />
//               <Content className="Content-section-layout one-content">
//                 {/* {
//                   this.state.isLogined ? (  */}
//                     <Switch>
//                       <Route exact path="/" component={Home} />
//                       <Route path="/posts/:year/:month/:day" component={PostList} />
//                       <Route path="/posts/:year/:month" component={PostList} />
//                       <Route path="/posts/:year" component={PostList} />
//                       <Route path="/posts" component={PostList} />
//                       <Route path="/post/write" component={Write} />
//                       <Route path="/post/:view" component={Review} />
//                       <Route path="/summary/:year/:month/:day" component={Summary} />
//                       <Route path="/summary" component={Summary} />
//                       <Route path="/setting" component={Settings} />
//                       <Route path="/signup" component={SignUp} />
//                       <Route path="/login" component={NormalLoginForm} />
//                       <Route path="/unsubscribe" component={Unsubscribe} />
//                       <Route component={NotFound} />
//                     </Switch>
//                   {/* // ) : (
//                   //   <NormalLoginForm />
//                   // )
//                 } */}
//               </Content>
//               <Footer style={{ textAlign: 'center' }}>ㅁㅗㅇㄱㅡㄹ ©2019 Created by 한:글</Footer>
//             </Layout>
//           </Layout>
//         </Fragment>
//       </LoginContext.Provider>
//     )          
//   };
// };
// export default withRouter(App);