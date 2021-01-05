import React from "react";
import orderStore from "../stores/orderStore"
import articleStore from "../stores/articleStore"

// Cards und Images und Icons importieren
import {Button, Grid, Icon, Table} from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";
import NewUserModal from "../components/NewUserModal";
import moment from 'moment';

@observer
export default class MyOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        orderStore.fetchOrderOfUser()
        articleStore.fetchArticle();
    }

    render() {
        let { orderByUser } = orderStore;
        let { article } = articleStore;
        console.log("article");
        console.log(article);
        console.log("orderByUser");
        console.log(orderByUser);
        let TableRowOrders = null;
        if (article.length > 0) {
            TableRowOrders = orderByUser.map((order, i) =>
                <Table.Row key={order.id}>
                    <Table.Cell> { article.find(art => art.id === order.articleId).name  } </Table.Cell>
                    <Table.Cell> { moment(order.startDate).format("DD.MM.YYYY")} </Table.Cell>
                    <Table.Cell> { moment(order.endDate).format("DD.MM.YYYY")} </Table.Cell>
                </Table.Row>);
        }

        return (
            <div>
                <h1>Meine Bestellungen</h1>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column computer={6} mobile={16} tablet={10}>
                            <Table celled selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Artikel</Table.HeaderCell>
                                        <Table.HeaderCell>Start</Table.HeaderCell>
                                        <Table.HeaderCell>Ende</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    { TableRowOrders }
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}