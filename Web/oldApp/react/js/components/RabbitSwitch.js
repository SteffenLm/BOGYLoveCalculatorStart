import React from "react";

// Cards und Images und Icons importieren 
import { Button, Icon } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// Store einbinden
import mobxInteractionStore from "../stores/mobxInteractionStore"

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren.
// wird zur MOBX fähigen Komponente.
@observer
export default class RabbitSwitch extends React.Component {
	 constructor(props) {
      super(props); 
      this.state = { selectedRabbit : '' }
   }

   // 1. Button Francis wurde geklickt.
   francisPressed(e) {
	  // 2. MOBX-Action wird getriggert.
      mobxInteractionStore.selectRabbit('francis');
      // State wird gesetzt --> render() wird aufgerufen
      this.setState( { selectedRabbit : 'francis' }); 
   }

   safiraPressed(e) {
      mobxInteractionStore.selectRabbit('safira'); 
      this.setState( { selectedRabbit : 'safira' }); 
   }

   coolrabbitPressed(e) {
      mobxInteractionStore.selectRabbit('coolrabbit'); 
      this.setState( { selectedRabbit : 'coolrabbit' }); 
   }

    render() {
        const { selectedRabbit } = this.state;
        // e. wenn das Observable counter aktualisiert wird, dann wird neu gerendert.
        const { counter } = mobxInteractionStore;
        const { messageText } = mobxInteractionStore;
        console.log(counter);
   	    return (
	      <div>
   			 <Button.Group vertical >
                <Button active={ selectedRabbit=='francis' ? true : false } onClick={ this.francisPressed.bind(this) }>Francis</Button>
                <Button active={ selectedRabbit=='safira' ? true : false } onClick={ this.safiraPressed.bind(this) }>Safira</Button>
                <Button active={ selectedRabbit=='coolrabbit' ? true : false }onClick={ this.coolrabbitPressed.bind(this) }>CoolBunny</Button>
            </Button.Group>
            {/* Counter Variable darstellen. */}
            <h3>Counter: { counter }  </h3>
            <br/>
              <Icon name='mail outline' />  {messageText}
	      </div>
        );
    }
}