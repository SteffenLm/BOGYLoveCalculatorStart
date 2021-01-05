import React from "react";

import {Button, Modal, Form, Input, Dropdown, Checkbox} from 'semantic-ui-react'

import userStore from "../stores/userStore";

export default class NewUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.newUsername = '';
        this.newFirstname = '';
        this.newLastname = '';
        this.newPassword = '';
        this.newPasswordRep = '';
        this.newRoleAdmin = 0;
        this.newRoleCustomer = 0;

        this.state = { open : false, isPwdInvalid: true };
    }

    newUsernameChanged(e) {
        console.log(e.target.value);
        this.newUsername = e.target.value;
    }

    newFirstnameChanged(e) {
        this.newFirstname = e.target.value;
    }

    newLastnameChanged(e) {
        this.newLastname = e.target.value;
    }

    newPasswordChanged(e) {
        this.newPassword = e.target.value;
    }

    newPasswordRepChanged(e) {
        this.newPasswordRep = e.target.value;
    }

    saveNewUser() {
        if (this.newPassword !== this.newPasswordRep) {
            alert("Passwörter stimmen nicht überein");
            return;
        }

        let newUser = {
            username: this.newUsername,
            firstname : this.newFirstname,
            lastname : this.newLastname,
            pwd : this.newPassword,
            roleAdmin : this.newRoleAdmin,
            roleCustomer : this.newRoleCustomer
        }
        userStore.addUser(newUser);
        this.setState({open : false})
    }

    openModal() {
        this.setState({open : true})
    }

    closeModal() {
        this.setState({open : false})
    }

    /*
    newAdminChecked(a, e ) {
        this.newRoleAdmin = e.checked ? 1 : 0;
    }
     */

    newAdminChecked(a, {checked} ) {
        this.newRoleAdmin = checked ? 1 : 0;
    }

    newCustomerChecked(a, {checked}) {
        this.newRoleCustomer = checked ? 1 : 0;
    }

    render() {
        const { open } = this.state;
        return (
            <Modal
                trigger={<Button onClick={this.openModal.bind(this)}>Neuen User anlegen</Button>}
                onClose={this.closeModal.bind(this)}
                open = { open }>
                <Modal.Header>Neuer User einfügen</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Username</label>
                                <Input placeholder='Username des neuen Nutzers' onChange={this.newUsernameChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Vorname</label>
                                <Input placeholder='Vorname eingeben' onChange={this.newFirstnameChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Nachname</label>
                                <Input placeholder='Nachname eingeben' onChange={this.newLastnameChanged.bind(this)}/>
                            </Form.Field>
                            <Form.Group>
                                <Form.Field>
                                    <label>Passwort</label>
                                    <Input type={"password"} placeholder='Passwort eingeben' onChange={this.newPasswordChanged.bind(this)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Passwort wiederholen</label>
                                    <Input type={"password"} placeholder='Passwort wiederholt eingeben' onChange={this.newPasswordRepChanged.bind(this)}/>
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Field>
                                    <label>Admin-Rolle</label>
                                    <Checkbox onChange={this.newAdminChecked.bind(this)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Kunden-Rolle</label>
                                    <Checkbox onChange={this.newCustomerChecked.bind(this)}/>
                                </Form.Field>
                            </Form.Group>
                            <Button type='submit' onClick={this.saveNewUser.bind(this)}>Speichern</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}