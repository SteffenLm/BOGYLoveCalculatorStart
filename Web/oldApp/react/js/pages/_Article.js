import React from "react";
import {Divider, Grid, Input, Table, Segment, Responsive, Button, Icon} from 'semantic-ui-react'

import { observer } from "mobx-react"


@observer
export default class _Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedArticleName : "no articleselected",
			searchString : "",
			maxPrice: 100
		};
		this.articleArray = [{id: 0, name: "Waschlappen", price: 0.99, amount: 10},
							 {id: 1, name: "Müsli", price: 3.99, amount: 6},
						  	 {id: 2, name: "Brot", price: 1.99, amount: 20},
							 {id: 3, name: "Kaffee", price: 9.99, amount: 25},
							 {id: 4, name: "Tee", price: 2.99, amount: 4},
							 {id: 5, name: "Waschmittel", price: 3.99, amount: 7}];

		// Beispiel für eine Map-Funktionmit for-Schleife
		/* let myFilteredArray  = [];
		for (let i = 0 ; i < this.articleArray.length ; i++) {
			let article = this.articleArray[i];
			if (article.name.search("Wasch") !== -1) {
				myFilteredArray.push(this.articleArray[i]);
			}
		}
		console.log(myFilteredArray);
		// map-Funktion ist die effiziente Kurzschreibweise der gezeigten for-Schleife
		*/

		/* Langverion
		let newArticleArray = this.articleArray.filter(
			function(article)
			{
				if (article.name.search("Wasch") !== -1) {
					return true;
				}
				else {
					return false;
				}
			});
		 */
		/*
		let searchString = "brot";
		let newArticleArray = this.articleArray.filter(article => article.name.toLowerCase().search(searchString.toLowerCase()) !== -1 ? true : false);
		console.log(newArticleArray);
		 */
	}

	articleClicked(article) {
		this.setState ({selectedArticleName : article.name })
		if (article.amount === 0) {
			alert("Artikel ausverkauft");
		} else {
			article.amount--;
		}
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

	amountChanged(article, e) {
		this.setState ({selectedArticleName : article.name })
		// console.log(e.target.value);
		let amount = parseInt(e.target.value);
		article.amount = isNaN(amount) ? 0 : amount ;
		// console.log(article);
	}

	amountResetClicked(article) {
		article.amount = 0;
		this.setState ({selectedArticleName : article.name })
	}

    render() {
		let searchString = this.state.searchString;
		let maxPrice = this.state.maxPrice;

		const TableRowArticle = this.articleArray
			.filter(article => ((article.name.toLowerCase().search(searchString.toLowerCase()) !== -1) && (article.price <= maxPrice)) ? true : false)
			.map((article,i) =>
			<Table.Row key={article.id}  >
				<Table.Cell onClick={this.articleClicked.bind(this,article)}> { article.name } </Table.Cell>
				<Table.Cell onClick={this.articleClicked.bind(this,article)}> { article.price } </Table.Cell>
				<Table.Cell> <Input value = { article.amount } onChange = {this.amountChanged.bind(this, article)}/></Table.Cell>
				<Table.Cell>
					<Button basic color="red" onClick = {this.amountResetClicked.bind(this, article)}><Icon name = "delete"/>Delete</Button>
				</Table.Cell>

			</Table.Row>);
		let priceSum = 0;
		const price = this.articleArray.map(article => { priceSum += article.price * article.amount; return article });
   	    return (
	      <div>
			  <Responsive as={Grid} minWidth={600}>
			  <Grid celled>
				<Grid.Row>
					<Grid.Column width={6}>
						<Input placeholder='Suchen...' onChange={this.searchStringChanged.bind(this)}/>
					</Grid.Column>
					<Grid.Column width={6}>
						<Input placeholder='max. Preis...' onChange={this.priceStringChanged.bind(this)}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={6}>
						<Table celled selectable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Name</Table.HeaderCell>
									<Table.HeaderCell>Preis</Table.HeaderCell>
									<Table.HeaderCell>Menge</Table.HeaderCell>
									<Table.HeaderCell><Icon name = "trash alternate"/></Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{ TableRowArticle }
							</Table.Body>
						</Table>
					</Grid.Column>
					<Grid.Column width={4} >
						<Segment> {this.state.selectedArticleName }</Segment>
					</Grid.Column>
			  	</Grid.Row>
			  </Grid>
			  <Segment>
				  { "Gesamtsumme: " + priceSum.toFixed(2) + " €" }
			  </Segment>
			  </Responsive>
			  <Segment.Group>
			  <Responsive as={Segment} maxWidth={600}>
				  Bitte breites Fenster verwenden.
			  </Responsive>
			  </Segment.Group>
	      </div>
        );
    }
}