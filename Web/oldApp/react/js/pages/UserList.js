import React from "react";
import {Icon, Grid, Input, Table, Segment} from 'semantic-ui-react'

import { observer } from "mobx-react"
import { Button } from 'semantic-ui-react'
import userStore from "../stores/userStore"
import NewUserModal from "../components/NewUserModal";


@observer
export default class UserList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		userStore.fetchUser();
	}

	userClicked(user) {
	}

	deleteUserClicked(user) {
		userStore.deleteUser(user.id);
	}

    render() {
		const user = userStore.user;
		console.log("user");
		console.log(user);

		const TableRowUsers = user.map((user,i) =>
			<Table.Row key={user.id} onClick={this.userClicked.bind(this,user)} >
				<Table.Cell> { user.username } </Table.Cell>
				<Table.Cell> { user.firstname } </Table.Cell>
				<Table.Cell> { user.lastname } </Table.Cell>
				<Table.Cell> { user.roleAdmin ? <Icon name={"check"} color={"green"}/> : <Icon name={"delete"} color={"red"}/> } </Table.Cell>
				<Table.Cell> { user.roleCustomer ? <Icon name={"check"} color={"green"}/> : <Icon name={"delete"} color={"red"}/>} </Table.Cell>
				<Table.Cell> <Button basic compact icon={"delete"} color={"red"} onClick={this.deleteUserClicked.bind(this, user)}/></Table.Cell>
			</Table.Row>);
   	    return (
	      <div>
			  <Grid celled>
				<Grid.Row>
					<Grid.Column>
						<NewUserModal />
					</Grid.Column>
				</Grid.Row>
			  	<Grid.Row>
					<Grid.Column computer={6} mobile={16} tablet={10}>
						<Table celled selectable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Username</Table.HeaderCell>
									<Table.HeaderCell>Vorname</Table.HeaderCell>
									<Table.HeaderCell>Nachname</Table.HeaderCell>
									<Table.HeaderCell>Admin</Table.HeaderCell>
									<Table.HeaderCell>Customer</Table.HeaderCell>
									<Table.HeaderCell>Löschen</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{ TableRowUsers }
							</Table.Body>
						</Table>
					</Grid.Column>
			  	</Grid.Row>
			  </Grid>
	      </div>
        );
    }
}