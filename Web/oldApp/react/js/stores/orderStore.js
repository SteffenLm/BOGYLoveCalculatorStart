import { observable, action } from 'mobx';
import config from "../../config/main.config";

class orderStore {
    @observable order = [];
    @observable orderByUser = [];
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

    @action fetchOrder() {
        fetch(config.BASE_URL_API + 'userarticle/', {
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
                        this.order = json.userArticle;
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

    @action fetchOrderOfUser() {
        fetch(config.BASE_URL_API + 'userarticle/byUser/', {
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
                        this.orderByUser = json.userArticle;
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

    @action addOrder(newOrder) {
        fetch(config.BASE_URL_API + 'userarticle/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            }, 
            body: JSON.stringify({
                userId : newOrder.userId,
                articleId : newOrder.articleId,
                isAvailable : newOrder.isAvailable,
                startDate : newOrder.startDate,
                endDate : newOrder.endDate
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log(json);
                        this.fetchOrder();
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

/*    @action editArticleDataField(id, datafield, value) {
        fetch(config.BASE_URL_API + 'userarticle/datafield', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
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
    } */

    @action editOrder(editOrder) {
        fetch(config.BASE_URL_API + 'userarticle/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            },
            body: JSON.stringify({
                id: editOrder.id,
                userId : editOrder.userUd,
                articleId : editOrder.articleId,
                isAvailable : editOrder.isAvailable,
                startDate : editOrder.startDate,
                endDate : editOrder.endDate
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then(json => {
                    this.fetchOrder();
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


    @action deleteOrder(orderId) {
        fetch(config.BASE_URL_API + 'userarticle/' + orderId, {
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
                         this.fetchOrder();
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

const store = new orderStore();

export default store;