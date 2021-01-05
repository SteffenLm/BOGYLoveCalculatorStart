import React from "react";

import {Button, Modal, Form, Input, Dropdown, Checkbox} from 'semantic-ui-react'

import articleStore from "../stores/articleStore";
import config from "../../config/main.config"

export default class NewArticleModal extends React.Component {
    constructor(props) {
        super(props);
        this.newName = '';
        this.newPricePerDay = '';
        this.newNote = '';
        this.newIsAvailable = 1;
        this.newCategory = '';
        this.newIsProTool = 0;
        this.state = { open : false };
    }

    newNameChanged(e) {
        this.newName = e.target.value;
    }

    newPriceChanged(e) {
        this.newPricePerDay = e.target.value;
    }

    newNoteChanged(e) {
        this.newNote = e.target.value;
    }

    newIsAvailableChanged(a, e) {
        this.newIsAvailable = e.checked ? 1 : 0;
    }

    newIsProToolChanged(a, e) {
        this.newIsProTool = e.checked ? 1 : 0;
    }

    newCategoryChanged(a, e) {
        this.newCategory = e.value;
    }

    saveNewProduct() {
        let newArticle = {
            name: this.newName,
            category: this.newCategory,
            note: this.newNote,
            isAvailable: this.newIsAvailable,
            isProTool: this.newIsProTool,
            pricePerDay: this.newPricePerDay
        }
        articleStore.addArticle(newArticle);
        this.setState({open : false})
    }

    openModal() {
        console.log("clicked")
        this.setState({open : true})
    }

    closeModal() {
        console.log("clicked")
        this.setState({open : false})
    }

    render() {
        const { open } = this.state;
        return (
            <Modal
                trigger={<Button onClick={this.openModal.bind(this)}>Neuen Artikel anlegen</Button>}
                onClose={this.closeModal.bind(this)}
                open = { open }>
                <Modal.Header>Neuer Artikel einfügen</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <Input placeholder='Name des Artikels' onChange={this.newNameChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Kurzeschreibung</label>
                                <Input placeholder='Infos zum Artikel' onChange={this.newNoteChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Preis</label>
                                <Input type={"number"} placeholder='Preis pro Tag in € eingeben'
                                       onChange={this.newPriceChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <Checkbox label={"Verleihbar"} onChange={this.newIsAvailableChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <Checkbox label={"Profiwerkzeug"} onChange={this.newIsProToolChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Typ auswählen</label>
                                <Dropdown
                                    onChange={this.newCategoryChanged.bind(this)}
                                    options={config.ARTICLE_CATEGORIES}
                                    placeholder='Kategorie wählen'
                                    selection
                                />
                            </Form.Field>
                            <Button type='submit' onClick={this.saveNewProduct.bind(this)}>Speichern</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}