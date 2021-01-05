import React from "react";

import {Button, Modal, Form, Input, Dropdown, Checkbox} from 'semantic-ui-react'

import userStore from "../stores/userStore";
import orderStore from "../stores/orderStore";
import articleStore from "../stores/articleStore";

import moment from "moment"

export default class NewUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.newUserId = -1;
        this.newArticleId = -1;
        this.newStartDate = moment().format("YYYY-MM-DD");
        this.newEndDate = moment().format("YYYY-MM-DD");
        this.state = { open : false, isPwdInvalid: true };

    }

    componentDidMount() {
        orderStore.fetchOrder();
        userStore.fetchUser();
        articleStore.fetchArticle();
    }

    newEndDateChanged(a, { value }) {
        this.newEndDate = value;
    }

    newStartDateChanged(e, { value }) {
        this.newStartDate = value;
    }


    saveNewOrder() {
        // checken, ob Daten valide sind.
        const { order } = orderStore;
        const { article } = articleStore;

        let startDate = moment(this.newStartDate);
        let endDate = moment(this.newEndDate);


        // ist Artikel in Orders in dem Zeitabschnitt verliehen.
        let orderIndex = order.findIndex(ordr => {
            let startDateOfOrder = moment(ordr.startDate);
            let endDateOfOrder = moment(ordr.endDate);
            if ( (startDate.isSameOrAfter(startDateOfOrder) && startDate.isSameOrBefore(endDateOfOrder))
             ||  (endDate.isSameOrAfter(startDateOfOrder) && endDate.isSameOrBefore(endDateOfOrder))) {
                return true;
            } else {
                return false;
            }
        });

        if (orderIndex === -1) {
            let newOrder = {
                articleId: this.newArticleId,
                userId: this.newUserId,
                startDate : this.newStartDate,
                endDate : this.newEndDate
            }
            orderStore.addOrder(newOrder);
            this.setState({open : false})
        } else {
            alert("Zeitabschnitte überschneiden sich.")
        }
    }

    openModal() {
        this.setState({open : true})
    }

    closeModal() {
        this.setState({open : false})
    }

    userDropdownChanged(a, {value}) {
        this.newUserId = value;
    }

    articleDropdownChanged(a, {value}) {
        this.newArticleId = value;
    }

    render() {
        const { open } = this.state;
        const { user } = userStore;
        const { article } = articleStore;

        let userItems = null;
        let articleItems = null;
        if (user.length > 0 && article.length > 0) {
            articleItems = article.filter(a => a.isAvailable).map(art => {
                let a = {
                    key : art.id,
                    text: art.name + " | " + art.category,
                    value: art.id,
                }
                return a;
            });
           userItems = user.map(usr => {
                let u = {
                    key : usr.id,
                    text: usr.firstname + " " + usr.lastname,
                    value: usr.id,
                }
                return u;
            });
        }
        return (
            <Modal
                trigger={<Button onClick={this.openModal.bind(this)}>Neue Ausleihe anlegen</Button>}
                onClose={this.closeModal.bind(this)}
                open = { open }>
                <Modal.Header>Neue Ausleihe einfügen</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Username</label>
                                <Dropdown
                                    placeholder='Kunde auswählen'
                                    fluid
                                    selection
                                    options={userItems}
                                    onChange = {this.userDropdownChanged.bind(this)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Artikel</label>
                                <Dropdown
                                    placeholder='Article auswählen'
                                    fluid
                                    selection
                                    options={articleItems}
                                    onChange = {this.articleDropdownChanged.bind(this)}
                                />
                            </Form.Field>
                            <Form.Group>
                                <Form.Field>
                                    <label>Passwort</label>
                                    <Input type={"date"} placeholder='Startdatum' onChange={this.newStartDateChanged.bind(this)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Passwort wiederholen</label>
                                    <Input type={"date"} placeholder='Enddatum' onChange={this.newEndDateChanged.bind(this)}/>
                                </Form.Field>
                            </Form.Group>
                            <Button type='submit' onClick={this.saveNewOrder.bind(this)}>Speichern</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}