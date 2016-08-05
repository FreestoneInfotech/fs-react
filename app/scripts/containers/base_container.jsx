import React, {Component} from 'react';
import Header from '../components/header';
import AppNavBar from '../components/app_nav_bar';
import Breadcrumbs from 'react-breadcrumbs';
export default class BaseContainer extends Component {

  constructor(props) {
      super(props);
      // Operations usually carried out in componentWillMount go here
      this.state = {
      }
  }
  render() {
      const routes = this.props.routes || [{path: "/", name: 'Home'}]
      return (
        <div>
            <Header> </Header>
            <AppNavBar></AppNavBar>
            <section id="main-content">
                <div className="wrapper">
                    <Breadcrumbs
                      routes={routes}
                      params={this.props.params}
                      wrapperClass="breadcrumb"
                      separator=""
                      wrapperElement="ol"
                      itemElement="li"
                      //excludes={["Home"]}
                    />
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            </section>
        </div>
    )
  }
}
