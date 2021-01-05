import { observable, action } from 'mobx';
import config from "../../config/main.config";

class articleStore {
/*    @observable selectedCar = {};
    @action selectCar(car) {
        this.selectedCar = car; 
    }
*/
    @observable article = [];
    @observable error = '';

    constructor() {
        this.STORAGE_KEY = "bbbd737698w";
        this.USER_STORAGE_KEY = "abdh37383912jdjd";
    }

    // Login
    getTokenFromLocalStorage() {
        if(typeof window !== "undefined") {
            let object = JSON.parse(localStorage.getItem(this.STORAGE_KEY));

            if(object === null) {
                return null;
            }

            let oneDayAfterTokenDate = new Date(object.timestamp);
            oneDayAfterTokenDate.setDate(oneDayAfterTokenDate.getDate() + 1);

            if(oneDayAfterTokenDate.getTime() > new Date().getTime()) {
                return object.token;
            }
            else {
                removeTokenFromStorage();
                return null;
            }
        }
    }

    @action fetchArticle() {
        fetch(config.BASE_URL_API + 'article/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        this.article = json.article;
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }

    @action addArticle(newArticle) {
        fetch(config.BASE_URL_API + 'article/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            }, 
            body: JSON.stringify({
                name : newArticle.name,
                category : newArticle.category,
                note : newArticle.note,
                isAvailable : newArticle.isAvailable,
                isProTool : newArticle.isProTool,
                pricePerDay : newArticle.pricePerDay
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log(json);
                        this.fetchArticle();
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }

    @action editArticleDataField(id, datafield, value) {
        fetch(config.BASE_URL_API + 'article/datafield', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            },
            body: JSON.stringify({
                id : id,
                datafield : datafield,
                value : value
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then(json => {
                    this.fetchArticle();
                });

            } else {
                this.error = "Error on fetching";
            }
        })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }

    @action editArticle(editArticle) {
        fetch(config.BASE_URL_API + 'article/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            },
            body: JSON.stringify({
                id: editArticle.id,
                name : editArticle.name,
                category : editArticle.category,
                note : editArticle.note,
                isAvailable : editArticle.isAvailable,
                isProTool : editArticle.isProTool,
                pricePerDay : editArticle.isProTool
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then(json => {
                    this.fetchArticle();
                });

            } else {
                this.error = "Error on fetching";
            }
        })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }


    @action deleteArticle(articleId) {
        fetch(config.BASE_URL_API + 'article/' + articleId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log(json);
                         this.fetchArticle();
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }
}

const store = new articleStore();

export default store;