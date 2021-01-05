import {observable, action, computed} from 'mobx';
import config from "../../config/main.config";


class userStore {
    @observable user = [];
    @observable userLoggedIn = {};
    @observable userById = [];
    @observable error = '';



    @action fetchUser() {
        fetch(config.BASE_URL_API + 'user/', {
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
                        this.user = json.user;
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

    @action fetchUserById(userId) {
        fetch(config.BASE_URL_API + 'user/id/'+ userId, {
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
                        console.log("singleUser");
                        console.log(json);
                        this.userById = json.user;
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


    @action addUser(newUser) {
        fetch(config.BASE_URL_API + 'user/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            }, 
            body: JSON.stringify({
                firstname : newUser.firstname,
                lastname : newUser.lastname,
                pwd : newUser.pwd,
                username : newUser.username,
                roleAdmin : newUser.roleAdmin,
                roleCustomer : newUser.roleCustomer
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log(json);
                        this.fetchUser();
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

    @action editUser(editUser) {
        fetch(config.BASE_URL_API + 'user/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": "Bearer " + this.getTokenFromLocalStorage()
            },
            body: JSON.stringify({
                id: editUser.id,
                prename : editUser.prename,
                surname : editUser.surname,
                pwd : editUser.pwd,
                username : editUser.username,
                roleAdmin : newUser.roleAdmin,
                roleCustomer : newUser.roleCustomer
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                response.json().then(json => {
                    this.fetchUser();
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


    @action deleteUser(userId) {
        fetch(config.BASE_URL_API + 'user/' + userId, {
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
                        this.fetchUser();
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

    // ########## LOGIN
    constructor() {
        this.STORAGE_KEY = "bbbd737698w";
        this.USER_STORAGE_KEY = "abdh37383912jdjd";
    }

    setTokenLocalStorage(token) {
        if(typeof window !== "undefined") {
            let object = {
                "token": token,
                timestamp: new Date().getTime()
            };

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(object));
        }
    }

    setUserToLocalStorage(user) {
        if(typeof window !== "undefined") {
            let object = {
                "user": user,
                timestamp: new Date().getTime()
            };
            localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(object));
        }

    }

    getTokenFromLocalStorage() {
        if(typeof window !== "undefined") {
            let object = JSON.parse(localStorage.getItem(config.STORAGE_KEY));

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

    getUserFromLocalStorage() {
        if(typeof window !== "undefined") {
            let object = JSON.parse(localStorage.getItem(config.USER_STORAGE_KEY));

            if(object === null) {
                return null;
            }

            let oneDayAfterTokenDate = new Date(object.timestamp);
            oneDayAfterTokenDate.setDate(oneDayAfterTokenDate.getDate() + 1);

            if(oneDayAfterTokenDate.getTime() > new Date().getTime()) {
                return object.user;
            }
            else {
                removeTokenFromStorage();
                return null;
            }
        }

        return null;

    }

    @computed get userFromServer() {
        console.log(this.userLoggedIn);
        if (this.userLoggedIn === null) {
            if (this.getUserFromLocalStorage() !== null && typeof this.getUserFromLocalStorage() !== "undefined") {
                this.userLoggedIn = this.getUserFromLocalStorage();
            }
        }
        return this.userLoggedIn;
    }

    @action authenticateUser(username, password) {
        const token = this.getTokenFromLocalStorage();
        if (username === '' || password === '') {
            alert("Bitte melden Sie sich erneut an.")
        }
        else {
            return fetch(config.BASE_URL + "api/user/auth", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({username: username, password: password})
            })
                .then(response => {
                    this.loading = false;
                    if (response.status >= 200 && response.status < 300) {
                        response.json().then(json => {
                            this.setTokenLocalStorage(json.token);
                            this.setUserToLocalStorage(json);
                            this.userLoggedIn = json;
                        });

                    } else {
                        //TODO: Alert?
                        removeTokenFromStorage();
                        this.error = true;
                        this.user = null;
                    }
                })
                .catch(
                    error => {
                        //TODO: Alert?
                        removeTokenFromStorage();
                        this.loading = false;
                        this.error = true;
                        this.user = null;
                        throw error;
                    }
                );
        }
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
}

const store = new userStore();

export default store;