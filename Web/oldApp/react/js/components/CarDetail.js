import React from "react";

// Cards und Images und Icons importieren 
import { Icon, Card, Image } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden 
import carsStore from "../stores/carsStore"

import car from '../res/car.png'; 

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren. 
@observer
export default class CarDetail extends React.Component {
	 constructor(props) {
      super(props); 
   }


  // nachdem der neue Text geladen wurde, wird die Komponente neu gerendert.
    render() {
  	    const {selectedCar} = carsStore;
   	    return (
	      <div>
	         <Card>
				 {/*<Image src={ car } /> */}
   			   <Card.Content>
    		   		<Card.Header>Auto:</Card.Header>
               		<Card.Description> 
                      {selectedCar.name + " " + selectedCar.type }
                      <br />
                      {"FIN: " + selectedCar.fin}
                      <br />
                      {"Leistung [Kw]: " + selectedCar.powerKw}
               		</Card.Description>
    		   </Card.Content>
			     </Card>
	      </div>
        );
    }
}