import React from "react";
import "./styles/App.css";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import Lexis from "./Containers/Lexis/Lexis";
import Overview from "./Containers/Overview/Overview";
import PrimaryReadings from "./Containers/PrimaryReadings/PrimaryReadings";
import logo from "./image/idealNameSvg.svg";
import icon from "./image/idealIconSvg.svg";
// import ScrollArea from "react-scrollbar";
import avatar from "./image/mark.png";
import TitleBar from "./Containers/Layout/TitleBar";
import Logo from "./Containers/Layout/Logo";
import SideMenu from "./Containers/Layout/SideMenu";
import EnglishMenu from "./Content/englishMenu.json";
import Annotation from './Containers/Annotation/Annotation';
import FurtherReadings from './Containers/FurtherReadings/FurtherReadings';
import KeyQuestions from './Containers/KeyQuestions/KeyQuestions';
import Performances from './Containers/Performances/Performances';
import Extensions from './Containers/Extensions/Extensions';
import ContinualGoals from './Containers/ContinualGoals/ContinualGoals';
import WeeklyOutline from './Containers/WeeklyOutline/WeeklyOutline';
import Results from './Containers/Results/Results';
import Scrollbar from 'react-smooth-scrollbar';



const { Header, Sider, Content, Footer } = Layout;

class Dashboard extends React.Component {
  state = {
    collapsed: null,
    minimized: null
  };

  componentDidMount() {

   
    let md = 768;
    let width = window.innerWidth;


    
    if (width <= md) {
      this.setState({
        collapsed: true,
        minimized: true
      });
    }
    else {
      this.setState({
        collapsed: false,
        minimized: false
      });
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      minimized: !this.state.minimized
    });
  };

  checkWidth = () => {


    if (!this.state.minimized) {
      this.setState({
        collapsed: false,
        minimized: false
      });
    } else {
      this.setState({
        collapsed: true,
        minimized: true
      });
    }
  };

  mouseOver = () => {
    if (this.state.collapsed) {
      this.setState({
        collapsed: false
      });
    }
  };

  mouseOut = () => {
    if (this.state.minimized) {
      this.setState({
        collapsed: true
      });
    }
  };

  render() {
    return (
      <Layout className="main-container">
    


 <Logo logo={logo} icon={icon} collapsed={this.state.collapsed} />
        <Scrollbar
                className="side-bar-bg"
                damping={0.1}
                thumbMinSize={20}
                syncCallbacks={false}
                renderByPixels={true}
                alwaysShowTracks={false}
                continuousScrolling={true}
                // wheelEventTarget={null}
                // plugins={object}
                // onScroll={func}
            >
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            breakpoint="md"
            collapsedWidth="80"
            onBreakpoint={this.toggle}
            onCollapse={this.checkWidth}
            onMouseOver={this.mouseOver}
            onMouseOut={this.mouseOut}
          >
           

            <SideMenu data={EnglishMenu} />
          </Sider>
        </Scrollbar>

        <Layout className="right">
          <Header style={{ background: "#fff", padding: 0 }}>
            <TitleBar
              avatar={avatar}
              toggle={this.toggle}
              collapsed={this.state.collapsed}
              title={"Survey of Western Literature I"}
            />
          </Header>

          <Scrollbar
                damping={0.1}
                thumbMinSize={20}
                syncCallbacks={false}
                renderByPixels={true}
                alwaysShowTracks={false}
                continuousScrolling={true}
                // wheelEventTarget={null}
                // plugins={object}
                // onScroll={func}
            >
            <Content
              className="content-container scrollable"
             
            >
              <div>
                <Switch>
                  <Route exact path="/" component={Overview} />
                  <Route path="/primary-readings" component={PrimaryReadings} />
                  <Route path="/lexis" component={Lexis} />
                  <Route path="/further-readings" component={FurtherReadings} />
                  <Route path="/key-questions" component={KeyQuestions} />
                  <Route path="/performances" component={Performances} />
                  <Route path="/extensions" component={Extensions} />
                  <Route path="/continual-goals" component={ContinualGoals} />
                  <Route path="/annotation" component={Annotation} />
                  <Route path="/weekly-outline" component={WeeklyOutline} />
                  <Route path="/results" component={Results} />

                </Switch>
              </div>
            </Content>
          </Scrollbar>

          <Footer style={{ textAlign: "center" }}>
            IDEAL Education ©2018 | All Rights Reserved
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
