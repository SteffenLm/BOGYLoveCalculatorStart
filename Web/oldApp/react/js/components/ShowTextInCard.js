import React from "react";

// Cards und Images und Icons importieren 
import { Card, Icon, Image } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden 
import restTextStore from "../stores/restTextStore"

// Bilder für Avatare laden -- die Bilder werden nur einmal vom Server geholt 
// siehe "Network" in Chrome 
import francis from '../res/francis.jpg'; 
import safira from '../res/safira.jpg';
import coolrabbit from '../res/coolrabbit.png';

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren. 
@observer
export default class ShowTextInCard extends React.Component {
	 constructor(props) {
      super(props); 
      this.rabbit = props.rabbit || 'coolrabbit';
   }


  // nachdem der neue Text geladen wurde, wird die Komponente neu gerendert.
    render() {
		// r9. Wenn sich das Observable theObjectFromRest im Store restTextStore ändert, wird die Komponente neu gerendert.
	    const {theObjectFromRest} = restTextStore;
   	    return (
	      <div>
	         <Card>
           		{ this.rabbit === 'francis' ? <Image src={ francis } /> : '' }
           		{ this.rabbit === 'safira' ? <Image src={ safira } /> : '' }
           		{ this.rabbit === 'coolrabbit' ? <Image src={ coolrabbit } /> : ''}
   			   <Card.Content>
    		   		<Card.Header>{this.rabbit} sagt:</Card.Header>
               		<Card.Description> 
                    	{/* Der Text des attributs Body wird hier eingefügt */ 	theObjectFromRest.body}
               		</Card.Description>
    		   </Card.Content>
			     </Card>
	      </div>
        );
    }
}