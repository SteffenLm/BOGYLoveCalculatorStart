import React from "react";
import {Segment, Form, Button, Message} from 'semantic-ui-react'

import { observer } from "mobx-react"
import { observable } from 'mobx'
import userStore from "../stores/userStore"

@observer
export default class Login extends React.Component {
    @observable user = {
        username: '',
        password: ''
    };

    @observable loginError = {
        username: false,
        password: false,
        logIn: false
    };

   constructor() {
        super();
        this.user = {
            username: '',
            password: ''
        };
        this.login = this.login.bind(this);
    }

    login() {
        this.loading = true;
        this.loginError.logIn = false;

        if (this.user.username === "") {
            this.loading = false;
            this.loginError.username = true;
        } else if (this.user.password === "") {
            this.loading = false;
            this.loginError.password = true;
        } else {
            userStore.authenticateUser(this.user.username, this.user.password);
            this.loading = false;
        }
    }

    handleChange(prop, e) {
        this.loginError.username = false;
        this.loginError.password = false;
        this.user[prop] = e.target.value;
    }


    render() {

      return (
          <div>
              <Segment style={{display: "table", margin: "0 auto"}} compact loading={this.loading}>
                  <Form size="large" error={this.loginError.logIn}>
                      <Form.Field>
                          <Form.Input value={this.user.username}
                                      error={this.loginError.username}
                                      onChange={this.handleChange.bind(this, "username")}
                                      label='Username' type='Username'/>
                      </Form.Field>
                      <Form.Field>
                          <Form.Input value={this.user.password}
                                      error={this.loginError.password}
                                      onChange={this.handleChange.bind(this, "password")}
                                      label='Passwort' type='Password'/>
                      </Form.Field>

                      <Message
                          error
                          header='Login fehlgeschlagen'
                          content='Eingabe überprüfen und erneut versuchen.'
                      />
                      <Button onClick={this.login.bind(this)} type='submit'>Log in</Button>
                  </Form>
              </Segment>
          </div>
    );
  }
}