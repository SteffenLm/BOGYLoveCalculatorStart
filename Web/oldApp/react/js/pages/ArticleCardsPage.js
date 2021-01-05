import React from "react";
import {Card, Grid, Modal, Form, Dropdown, Input, Button, Icon, Image, Rating} from 'semantic-ui-react'

import { observer } from "mobx-react"

import drinkImage from '../../img/drinks_500.png'
import foodImage from '../../img/food_500.png'
import cleaningImage from '../../img/cleaning_500.png'

@observer
export default class ArticleCardsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString : ""
		};

		this.ratingString = [ "weiss noch nicht", "taugt nix", "nicht so toll", "so lala", "gut", "sehr gut" ];

		this.articleTypeOptions = [
			{ key: 0, text: 'Essen', value: "food" },
			{ key: 1, text: 'Trinken', value: "drink" },
			{ key: 2, text: 'Reinigung', value: "cleaning" }
		];

		this.articleArray = [
			{id: 0, name: "Waschlappen", price: 0.99, amount: 10, desc: "Diese Waschlappen saugen 30% mehr Flüssigkeit auf als alle anderen Waschlappen.",  type: "cleaning", rating: 0},
			{id: 1, name: "Müsli", price: 3.99, amount: 6, desc: "Seidabacher Müsli, gell Karle.", type: "food", rating: 0},
			{id: 2, name: "Brot", price: 1.99, amount: 20, desc: "Das beste Schwarzbrot südlich von Bad Waldsee.", type: "food", rating: 0},
			{id: 3, name: "Kaffee", price: 9.99, amount: 25, desc: "Kaffee - mal schwarz, mal mit Milch.", type: "drink", rating: 0},
			{id: 4, name: "Tee", price: 2.99, amount: 4, desc: "Der grüne Tee mit der gelben Farbe.",  type: "drink", rating: 0},
			{id: 5, name: "Waschmittel", price: 3.99, amount: 7, desc: "Die Wäsche wird strahlend weiß, sogar, wenn sie vorher farbig war.", type: "cleaning", rating: 0},
			{id: 6, name: "Superquell Wasser", price: 3.99, amount: 7, desc: "Das beste Wasser, das das Schussental bietet.", type: "drink", rating: 0},
			{id: 7, name: "Pizza", price: 4.99, amount: 3, desc: "Pizza, so labbrig wie ein Waschlappen.", type: "food", rating: 0}];

		this.newName = '';
		this.newPrice = '';
		this.newAmount = '';
		this.newDesc = '';
		this.newType = '';
	}


	searchStringChanged(e) {
		this.setState({searchString : e.target.value });
	}

	ratingChanged(article, e, rating) {
		article.rating = rating.rating;
		this.setState( {});
	}

	deleteArticle(article) {
		let articleToDeleteId = article.id;
		let articleIndex = this.articleArray.findIndex(article => article.id === articleToDeleteId );
		console.log(articleIndex);
		this.articleArray.splice(articleIndex,1);
		console.log(this.articleArray)
		this.setState({});
		console.log("Rest-call: Delete");
		// hier würde beim Cloudcomputing eine Nachricht geschickt werden, um das Element zu löschen.
	}

	addArticle(article) {
		article.amount += 1;
		this.setState({});
	}

	minusArticle(article) {
		article.amount -= 1;
		this.setState({});
	}

	newNameChanged(e) {
		this.newName = e.target.value;
	}

	newPriceChanged(e) {
		this.newPrice = e.target.value;
	}

	newAmountChanged(e) {
		this.newAmount = parseInt(e.target.value);
	}

	newDescChanged(e) {
		this.newDesc = e.target.value;
	}

	articleTypeChanged(e, { value } ) {
		this.setState({ articleType : value });
		this.newType = value;
	}

	saveNewProduct() {
		let newProduct = { name: this.newName, amount: this.newAmount, price: this.newPrice, type: this.newType, desc: this.newDesc, rating: 0, id : (new Date()).getTime()}
		this.articleArray.push(newProduct);
		this.setState({});
	}

	dataOutput () {
		console.log(JSON.stringify(this.articleArray));
	}

	render() {
		let searchString = this.state.searchString;
		const CardsArray = this.articleArray
			.filter(article => article.name.toLowerCase().search(searchString.toLowerCase()) !== -1 ? true : false)
			.map(article =>
				<Card key = {article.id}>
					{ article.type === 'food'? <Image src={ foodImage } wrapped ui={false}  />: null }
					{ article.type === 'drink'? <Image src={ drinkImage } wrapped ui={false}  />: null }
					{ article.type === 'cleaning'? <Image src={ cleaningImage } wrapped ui={false}  />: null }
					<Card.Content>
						<Card.Header>{ article.name }</Card.Header>
						<Card.Meta>
							Kategorie:
							{ article.type === 'food'? " Essen" : null }
							{ article.type === 'drink'? " Trinken" : null }
							{ article.type === 'cleaning'? " Reinigung" : null }
							<br/>
							{ "Rating: " + this.ratingString[article.rating] }
						</Card.Meta>
						<Card.Description>
							{article.desc}
							<br/>
							<b>{"Preis: "+  article.price + "€"}</b>
							<br/>
							<Button.Group>
								<Button icon>
									<Icon name='minus' onClick={this.minusArticle.bind(this,article)}/>
								</Button>
								<Button icon>
									<Icon name='add' onClick={this.addArticle.bind(this,article)}/>
								</Button>
							</Button.Group>
							<b>{" Menge: "+  article.amount}</b>
							<br/>
							<Button icon basic color='red' onClick={this.deleteArticle.bind(this,article)}>
								<Icon name='delete' />
							</Button>
						</Card.Description>
					</Card.Content>
					{<Card.Content extra>
						<a>
							<Icon name='selected radio' />
							<Rating icon='star' defaultRating={0} maxRating={5} onRate={this.ratingChanged.bind(this, article)}/>
						</a>
					</Card.Content> }
				</Card> );
   	    return (
	      <div>
			  <Grid celled>
				<Grid.Row>
					<Grid.Column width={6}>
						<Input placeholder='Suchen...' onChange={this.searchStringChanged.bind(this)}/>
					</Grid.Column>
				</Grid.Row>
				  <Grid.Row>
					  <Grid.Column>
						  <Button onClick={this.dataOutput.bind(this)}>Daten ausgeben</Button>
						  <Modal trigger={<Button>Neues Produkt</Button>} closeIcon>
							  <Modal.Header>Neues Produkt einfügen</Modal.Header>
							  <Modal.Content>
								  <Modal.Description>
									  <Form>
										  <Form.Field>
											  <label>Name</label>
											  <Input placeholder='Name des Produkts' onChange={this.newNameChanged.bind(this)} />
										  </Form.Field>
										  <Form.Field>
											  <label>Preis</label>
											  <input placeholder='Preis in € eingeben'  onChange={this.newPriceChanged.bind(this)} />
										  </Form.Field>
										  <Form.Field>
											  <label>Lagerbestand</label>
											  <input placeholder='Lagerbestand in Stück'  onChange={this.newAmountChanged.bind(this)}/>
										  </Form.Field>
										  <Form.Field>
											  <label>Beschreibung</label>
											  <input placeholder='Beschreibung'  onChange={this.newDescChanged.bind(this)}/>
										  </Form.Field>
										  <Form.Field>
											  <label>Typ auswählen</label>
											  <Dropdown
												  onChange={this.articleTypeChanged.bind(this)}
												  options={this.articleTypeOptions}
												  placeholder='Bitte Typ auswählen'
												  selection
												  value={this.state.articleType}
											  />
										  </Form.Field>
										  <Button basic color={"blue"} onClick={this.saveNewProduct.bind(this)}>Speichern</Button>
									  </Form>
								  </Modal.Description>
							  </Modal.Content>
						  </Modal>
					  </Grid.Column>
				  </Grid.Row>
			  </Grid>
			  <Card.Group>
				  { CardsArray }
			  </Card.Group>
	      </div>
        );
    }
}