import React from "react";

// Cards und Images und Icons importieren 
import { Form, Modal, Header, Button, Table, Icon } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden 
import carsStore from "../stores/carsStore"

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren. 
@observer
export default class CarsList extends React.Component {
	  constructor(props) {
       super(props); 
       this.state = {modalOpen : false}
       this.newCar = {}; 
       carsStore.fetchCars();
    }

    reloadClicked() {
       carsStore.fetchCars();
    }
   
    tableRowClicked(car) {
       carsStore.selectCar(car); 
       console.log(car);
    }

    removeClicked(car) {
      console.log("remove");
      console.log(car);
      carsStore.deleteCar(car.idCar);
    }

    saveNewCarClicked() {
      // modal schließen
      this.setState({ modalOpen: false }) 
      console.log(this.newCar);
      carsStore.addNewCar(this.newCar); 
    }

    openModal() {
      this.newCar = {}; 
      this.setState({ modalOpen: true });
    }

    nameChanged(e){
      console.log(e.target.value);
      this.newCar.name = e.target.value;
    }

    typeChanged(e){
      console.log(e.target.value);
      this.newCar.type = e.target.value;
    }

    powerPsChanged(e){
      console.log(e.target.value);
      this.newCar.powerKw = e.target.value;
    }

    finChanged(e){
      console.log(e.target.value);
      this.newCar.fin = e.target.value;
    }


  // nachdem der neue Text geladen wurde, wird die Komponente neu gerendert.
    render() {
        // nachdem die Cars geladen wurden, wird die Komponenten gerendert
        const {carsFromServer} = carsStore; 
        const carsArray = [...carsFromServer]; 

        console.log("Render Component");
        console.log(carsArray);
        const TableRowsCars = carsArray.map((car,i) =>  
                      <Table.Row key={car.idCar} onClick={this.tableRowClicked.bind(this,car)}>
                        <Table.Cell> { car.name }</Table.Cell>
                        <Table.Cell> { car.type }</Table.Cell>
                        <Table.Cell onClick={this.removeClicked.bind(this,car)}><Icon name="remove" /></Table.Cell>
                      </Table.Row>);       
   	    return (
	      <div>
            <Button onClick={this.reloadClicked.bind(this)}>Reload</Button>
	          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Car</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {  TableRowsCars  }
            </Table.Body>
            </Table>
            <Modal 
              trigger={<Button onClick={this.openModal.bind(this)}>Neues Fahrzeug anlegen</Button>}
              open={this.state.modalOpen}
              onClose={this.close}
              >
              <Modal.Header>Neues Fahrzeug eingeben</Modal.Header>
              <Modal.Content>
              
              <Modal.Description>
              
              <Form>
                <Form.Field>
                <label>Fahrzeugname</label>
                   <input placeholder='Fahrzeugname' onChange={this.nameChanged.bind(this)} />
                </Form.Field>
                <Form.Field>
                  <label>Typ</label>
                  <input placeholder='Typ z.B. 320i' onChange={this.typeChanged.bind(this)} />
                </Form.Field>
                <Form.Field>
                  <label>Leistung</label>
                  <input placeholder='in PS' onChange={this.powerPsChanged.bind(this)} />
                </Form.Field>
                <Form.Field>
                  <label>FIN</label>
                  <input placeholder='FIN eingeben' onChange={this.finChanged.bind(this)} />
                </Form.Field>
                <Button type="button" onClick={this.saveNewCarClicked.bind(this)}>Speichern</Button>
              </Form>

               </Modal.Description>
              </Modal.Content>
              </Modal>
	      </div>
        );
    }
}