import React from "react";

// Cards und Images und Icons importieren 
import { Card, Image, Button } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden 
import mobxInteractionStore from "../stores/mobxInteractionStore"

// Bilder für Avatare laden -- die Bilder werden nur einmal vom Server geholt 
// siehe "Network" in Chrome 
import francis from '../res/francis.jpg'; 
import safira from '../res/safira.jpg';
import coolrabbit from '../res/coolrabbit.png';

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren. 
@observer
export default class RabbitCards extends React.Component {
	 constructor(props) {
      super(props); 
   }

   // b. Der Count up Button wurde geklickt.
   countUp() {
	    // Konsolenausgabe beim Klicken.
		console.log("Count up");
	    // c. Action in mobxInteractionStore
		mobxInteractionStore.countUp();
   }



  	// 4. nachdem die Observabla rabbit in mobxInteractionStore
	// in der action selectRabbit neu gesetz wurde, wird die
	// Komponente neu gerendert, weil die observable-Variable in
	// der render Funktion enhalten ist.
    render() {
	 	// Kurzschreibweise
  	    const {rabbit} = mobxInteractionStore;
  	    // dasselbe wie
		// const rabbit = mobxInteractionStore.rabbit;

		return (
	      <div>
	         <Card>
              { rabbit == 'francis' ? <Image src={ francis } /> : '' }
              { rabbit == 'safira' ? <Image src={ safira } /> : '' }
              { rabbit == 'coolrabbit' ? <Image src={ coolrabbit } /> : ''}
   			   <Card.Content>
    		   		<Card.Header>{ rabbit == '' ? 'Bitte Hasen wählen' : ''.concat(rabbit).toUpperCase().concat(" sagt") }:</Card.Header>
               		<Card.Description> 
                      { rabbit == 'francis' ? 'Ich möchte gerne einen Löwenzahn.' : '' }
                      { rabbit == 'safira' ? 'Ich möchte gerne ein Kohlrabiblatt.' : ''}
                      { rabbit == 'coolrabbit' ? 'Ich hätte gerne ein Buschel Heu.' : ''}
               		</Card.Description>
    		   </Card.Content>
	   	     </Card>
			 {/* a. Wenn Button geklickt wird, dann soll eine Counter-Variable hochgezählt werden und RabbitSwitch soll den Wert der Countervariablen darstellen.   */}
			 <Button primary onClick={ this.countUp.bind(this) }>Count up</Button>
	      </div>
        );
    }
}