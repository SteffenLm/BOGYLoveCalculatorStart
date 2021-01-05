import React from "react";
import {
	Modal,
	Dropdown,
	Form,
	Header,
	Grid,
	Input,
	Rating,
	Image,
	Table,
	Segment,
	Responsive,
	Card,
	Button,
	Icon,
	Checkbox
} from 'semantic-ui-react'

import { observer } from "mobx-react"

import drinkImage from '../../img/drinks_500.png'
import foodImage from '../../img/food_500.png'
import cleaningImage from '../../img/cleaning_500.png'

import articleStore from '../stores/articleStore'
import NewArticleModal from "../components/NewArticleModal";

@observer
export default class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedArticleName : "no articleselected",
			searchString : "",
			maxPrice: 100,
			articleType : ""
		};

		this.ratingString = [ "weiss noch nicht", "taugt nix", "nicht so toll", "so lala", "gut", "sehr gut" ];

		this.articleTypeOptions = [
			{ key: 0, text: 'Essen', value: "food" },
			{ key: 1, text: 'Trinken', value: "drink" },
			{ key: 2, text: 'Reinigung', value: "cleaning" },
		];


	}

	articleClicked(article) {
		this.setState ({selectedArticleName : article.name })
		if (article.amount === 0) {
			alert("Artikel ausverkauft");
		} else {
			article.amount--;
		}
	}

	componentDidMount() {
		articleStore.fetchArticle();
	}

	searchStringChanged(e) {
		this.setState({searchString : e.target.value });
	}


	priceStringChanged(e) {
		if (e.target.value === '') {
			this.setState({maxPrice : 100 });
		}
		else {
			this.setState({maxPrice : e.target.value });
		}
	}

/*	amountChanged(article, e) {
		this.setState ({selectedArticleName : article.name })
		// console.log(e.target.value);
		let amount = parseInt(e.target.value);
		article.amount = isNaN(amount) ? 0 : amount ;
		// console.log(article);
	}*/

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

	articleTypeChanged(e, {value } ) {
		this.setState({ articleType : value });
		this.newType = value;
	}



	amountResetClicked(article) {
		article.amount = 0;
		this.setState ({selectedArticleName : article.name })
	}

	ratingChanged(article, e , rating) {
		article.rating = rating.rating;
		this.setState( {});
	}

	saveNewProduct() {
		let newProduct = { name: this.newName, amount: this.newAmount, price: this.newPrice, type: this.newType, desc: this.newDesc, rating: 0, id : new Date()}
		this.articleArray.push(newProduct);
	}

	deleteArticle(article) {
		articleStore.deleteArticle(article.id);
	}

	availableChanged(article, b, e) {
		console.log(article);
		console.log(e.checked);
		let isAvailable = false;
		if (e.checked) {
			isAvailable = true;
		}
		articleStore.editArticleDataField(article.id,"isAvailable", isAvailable);
	}

	priceChanged(article, b, e) {
		console.log(article);
		console.log(b)
		console.log(e.value);
		article.pricePerDay = e.value;
	    articleStore.editArticleDataField(article.id,"pricePerDay", article.pricePerDay);
	}


    render() {
		const { article } = articleStore;
		console.log("article in render");
		console.log(article);
		let searchString = this.state.searchString;
		let maxPrice = this.state.maxPrice;

		const CardsArray = article
			.filter(article => (article.name.toLowerCase().search(searchString.toLowerCase()) !== -1) ? true : false)
			.map(article =>
				<Card key = {article.id}>
					{ article.category === 'Set'? <Image src={ foodImage } wrapped ui={false}  />: null }
					{ article.category === 'Garten'? <Image src={ drinkImage } wrapped ui={false}  />: null }
					{ article.category === 'Kleinmaschine'? <Image src={ cleaningImage } wrapped ui={false}  />: null }
					<Card.Content>
					  <Card.Header>{ article.name }</Card.Header>
					  <Card.Meta>
						  Kategorie:
						  { article.category  }
					  </Card.Meta>
					  <Card.Description>
						  {article.note}
						  <br/>
						  <Input type={"number"} label={"Preis in €"} value = { article.pricePerDay } onChange={this.priceChanged.bind(this, article)}/>
						  <br/>
						  <Checkbox onChange={this.availableChanged.bind(this, article)} label='Artikel ist verleihbar' />
						  <Button icon basic color='red' onClick={this.deleteArticle.bind(this,article)}>
							  <Icon name='delete' />
						  </Button>
					  </Card.Description>
					</Card.Content>
			  </Card> );
		return (
	      <div>
			  <Responsive as={Grid} minWidth={600}>
				  <Grid.Row>
					  <Grid.Column>
					  		<Input placeholder='Suchen...' onChange={this.searchStringChanged.bind(this)}/>
					  </Grid.Column>
				  </Grid.Row>
				  <Grid.Row>
					  <Grid.Column>
							<NewArticleModal />
					  </Grid.Column>

				  </Grid.Row>
			  </Responsive>
			  <Card.Group>
			  { CardsArray }
				  </Card.Group>
			  <Segment.Group>
			  <Responsive as={Segment} maxWidth={600}>
				  Bitte breites Fenster verwenden.
			  </Responsive>
			  </Segment.Group>
	      </div>
        );
    }
}