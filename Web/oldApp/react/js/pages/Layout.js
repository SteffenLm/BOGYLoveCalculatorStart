import React from "react"
import { HashRouter, Route } from 'react-router-dom';
import { observer } from "mobx-react";

import NavigationBar from "../components/NavigationBar"

import UserList from "./UserList"
import Article from "./Article"
import Order from "./Order";
import Login from "./Login";
import MyOrder from "./MyOrder";

require('../../stylesheets/_all.scss');

@observer
export default class Layout extends React.Component {
    render() {
        const containerStyle = { 
            marginTop: "5px"
        };

        return (
            <HashRouter>
                <div>
                     {/*<Segment><h1>Die interaktive Hasen-App mit MobX.</h1></Segment> */}
                    <NavigationBar location={location}/>
                    <div class="container" style={containerStyle}>
                        <div class="row">
                            <div class="col-xs-12">
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/article" component={Article}/>
                                <Route exact path="/user" component={UserList}/>
                                <Route exact path="/order" component={Order}/>
                                <Route exact path="/myorder" component={MyOrder}/>
                            </div>
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }
}