import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import userStore from '../stores/userStore'
import {observer} from "mobx-react";

@observer
export default class NavigationBar extends Component {

  constructor() {
    super();
      this.STORAGE_KEY = "bbbd737698w";
      this.USER_STORAGE_KEY = "abdh37383912jdjd";
      this.state = { activeItem : "login"};
  }

  removeTokenFromStorage() {
        if(typeof window !== "undefined") {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem(this.USER_STORAGE_KEY);
        }
    }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logoutUser() {
      this.removeTokenFromStorage();
      this.state = { activeItem : "login" }
      userStore.userLoggedIn = null;
      this.setState({});
  }


  render() {
    const { activeItem } = this.state
    let isUserAdmin = false;
    let isUserCustomer = false;
    let { userLoggedIn } =  userStore;
    console.log("render navbar")

    if (userLoggedIn !== null) {
        console.log(userLoggedIn.userInToken);
        let userInToken = userLoggedIn.userInToken;
        if (userInToken !== undefined) {
            isUserAdmin = userInToken.roleAdmin === 1;
            isUserCustomer = userInToken.roleCustomer === 1;
        }
    }

    return (
      <Menu pointing secondary className={"myNavBar"}>
          {
              isUserAdmin === true ?
                  <Menu.Item
                      as={Link} to='/article'
                      name='article'
                      active={activeItem === 'article'}
                      onClick={this.handleItemClick}>
                      Article
                  </Menu.Item>: null
          }
          {
              isUserAdmin === true ?
                  <Menu.Item
                      as={Link} to='/user'
                      name='user'
                      active={activeItem === 'user'}
                      onClick={this.handleItemClick}>
                      Kunden
                  </Menu.Item> : null
          }
          {
              isUserAdmin === true ?
                  <Menu.Item
                      as={Link} to='/order'
                      name='order'
                      active={activeItem === 'order'}
                      onClick={this.handleItemClick}>
                      Bestellungen
                  </Menu.Item> : null
          }
          {
              isUserCustomer === true ?
                  <Menu.Item
                      as={Link} to='/myorder'
                      name='myorder'
                      active={activeItem === 'myorder'}
                      onClick={this.handleItemClick}>
                      Meine Bestellungen
                  </Menu.Item> : null
          }
          {
              isUserCustomer || isUserAdmin === true ?
                  <Menu.Item
                      as={Link} to='/logout'
                      name='logout'
                      active={activeItem === 'logout'}
                      onClick={this.logoutUser.bind(this)}>
                      Logout
                  </Menu.Item>
                  :
                  <Menu.Item
                      as={Link} to='/login'
                      name='login'
                      active={activeItem === 'login'}
                      onClick={this.handleItemClick}>
                      Login
                  </Menu.Item>
          }
      </Menu>
    )
  }
}


