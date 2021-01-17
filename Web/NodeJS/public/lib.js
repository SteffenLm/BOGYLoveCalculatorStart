const content = document.getElementById('content');
let token = null;
let matches = null;

getToken();

const render = {
    index: function () {
        content.innerHTML = renderHeader('index') + renderMatch();
        registerClickHandler('logo', render.index);
        document.getElementById('matchbutton').addEventListener('click', () => {
            const firstName = getElementValueByElementId('firstname');
            const secondName = getElementValueByElementId('secondname');
            calculateMatch(firstName, secondName);
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(matchResult);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/api/match", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        });
        document.getElementById('showmatches').addEventListener('click', () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("api/match", requestOptions)
                .then(response => response.text())
                .then((result) => {
                    matches = JSON.parse(result);
                    matches.forEach((match) => {
                        match.created_at = new Date(match.created_at);
                    });
                    render.matches();
                })
                .catch(error => console.log('error', error));
        });
        registerClickHandler('account', render.account);
    },

    matches: function () {
        content.innerHTML = renderHeader('matches') + renderMatches() + renderModal();
        registerClickHandler('logo', render.index);

        const modal = document.getElementById('myModal');
        const filterButton = document.getElementById('filter');
        filterButton.addEventListener('click', function () {
            modal.className = "Modal is-visuallyHidden";
            setTimeout(function () {
                modal.className = "Modal";
            }, 100);
        });
        const closeModalButton = document.getElementById("closeModal");
        closeModalButton.addEventListener('click', function () {
            modal.className = "Modal is-hidden is-visuallyHidden";
        });
        registerClickHandler('account', render.account);

        const alphabeticalButton = document.getElementById('alfa');
        const matchpointButton = document.getElementById('points');
        const dateButton = document.getElementById('date');

        alphabeticalButton.addEventListener('click', function () {
            sortType = 'alfa';
            const activeClass = ['bg-act-blue', 'text-white'];
            const inactiveClass = ['bg-act-grey', 'text-black'];
            alphabeticalButton.classList.remove(...inactiveClass);
            alphabeticalButton.classList.add(...activeClass);
            matchpointButton.classList.remove(...activeClass);
            matchpointButton.classList.add(...inactiveClass);
            dateButton.classList.remove(...activeClass);
            dateButton.classList.add(...inactiveClass);
        });
        matchpointButton.addEventListener('click', function () {
            sortType = 'result';
            const activeClass = ['bg-act-blue', 'text-white'];
            const inactiveClass = ['bg-act-grey', 'text-black'];
            alphabeticalButton.classList.remove(...activeClass);
            alphabeticalButton.classList.add(...inactiveClass);
            dateButton.classList.remove(...activeClass);
            dateButton.classList.add(...inactiveClass);
            matchpointButton.classList.remove(...inactiveClass);
            matchpointButton.classList.add(...activeClass);
        });
        dateButton.addEventListener('click', function () {
            sortType = 'date';
            const activeClass = ['bg-act-blue', 'text-white'];
            const inactiveClass = ['bg-act-grey', 'text-black'];
            alphabeticalButton.classList.remove(...activeClass);
            alphabeticalButton.classList.add(...inactiveClass);
            matchpointButton.classList.remove(...activeClass);
            matchpointButton.classList.add(...inactiveClass);
            dateButton.classList.remove(...inactiveClass);
            dateButton.classList.add(...activeClass);
        });
        const okButton = document.getElementById('sort');
        okButton.addEventListener('click', function () {
            switch (sortType) {
                case 'date':
                    sorters.date();
                    break;
                case 'alfa':
                    sorters.alfa()
                    break;
                case 'result':
                    sorters.result();
                    break;
                default:
                    sorters.date();
                    break;
            }
        });
    },

    login: function () {
        content.innerHTML = `<div class="flex h-screen justify-center items-center">
            <div style="box-shadow: 5px 3px 10px grey; min-width: 700px;"
                class="flex flex-col max-w-screen-lg bg-white rounded-lg px-16 pt-12 pb-16">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="78.698" height="93.705" viewBox="0 0 78.698 93.705">
                            <path
                                d="M259.871,434.859a2.972,2.972,0,0,0-2.069-2.294c-4.721-1.537-9.464-3.023-14.054-4.925a103.408,103.408,0,0,1-18.142-10.051c-.435-.292-.423-.464-.133-.847a106.2,106.2,0,0,0,6.9-10.454,93.2,93.2,0,0,0,7.227-14.717c2.348-6.358,3.946-12.834,3.229-19.693a19.1,19.1,0,0,0-1.935-6.968c-1.659-3.17-4.194-4.939-7.884-4.647a11.77,11.77,0,0,0-6.941,3.232,20.59,20.59,0,0,0-5.853,9.364,1.231,1.231,0,0,1-.266.631c-.092-.108-.181-.2-.255-.3a26.031,26.031,0,0,0-2.776-3.27c-2.961-2.963-6.275-5.284-10.6-5.751-4.735-.512-9.088,1.451-11.221,6.027a19.878,19.878,0,0,0-1.66,8.235,28.055,28.055,0,0,0,1.866,10.552,67.213,67.213,0,0,0,13.87,21.828,75.979,75.979,0,0,0,9.527,8.4c.3.229.3.349.086.647-2.28,3.1-4.8,6-7.36,8.864q-6.367,7.121-13.341,13.658a57.079,57.079,0,0,1-7.523,6.043,14.927,14.927,0,0,1-4.143,2.147,3.547,3.547,0,0,1-3.46-.573.83.83,0,0,0-1.31.22,2.028,2.028,0,0,0,.216,2.541,4.418,4.418,0,0,0,2.98,1.165,7.528,7.528,0,0,0,4.335-1.214,44.706,44.706,0,0,0,8.2-5.884,222.26,222.26,0,0,0,23.946-24.665c.5-.616.512-.624,1.151-.147a109.615,109.615,0,0,0,34.478,16.934,1.951,1.951,0,0,0,2.608-1.19A4.241,4.241,0,0,0,259.871,434.859Zm-37.419-20.02c-.193.294-.316.311-.6.1a79.912,79.912,0,0,1-11.5-9.9,62.479,62.479,0,0,1-8.435-11.84,35.844,35.844,0,0,1-3.913-9.39,18.424,18.424,0,0,1-.084-8.937,6.2,6.2,0,0,1,5.813-4.784c3.519-.376,6.47.975,9.15,3.12a23.2,23.2,0,0,1,5.712,6.784,1.478,1.478,0,0,1,.192.907,29.059,29.059,0,0,0,1.7,12.257,5.46,5.46,0,0,0,.631,1.194,1.756,1.756,0,0,0,2.888.219,5.881,5.881,0,0,0,1.408-3.666c.318-3.247-.551-6.3-1.525-9.337a9.231,9.231,0,0,0-.541-1.482,3.012,3.012,0,0,1-.2-2.167c.858-3.911,2.56-7.309,5.891-9.705a7.931,7.931,0,0,1,4.775-1.641,3.969,3.969,0,0,1,3.815,2.5,13.659,13.659,0,0,1,1.124,4.8c.047.655.007,1.316.007,1.975a41.853,41.853,0,0,1-3,14.324,107.2,107.2,0,0,1-9.372,18.672C225.142,410.892,223.777,412.852,222.452,414.839Z"
                                transform="translate(-181.302 -360.232)" fill="#ef8181" />
                        </svg>
        
                        <div class="flex flex-col ml-2">
                            <div class="uppercase text-3xl text-act-pink">Love</div>
                            <div class="uppercase text-3xl text-act-blue -mt-4">Calculator</div>
                        </div>
                    </div>
                </div>
                <h1 class="uppercase text-2xl mt-8">Log in</h1>
                <label class="mt-4" for="username">Dein Benutzername</label>
                <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="username" type="text">
                <label class="mt-4" for="password">Dein Passwort</label>
                <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="password" type="password">
                <div class="flex flex-row">
                    <button id="login"
                        class="mt-4 bg-act-pink text-white rounded-full py-2 px-4 mx-auto outline-none focus:outline-none"> Und
                        los!</button>
                    <button id="register"
                        class="mt-4 bg-act-pink text-white rounded-full py-2 px-4 mx-auto outline-none focus:outline-none">Registrieren</button>
                </div>
            </div>
        </div>`;
        const loginButton = document.getElementById('login');
        loginButton.addEventListener('click', () => {
            const username = getElementValueByElementId('username');
            const password = getElementValueByElementId('password');
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "username": username,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/api/login", requestOptions)
                .then(response => response.text())
                .then(result => {
                    cacheToken(result);
                    localStorage.setItem('username', username);
                    loggedInUser.name = username;
                    render.index();
                })
                .catch(error => console.log('error', error));
        });
        registerClickHandler('register', render.register);
    },
    register: function () {
        content.innerHTML = `<div class="flex h-screen justify-center items-center">
            <div style="box-shadow: 5px 3px 10px grey; min-width: 700px;"
                class="flex flex-col max-w-screen-lg bg-white rounded-lg px-16 pt-12 pb-16">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="78.698" height="93.705" viewBox="0 0 78.698 93.705">
                            <path
                                d="M259.871,434.859a2.972,2.972,0,0,0-2.069-2.294c-4.721-1.537-9.464-3.023-14.054-4.925a103.408,103.408,0,0,1-18.142-10.051c-.435-.292-.423-.464-.133-.847a106.2,106.2,0,0,0,6.9-10.454,93.2,93.2,0,0,0,7.227-14.717c2.348-6.358,3.946-12.834,3.229-19.693a19.1,19.1,0,0,0-1.935-6.968c-1.659-3.17-4.194-4.939-7.884-4.647a11.77,11.77,0,0,0-6.941,3.232,20.59,20.59,0,0,0-5.853,9.364,1.231,1.231,0,0,1-.266.631c-.092-.108-.181-.2-.255-.3a26.031,26.031,0,0,0-2.776-3.27c-2.961-2.963-6.275-5.284-10.6-5.751-4.735-.512-9.088,1.451-11.221,6.027a19.878,19.878,0,0,0-1.66,8.235,28.055,28.055,0,0,0,1.866,10.552,67.213,67.213,0,0,0,13.87,21.828,75.979,75.979,0,0,0,9.527,8.4c.3.229.3.349.086.647-2.28,3.1-4.8,6-7.36,8.864q-6.367,7.121-13.341,13.658a57.079,57.079,0,0,1-7.523,6.043,14.927,14.927,0,0,1-4.143,2.147,3.547,3.547,0,0,1-3.46-.573.83.83,0,0,0-1.31.22,2.028,2.028,0,0,0,.216,2.541,4.418,4.418,0,0,0,2.98,1.165,7.528,7.528,0,0,0,4.335-1.214,44.706,44.706,0,0,0,8.2-5.884,222.26,222.26,0,0,0,23.946-24.665c.5-.616.512-.624,1.151-.147a109.615,109.615,0,0,0,34.478,16.934,1.951,1.951,0,0,0,2.608-1.19A4.241,4.241,0,0,0,259.871,434.859Zm-37.419-20.02c-.193.294-.316.311-.6.1a79.912,79.912,0,0,1-11.5-9.9,62.479,62.479,0,0,1-8.435-11.84,35.844,35.844,0,0,1-3.913-9.39,18.424,18.424,0,0,1-.084-8.937,6.2,6.2,0,0,1,5.813-4.784c3.519-.376,6.47.975,9.15,3.12a23.2,23.2,0,0,1,5.712,6.784,1.478,1.478,0,0,1,.192.907,29.059,29.059,0,0,0,1.7,12.257,5.46,5.46,0,0,0,.631,1.194,1.756,1.756,0,0,0,2.888.219,5.881,5.881,0,0,0,1.408-3.666c.318-3.247-.551-6.3-1.525-9.337a9.231,9.231,0,0,0-.541-1.482,3.012,3.012,0,0,1-.2-2.167c.858-3.911,2.56-7.309,5.891-9.705a7.931,7.931,0,0,1,4.775-1.641,3.969,3.969,0,0,1,3.815,2.5,13.659,13.659,0,0,1,1.124,4.8c.047.655.007,1.316.007,1.975a41.853,41.853,0,0,1-3,14.324,107.2,107.2,0,0,1-9.372,18.672C225.142,410.892,223.777,412.852,222.452,414.839Z"
                                transform="translate(-181.302 -360.232)" fill="#ef8181" />
                        </svg>
        
                        <div class="flex flex-col ml-2">
                            <div class="uppercase text-3xl text-act-pink">Love</div>
                            <div class="uppercase text-3xl text-act-blue -mt-4">Calculator</div>
                        </div>
                    </div>
                    <svg class="ml-0 cursor-pointer" id="No" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                        viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="20" fill="#f7f7f7" />
                        <g transform="translate(-1052 -298)">
                            <path
                                d="M7.778,9.192,1.414,15.557,0,14.142,6.364,7.778,0,1.414,1.414,0,7.778,6.364,14.142,0l1.415,1.414L9.192,7.778l6.364,6.364-1.415,1.415Z"
                                transform="translate(1064 310)" />
                        </g>
                    </svg>
                </div>
                <div id="registerdata" class="flex flex-col">
                    <!-- Here registerDataStepXXX will be placed via JavaScript -->
                </div>
            </div>
        </div>`;
        registerClickHandler('No', render.login);
        const registerdata = document.getElementById('registerdata');
        registerdata.innerHTML = `<h1 class="uppercase text-2xl mt-8">Registriere dich!</h1>
        <label class="mt-4" for="username">Dein Name</label>
        <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="name" type="text">
        <label class="mt-4" for="mail">Deine E-Mail Adresse</label>
        <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="mail" type="email">
        <button id="registerStepOne" class="mt-4 bg-act-pink text-white rounded-full py-2 px-4 mx-auto outline-none focus:outline-none"> Weiter zum
            nächsten Schritt</button>`;
        const nextButton = document.getElementById('registerStepOne');
        nextButton.addEventListener('click', function () {
            const inputIsValid = validateUserInputStepOne();
            if (inputIsValid) {
                registerdata.innerHTML = `<h1 class="uppercase text-2xl mt-8">Gleich geschafft.</h1>
                <label class="mt-4" for="username">Dein Benutzername</label>
                <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="username" type="text">
                <label class="mt-4" for="mail">Dein Passwort</label>
                <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="password" type="password">
                <button id="registerStepTwo" class="mt-4 bg-act-pink text-white rounded-full py-2 px-4 mx-auto outline-none focus:outline-none">
                Und los!</button>`;
                registerClickHandler('registerStepTwo', validateUserInputStepTwo);
            } else {
                alert('Überprüfe die Eingabedaten!');
            }
        });
    },
    account: function () {
        content.innerHTML = renderHeader('account') + renderAccount();
        registerClickHandler('logo', render.index);
        document.getElementById('showmatches').addEventListener('click', () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("api/match", requestOptions)
                .then(response => response.text())
                .then((result) => {
                    matches = JSON.parse(result);
                    matches.forEach((match) => {
                        match.created_at = new Date(match.created_at);
                    });
                    render.matches();
                })
                .catch(error => console.log('error', error));
        });

    }
}

const registerUser = {
    name: null,
    mail: null,
    username: null,
    password: null
};

const matchResult = {
    firstname: null,
    secondname: null,
    result: null,
}

const loggedInUser = {
    name: localStorage.getItem('username')
}

let sortType = 'date';

if (token === null) {
    render.login();
} else {
    render.index();
}

function cacheToken(result) {
    localStorage.setItem('token', result);
    token = result;
}

function getToken() {
    if (token === null) {
        token = localStorage.getItem('token');
    }
    return token;
}

const sorters = {
    result: function () {
        matches.sort((matchA, matchB) => matchB.result - matchA.result);
        render.matches();
    },
    date: function () {
        matches.sort((matchA, matchB) => {
            return matchB.created_at.getTime() - matchA.created_at.getTime()
        });
        render.matches();
    },
    alfa: function () {
        matches.sort((matchA, matchB) => {
            const firstnameA = matchA.firstname.toLowerCase();
            const firstnameB = matchB.firstname.toLowerCase();

            if (firstnameA < firstnameB) {
                return -1;
            } else if (firstnameA > firstnameB) {
                return 1;
            } else {
                return 0;
            }
        });
        render.matches();
    }

};

function renderHeader(site) {

    function renderHoroscopeHeaderEntry(site) {
        let additionalCssClass = '';
        if (site === 'horoscope') {
            additionalCssClass = ' underline'
        }
        return `
        <div class="flex flex-row py-8 ml-32">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                <g id="Gruppe_5" data-name="Gruppe 5" transform="translate(-1076 -74)">
                    <circle cx="22" cy="22" r="22" transform="translate(1076 74)" fill="#7dcaf4" />
                    <circle cx="9" cy="9" r="9" transform="translate(1098 81)" fill="#fff" />
                    <circle cx="3" cy="3" r="3" transform="translate(1092 81)" fill="#fff" />
                </g>
            </svg>
            <div class="text-2xl pt-1 ml-4 uppercase${additionalCssClass}">Dein Horoskop</div>
        </div>
        `;
    }

    function renderMatchHeaderEntry(site) {
        let additionalCssClass = '';
        if (site === 'matches') {
            additionalCssClass = ' underline'
        }
        return `
        <div id="showmatches" class="flex flex-row py-8 ml-32 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="38.128" height="38.626" viewBox="0 0 38.128 38.626">
                <g transform="translate(-540 -58.86)">
                    <rect width="16.687" height="16.687" rx="2" transform="translate(561.441 58.86)" fill="#ef8181" />
                    <rect width="16.687" height="16.687" rx="2" transform="translate(540 58.86)" fill="#ef8181" />
                    <rect width="16.687" height="16.687" rx="2" transform="translate(540 80.799)" fill="#ef8181" />
                    <rect width="16.687" height="16.687" rx="2" transform="translate(561.441 80.799)" fill="#ef8181" />
                </g>
            </svg>
            <div class="text-2xl pt-1 ml-4 uppercase${additionalCssClass}">Deine Paarungen</div>
        </div>
        `;
    }

    function renderAccountHeaderEntry() {
        return `
        <div class="mt-4">
            <svg id="account" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="266" height="61" viewBox="0 0 266 61">
                <g transform="translate(-1432 -72)">
                    <g transform="translate(1432 72)" fill="#fff" stroke="#f7f7f7" stroke-width="5">
                        <rect width="266" height="61" rx="30.5" stroke="none" />
                        <rect x="2.5" y="2.5" width="261" height="56" rx="28" fill="none" />
                    </g>
                    <text transform="translate(1521 114)" font-size="32" font-family="SegoeUI, Segoe UI">
                        <tspan x="0" y="0">${loggedInUser.name.toUpperCase()}</tspan>
                    </text>
                    <g transform="translate(1467 86.542)">
                        <path
                            d="M0,30V26.25c0-4.126,6.75-7.5,15-7.5s15,3.375,15,7.5V30ZM7.5,7.5A7.5,7.5,0,1,1,15,15,7.5,7.5,0,0,1,7.5,7.5Z"
                            transform="translate(0 0.458)" />
                    </g>
                </g>
            </svg>
        </div>`;
    }

    return `
    <div class="flex flex-row bg-white pt-4 pl-8 justify-evenly">
        <div id="logo" class="flex flex-row cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="78.698" height="93.705" viewBox="0 0 78.698 93.705">
                <path
                    d="M259.871,434.859a2.972,2.972,0,0,0-2.069-2.294c-4.721-1.537-9.464-3.023-14.054-4.925a103.408,103.408,0,0,1-18.142-10.051c-.435-.292-.423-.464-.133-.847a106.2,106.2,0,0,0,6.9-10.454,93.2,93.2,0,0,0,7.227-14.717c2.348-6.358,3.946-12.834,3.229-19.693a19.1,19.1,0,0,0-1.935-6.968c-1.659-3.17-4.194-4.939-7.884-4.647a11.77,11.77,0,0,0-6.941,3.232,20.59,20.59,0,0,0-5.853,9.364,1.231,1.231,0,0,1-.266.631c-.092-.108-.181-.2-.255-.3a26.031,26.031,0,0,0-2.776-3.27c-2.961-2.963-6.275-5.284-10.6-5.751-4.735-.512-9.088,1.451-11.221,6.027a19.878,19.878,0,0,0-1.66,8.235,28.055,28.055,0,0,0,1.866,10.552,67.213,67.213,0,0,0,13.87,21.828,75.979,75.979,0,0,0,9.527,8.4c.3.229.3.349.086.647-2.28,3.1-4.8,6-7.36,8.864q-6.367,7.121-13.341,13.658a57.079,57.079,0,0,1-7.523,6.043,14.927,14.927,0,0,1-4.143,2.147,3.547,3.547,0,0,1-3.46-.573.83.83,0,0,0-1.31.22,2.028,2.028,0,0,0,.216,2.541,4.418,4.418,0,0,0,2.98,1.165,7.528,7.528,0,0,0,4.335-1.214,44.706,44.706,0,0,0,8.2-5.884,222.26,222.26,0,0,0,23.946-24.665c.5-.616.512-.624,1.151-.147a109.615,109.615,0,0,0,34.478,16.934,1.951,1.951,0,0,0,2.608-1.19A4.241,4.241,0,0,0,259.871,434.859Zm-37.419-20.02c-.193.294-.316.311-.6.1a79.912,79.912,0,0,1-11.5-9.9,62.479,62.479,0,0,1-8.435-11.84,35.844,35.844,0,0,1-3.913-9.39,18.424,18.424,0,0,1-.084-8.937,6.2,6.2,0,0,1,5.813-4.784c3.519-.376,6.47.975,9.15,3.12a23.2,23.2,0,0,1,5.712,6.784,1.478,1.478,0,0,1,.192.907,29.059,29.059,0,0,0,1.7,12.257,5.46,5.46,0,0,0,.631,1.194,1.756,1.756,0,0,0,2.888.219,5.881,5.881,0,0,0,1.408-3.666c.318-3.247-.551-6.3-1.525-9.337a9.231,9.231,0,0,0-.541-1.482,3.012,3.012,0,0,1-.2-2.167c.858-3.911,2.56-7.309,5.891-9.705a7.931,7.931,0,0,1,4.775-1.641,3.969,3.969,0,0,1,3.815,2.5,13.659,13.659,0,0,1,1.124,4.8c.047.655.007,1.316.007,1.975a41.853,41.853,0,0,1-3,14.324,107.2,107.2,0,0,1-9.372,18.672C225.142,410.892,223.777,412.852,222.452,414.839Z"
                    transform="translate(-181.302 -360.232)" fill="#ef8181" />
            </svg>
            <div class="flex flex-col">
                <div class="uppercase text-3xl text-act-pink">Love</div>
                <div class="uppercase text-3xl text-act-blue -mt-4">Calculator</div>
            </div>
        </div>
        ${renderMatchHeaderEntry(site)}
        ${renderHoroscopeHeaderEntry(site)}
        ${renderAccountHeaderEntry(loggedInUser.name)}
    </div>`
}

function renderMatch() {
    return `
    <div class="flex pt-16 justify-center items-center">
        <div style="box-shadow: 5px 3px 10px grey; min-width: 700px;"
            class="flex flex-col max-w-screen-lg bg-white rounded-lg px-16 pt-12 pb-16">
            <div class="flex flex-row items-center">
                <div class="flex flex-col m-1">
                    <h1 class="uppercase text-2xl">Dein Name</h1>
                    <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="firstname" type="text">
                </div>
                <div id="result" class="flex flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" width="78.698" height="93.705" viewBox="0 0 78.698 93.705">
                        <path id="Pfad_7" data-name="Pfad 7"
                            d="M259.871,434.859a2.972,2.972,0,0,0-2.069-2.294c-4.721-1.537-9.464-3.023-14.054-4.925a103.408,103.408,0,0,1-18.142-10.051c-.435-.292-.423-.464-.133-.847a106.2,106.2,0,0,0,6.9-10.454,93.2,93.2,0,0,0,7.227-14.717c2.348-6.358,3.946-12.834,3.229-19.693a19.1,19.1,0,0,0-1.935-6.968c-1.659-3.17-4.194-4.939-7.884-4.647a11.77,11.77,0,0,0-6.941,3.232,20.59,20.59,0,0,0-5.853,9.364,1.231,1.231,0,0,1-.266.631c-.092-.108-.181-.2-.255-.3a26.031,26.031,0,0,0-2.776-3.27c-2.961-2.963-6.275-5.284-10.6-5.751-4.735-.512-9.088,1.451-11.221,6.027a19.878,19.878,0,0,0-1.66,8.235,28.055,28.055,0,0,0,1.866,10.552,67.213,67.213,0,0,0,13.87,21.828,75.979,75.979,0,0,0,9.527,8.4c.3.229.3.349.086.647-2.28,3.1-4.8,6-7.36,8.864q-6.367,7.121-13.341,13.658a57.079,57.079,0,0,1-7.523,6.043,14.927,14.927,0,0,1-4.143,2.147,3.547,3.547,0,0,1-3.46-.573.83.83,0,0,0-1.31.22,2.028,2.028,0,0,0,.216,2.541,4.418,4.418,0,0,0,2.98,1.165,7.528,7.528,0,0,0,4.335-1.214,44.706,44.706,0,0,0,8.2-5.884,222.26,222.26,0,0,0,23.946-24.665c.5-.616.512-.624,1.151-.147a109.615,109.615,0,0,0,34.478,16.934,1.951,1.951,0,0,0,2.608-1.19A4.241,4.241,0,0,0,259.871,434.859Zm-37.419-20.02c-.193.294-.316.311-.6.1a79.912,79.912,0,0,1-11.5-9.9,62.479,62.479,0,0,1-8.435-11.84,35.844,35.844,0,0,1-3.913-9.39,18.424,18.424,0,0,1-.084-8.937,6.2,6.2,0,0,1,5.813-4.784c3.519-.376,6.47.975,9.15,3.12a23.2,23.2,0,0,1,5.712,6.784,1.478,1.478,0,0,1,.192.907,29.059,29.059,0,0,0,1.7,12.257,5.46,5.46,0,0,0,.631,1.194,1.756,1.756,0,0,0,2.888.219,5.881,5.881,0,0,0,1.408-3.666c.318-3.247-.551-6.3-1.525-9.337a9.231,9.231,0,0,0-.541-1.482,3.012,3.012,0,0,1-.2-2.167c.858-3.911,2.56-7.309,5.891-9.705a7.931,7.931,0,0,1,4.775-1.641,3.969,3.969,0,0,1,3.815,2.5,13.659,13.659,0,0,1,1.124,4.8c.047.655.007,1.316.007,1.975a41.853,41.853,0,0,1-3,14.324,107.2,107.2,0,0,1-9.372,18.672C225.142,410.892,223.777,412.852,222.452,414.839Z"
                            transform="translate(-181.302 -360.232)" fill="#ef8181" />
                    </svg>
                </div>
                <div class="flex flex-col m-1">
                    <h1 class="uppercase text-2xl">Dein Schwarm</h1>
                    <input class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" id="secondname" type="text">
                </div>
            </div>
            <div class="flex flex-row">
                <button id="matchbutton"
                    class="mt-4 bg-act-pink text-white rounded-full py-2 px-4 mx-auto outline-none focus:outline-none">
                    Let's match!</button>
            </div>
        </div>
    </div>`
}

function renderMatches() {
    if (matches.length === 0) {
        return '';
    } else {
        let renderedRows = '';
        matches.forEach(element => {
            renderedRows += renderMatchRow(element);
        });
        return `
        <div class="flex pt-16 justify-center items-center">
            <div style="box-shadow: 5px 3px 10px grey;"
                class="block max-w-screen-lg bg-white rounded-lg px-16 pt-12 pb-16 w-full mx-4 lg:mx-0">
                <button 
            id="filter"
            class="border-act-grey border-4 focus:outline-none uppercase float-right text-act-blue bg-white rounded-full py-2 px-8 outline-none active:outline-none hover:outline-none text-xl">
            sortieren
        </button>       
                <table class="table-fixed mt-16">
                    <thead>
                        <tr>
                            <th class="w-1/3 uppercase px-4 py-2 text-3xl">Dein Name</th>
                            <th class="w-1/3 uppercase px-4 py-2 text-3xl">Dein Schwarm</th>
                            <th class="w-1/3 uppercase px-4 py-2 text-3xl">Euer Match</th>
                        </tr>
                    </thead>
                    <tbody id="tablebody">
                        ${renderedRows}
                    </tbody>
                </table>
            </div>
        </div>`;
    }
}

function renderMatchRow(row) {
    const color = row.result > 50 ? 'text-act-pink' : 'text-act-blue';
    return `
    <tr class="even:bg-white odd:bg-act-grey">
        <td class="text-center rounded-l-lg px-4 py-2">${row.firstname}</td>
        <td class="text-center px-4 py-2">${row.secondname}</td>
        <td class="text-center rounded-r-lg px-4 py-2 ${color}">${row.result}</td>
    </tr>`
}

function renderModal() {
    return `
    <div id="myModal" class="Modal is-hidden is-visuallyHidden">
      <!-- Modal content -->
      <div class="p-5 pl-10 m-auto bg-white w-1/4 max-w-screen-lg rounded-3xl">
        <svg class="float-right cursor-pointer" id="closeModal" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#f7f7f7"></circle>
            <g transform="translate(-1052 -298)">
                <path d="M7.778,9.192,1.414,15.557,0,14.142,6.364,7.778,0,1.414,1.414,0,7.778,6.364,14.142,0l1.415,1.414L9.192,7.778l6.364,6.364-1.415,1.415Z" transform="translate(1064 310)"></path>
            </g>
        </svg>
        <div class="uppercase text-3xl mt-4 text-left">
            sortieren
        </div>
        <div class="flex flex-col items-center">
            <button id="alfa"
                class="bg-act-grey text-left my-4 text-xl w-full max-w-xs rounded-full py-2 px-8 outline-none active:outline-none hover:outline-none focus:outline-none">
                Alphabetisch
            </button>
            <button id="points"
                class="bg-act-grey text-left my-4 text-xl w-full max-w-xs rounded-full py-2 px-8 outline-none active:outline-none hover:outline-none focus:outline-none">
                Matchpoints
            </button>
            <button id="date"
                class="bg-act-grey text-left my-4 text-xl w-full max-w-xs rounded-full py-2 px-8 outline-none active:outline-none hover:outline-none focus:outline-none">
                Neuste Zuerst
            </button>
            <button id="sort"
                class="mt-4 bg-act-pink text-white text-xl max-w-xs w-40 rounded-full py-2 mx-auto outline-none focus:outline-none uppercase">
                OK
            </button>
        </div>
      </div>
    </div>`
}

function renderAccount() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: null,
        redirect: 'follow'
    };


    fetch("/api/user", requestOptions)
        .then(response => response.text())
        .then((userdata) => {
            const parsedUserData = JSON.parse(userdata)[0];
            loggedInUser.name = parsedUserData.username;
            loggedInUser.mail = parsedUserData.mail;
            content.removeChild(content.lastChild);
            const node = document.createElement('div');
            node.innerHTML = renderAccountPage(loggedInUser);
            content.appendChild(node);
            registerClickHandler('logoutButton', logoutUser)
        });
}

function calculateMatch(firstName, secondName) {
    let value = 0;
    for (let index = 0; index < firstName.length; index++) {
        value += firstName.charCodeAt(index)
    }
    for (let index = 0; index < secondName.length; index++) {
        value += secondName.charCodeAt(index)
    }
    const res = value % 100;

    matchResult.firstname = firstName;
    matchResult.secondname = secondName;
    matchResult.result = res;

    const obj = document.getElementById('result');
    obj.innerHTML = '';
    animateValue(obj, 99, res, 1000);
}

function renderAccountPage(loggedInUser) {
    return `
    <div class="mt-10 p-5 pl-10 m-auto bg-white w-3/4 max-w-screen-lg rounded-3xl">
        <svg class="float-right cursor-pointer" id="closeModal" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#f7f7f7"></circle>
            <g transform="translate(-1052 -298)">
                <path d="M7.778,9.192,1.414,15.557,0,14.142,6.364,7.778,0,1.414,1.414,0,7.778,6.364,14.142,0l1.415,1.414L9.192,7.778l6.364,6.364-1.415,1.415Z" transform="translate(1064 310)"></path>
            </g>
        </svg>
        
        <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="317" height="317" viewBox="0 0 317 317">
                <circle id="Ellipse_115" data-name="Ellipse 115" cx="158.5" cy="158.5" r="158.5" fill="#7dcaf4"/>
            </svg>
            <div class="flex flex-row justify-between w-3/4">
                <div class="flex flex-col m-1">
                    <h1 class="text-xl">Deine E-Mail Adresse</h1>
                    <input disabled class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" type="text" value="${loggedInUser.mail}">
                </div>
                <div class="flex flex-col m-1">
                    <h1 class="text-xl">Dein Name</h1>
                    <input disabled class="mt-3 pl-4 bg-act-grey rounded-full outline-none text-2xl" type="text" value="${loggedInUser.name}">
                </div>
            </div>
            <div class="flex flex-row justify-between w-3/4">
                <div class="flex flex-col m-1">
                    <button id="logoutButton" style="width: 250px;" id="logout" class="mt-4 bg-act-pink text-white rounded-full py-2 px-4 mx-auto outline-none focus:outline-none">
                        Ausloggen
                    </button>
                </div>
                <div class="flex flex-col m-1">
                    <button style="width: 250px;" id="reset" class="mt-4 bg-act-blue text-white rounded-full py-2 px-4 mx-auto outline-none focus:outline-none">
                        Zurücksetzen
                    </button>
                </div>
            </div>
        </div>
      </div>`;

}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentresult = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `<div class="pt-10 text-5xl ${currentresult > 50 ? 'text-act-pink' : 'text-act-blue'}"> ${currentresult} % </div>`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function validateUserInputStepOne() {
    const name = getElementValueByElementId('name');
    const mail = getElementValueByElementId('mail');
    if (isValidUsername(name) && isValidMail(mail)) {
        registerUser.name = name;
        registerUser.mail = mail;
        return true;
    } else {
        return false;
    }
}

function validateUserInputStepTwo() {
    const username = getElementValueByElementId('username');
    const password = getElementValueByElementId('password');
    if (isValidUsername(username) && isValidPassword(password)) {
        registerUser.username = username;
        registerUser.password = password;
        sendRegistrationData().then((test) => {
            render.login();
        }).catch((test) => {
            return false;
        });
    } else {
        return false;
    }
}

function sendRegistrationData() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(registerUser);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return fetch("/api/register", requestOptions);
}

// Refactored Helper Functions

function isValidUsername(username) {
    if (username != undefined && username != null && username != '' && username.length >= 3) {
        return true;
    } else {
        return false;
    }
}

function isValidPassword(password) {
    if (password != undefined && password != null && password != '' && password.length >= 8) {
        return true;
    } else {
        return false;
    }
}

function isValidMail(mail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
}

function logoutUser() {
    deleteLocalStorage();
    reloadPage();
}

function deleteLocalStorage() {
    localStorage.clear();
}

function reloadPage() {
    location.href = '/';
}

function registerClickHandler(id, handlerFunction) {
    document.getElementById(id).addEventListener('click', handlerFunction);
}

function getElementValueByElementId(elementId) {
    return document.getElementById(elementId).value;
}