import React from "react";

// Cards und Images und Icons importieren 
import { Image, Button, Segment, Icon, Header, Input } from 'semantic-ui-react'

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
export default class RabbitName extends React.Component {
	 constructor(props) {
      super(props);
      this.state = {
      	messageText : ''
	  }
   }

   countUp() {
	    // Konsolenausgabe beim Klicken.
		console.log("Count up");
	    // c. Action in mobxInteractionStore
		mobxInteractionStore.countUp();
   }

	countDown() {
		// Konsolenausgabe beim Klicken.
		console.log("Count down");
		mobxInteractionStore.countDown();
	}

	messageTextChanged(e) {
		// Konsolenausgabe beim Klicken.
		console.log(e.target.value);
		this.setState({messageText : e.target.value});
		mobxInteractionStore.setMessageText(e.target.value);
	}

       render() {
	 	// Kurzschreibweise
  	    const {rabbit} = mobxInteractionStore;
  	    // dasselbe wie
		// const rabbit = mobxInteractionStore.rabbit;

		return (
	      <div>
			  <Segment placeholder >
				  <Header icon>
					  { rabbit == 'francis' ? <Icon name='angle double left' /> : '' }
					  { rabbit == 'safira' ? <Icon name='angle double right' />: ''}
					  { rabbit == 'coolrabbit' ? <Icon name='angle double up' /> : ''}

					  Der Name des Hasen:
					  { rabbit == 'francis' ? ' Francis' : '' }
					  { rabbit == 'safira' ? ' Safira' : ''}
					  { rabbit == 'coolrabbit' ? ' CoolRabbit' : ''}
				  </Header>
				  <br/>
				  <Button basic color='blue' onClick={ this.countUp.bind(this) }>Count up</Button>
				  <Button basic color='red' onClick={ this.countDown.bind(this) }>Count down</Button>
				  <br/>
				  <Input icon='mail outline' iconPosition='left' placeholder='Enter Message...' value={this.state.messageText}onChange={this.messageTextChanged.bind(this)}/>
			  </Segment>
	      </div>
        );
    }
}