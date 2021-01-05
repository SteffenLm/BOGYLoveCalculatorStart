import React from "react";
import {Icon, Grid, Image, Table} from 'semantic-ui-react'



export default class Cars extends React.Component {

    constructor(props) {
        super(props);
        this.userArray = [{id: 0, prename: "Hans", surname: "Meier", city: "Ravensburg"},
                      {id: 1, prename: "Rita", surname: "Müller", city: "Weingarten"}];
    }

    tableRowClicked(user) {
        console.log(user);

    }

  render() {
      console.log(this.userArray);
      const TableRowUsers = this.userArray.map((user,i) =>
          <Table.Row key={user.id}  onClick={this.tableRowClicked.bind(this,user)}>
              <Table.Cell> { user.prename }</Table.Cell>
              <Table.Cell> { user.surname }</Table.Cell>
              <Table.Cell> { user.city } </Table.Cell>
          </Table.Row>);

      return (
      <div>
        <Grid celled>
        <Grid.Row>
      		<Grid.Column width={6}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Vorname</Table.HeaderCell>
                            <Table.HeaderCell>Nachname</Table.HeaderCell>
                            <Table.HeaderCell>Stadt</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {  TableRowUsers  }
                    </Table.Body>
                </Table>
      		</Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}