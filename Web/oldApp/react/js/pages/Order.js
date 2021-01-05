import React from "react";
import {Icon, Grid, Button, Table} from 'semantic-ui-react'

import { observer } from "mobx-react"
import orderStore from "../stores/orderStore"
import articleStore from "../stores/articleStore"
import userStore from "../stores/userStore"
import moment from "moment"
import NewOrderModal from "../components/NewOrderModal";

@observer
export default class Order extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        orderStore.fetchOrder();
        userStore.fetchUser();
        articleStore.fetchArticle();
    }

    tableRowClicked(user) {
        console.log(user);

    }

    deleteOrder(order) {
        orderStore.deleteOrder(order.id);
    }


  render() {
      const order = orderStore.order;
      const user = userStore.user;
      const article = articleStore.article;

      let TableRowOrders = '';
      if (user.length > 0 && article.length > 0 && order.length > 0) {
           TableRowOrders = order.map((ord, i) =>
              <Table.Row key={ord.id} onClick={this.tableRowClicked.bind(this, ord)}>
                  <Table.Cell> { user.find(u => u.id === ord.userId).firstname + " " +  user.find(u => u.id === ord.userId).lastname }</Table.Cell>
                  <Table.Cell> { article.find(a => a.id === ord.articleId).name + " | " + article.find(a => a.id === ord.articleId).category} </Table.Cell>
                  <Table.Cell> { moment(ord.startDate).format("DD.MM.YYYY")}</Table.Cell>
                  <Table.Cell> { moment(ord.endDate).format("DD.MM.YYYY")} </Table.Cell>
                  <Table.Cell> { (moment(ord.endDate).diff(moment(ord.startDate), 'days') + 1) * article.find(a => a.id === ord.articleId).pricePerDay + " €" } </Table.Cell>
                  <Table.Cell> <Button basic color={"red"} icon={"delete"} onClick={this.deleteOrder.bind(this,ord)}/></Table.Cell>
              </Table.Row>);
      }

      return (
      <div>
        <Grid celled>
        <Grid.Row>
            <Grid.Column width={6}>
                <NewOrderModal />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
      		<Grid.Column width={6}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Kunde</Table.HeaderCell>
                            <Table.HeaderCell>Artikel</Table.HeaderCell>
                            <Table.HeaderCell>Start</Table.HeaderCell>
                            <Table.HeaderCell>Ende</Table.HeaderCell>
                            <Table.HeaderCell>Preis</Table.HeaderCell>
                            <Table.HeaderCell>Löschen</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {  TableRowOrders  }
                    </Table.Body>
                </Table>
      		</Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}