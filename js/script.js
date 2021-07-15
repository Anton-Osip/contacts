class User { //для каждого отдельного контакта.
    constructor(id, name, email, address, phone) {
        //хранения данных о контакте
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;

        this.get()
    }

    get() {
        /*– для получения данных о контакте.Метод возвращать объект с данными из св - ва data.
        При создании объекта на основе этого класса важно передать в конструктор данные о контакте в виде объекта для дальнейшего сохранения в св - во data.*/
        const user = {
            id: this.id,
            name: this.name,
            email: this.email,
            address: this.address,
            phone: this.phone,
        }
        return user;
    }
}


class Contacts { //будущего приложения «Контакты»
    constructor() {
        this.data = JSON.parse(localStorage.getItem('users')) || []; //получаю юзеров с ЛокалСториж
    }

    addUser(event) { /*для создания контакта(на основе класса« User») и добавления его в массив data.*/

        event.preventDefault(); //отменяем перезагрузку страницы

        const id = this.data.length + 1 //добовлеям данные с инпутов
        const name = event.target[0].value; //добовлеям данные с инпутов
        const email = event.target[1].value; //добовлеям данные с инпутов
        const address = event.target[2].value; //добовлеям данные с инпутов
        const phone = event.target[3].value; //добовлеям данные с инпутов

        document.querySelector('.form__container').remove();

        let newUser = new User(id, name, email, address, phone); //создаем нового юзера с полученными данными

        this.data.push(newUser); //пушим нового юзера в массив контактов

        this.get()
    }

    editContact(event) {

        const target = event.target; //получаю элемент на которм был совершен клик
        const elem = target.closest('.card'); //получаю карточку на котором был клик
        const emailUser = elem.querySelector('.email__user').innerHTML; //получил значения почты
        const obj = this.data.find((item) => { return item.email === emailUser }) //находим юзера в массиве со всеми контактами
        const index = this.data.indexOf(obj) //получаю индекс элемента который нужно удалить


        const form = document.createElement('div'); //создаем тег form

        form.classList.add('form__container'); //Добовляем класс

        form.innerHTML = `<form class="form-user">
                            <input type="name" class="user__input" placeholder="Имя" value = '${obj.name}'>
                            <input type="email" class="user__input" placeholder="Почта" value = '${obj.email}'>
                            <input type="phone" class="user__input" placeholder="Телефон"value = '${obj.phone}'>
                            <button class = 'user__btn'>Изменить данные</button>
                        </form>`; //заполняем контентом

        document.body.appendChild(form); //Вставляем форму в ДОМ

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            this.data[index].name = event.target[0].value; //добовлеям данные с инпутов
            this.data[index].email = event.target[1].value; //добовлеям данные с инпутов
            this.data[index].phone = event.target[2].value;
            form.remove();
            this.createUserCards()
        });

    }

    removeContact(event) {
        /* для удаления контакта из общего массива данных по идентификатору.В качестве параметра нужно передать идентификатор контакта.*/
        const target = event.target; //получаю элемент на которм был совершен клик
        const elem = target.closest('.card'); //получаю карточку на котором был клик
        const emailUser = elem.querySelector('.email__user').innerHTML; //получил значения почты
        const obj = this.data.find((item) => { return item.email === emailUser }) //находим юзера в массиве со всеми контактами
        const index = this.data.indexOf(obj) //получаю индекс элемента который нужно удалить
        this.data.splice(index, 1); //удаляю его из массива
        this.createUserCards() //перерисовываю карточки юзеров
        this.get() //перезаписываю локалсторидж
    }

    get() {
        /*– для получения всех контактов.Метод должен возвращать объект с данными из св - ва data.*/
        // localStorage.clear('users')
        const usersJson = JSON.stringify(this.data); //преобразовал в JSON формат
        localStorage.setItem('users', usersJson); //закинул в локал сторидж
        this.createUserCards()
        return this.data;
    }

    async getUsers() { //получаем пользователей с сервера
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const result = await response.json();
            for (let elem of result) {
                this.data.push(elem)
            }
            this.get();
        } catch {
            console.log(error);
        }
    }
}

class ContactsApp extends Contacts {
    constructor() {
        super()
    }
    showLoader() {
        const mainBody = document.querySelector('.main__body'); //находим mainBody
        mainBody.innerHTML = `  <div id="cube-loader">
                                    <div class="caption">
                                        <div class="cube-loader">
                                            <div class="cube loader-1"></div>
                                            <div class="cube loader-2"></div>
                                            <div class="cube loader-4"></div>
                                            <div class="cube loader-3"></div>
                                        </div>
                                    </div>
                                </div>`;
    }

    showContact(event) { //Модальное окно где показываеться контакт

        const target = event.target; //получаю элемент на которм был совершен клик
        const elem = target.closest('.card'); //получаю карточку на котором был клик
        const emailUser = elem.querySelector('.email__user').innerHTML; //получил значения почты
        const obj = this.data.find((item) => { return item.email === emailUser }) //находим юзера в массиве со всеми контактами

        const modalWindowUser = document.createElement('div'); //создаю модальное окно
        modalWindowUser.classList.add('show__user'); //добовляю модальному окну класс
        modalWindowUser.innerHTML = `<div class = 'user__block'>
                                        <img src='./img/man.png' alt="user" class="img">
                                        <p class="name">${obj.name}</p>
                                        <a href = 'tel:${obj.phone}' class="phone">${obj.phone}</a>
                                        <a href = 'mailto:${obj.email}' class="email">${obj.email}</a>
                                        <button class="close">&#10008</button>
                                    </div>` //добовляю контент;
        modalWindowUser.querySelector('.close').addEventListener('click', () => {
            modalWindowUser.remove();
        })
        document.body.appendChild(modalWindowUser); //Вставляем модальное окно в ДОМ

    }

    createUserCards() { //создаем карточки пользователей
        const mainBody = document.querySelector('.main__body'); //находим mainBody
        mainBody.innerHTML = ''; //отчищаем от контента mainBody
        for (let i = 0; i < this.data.length; i++) { // перебираем массив с юзерами и создаем для каждого свою карточку
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `  <span class="number__user">${i+1}</span>
                                <p class="name__user">${this.data[i].name}</p>
                                <a href = 'tel:${this.data[i].phone}' class="phone__user">${this.data[i].phone}</a>
                                <a href = 'mailto:${this.data[i].email}' class="email__user">${this.data[i].email}</a>
                                <button class="show"></button>
                                <button class="remove">&#10008</button>
                                <button class="edit">&#9998;</button>`
            mainBody.appendChild(card);
            card.querySelector('.show').addEventListener('click', this.showContact.bind(this)) //вешакм прослушиватель на кнопки
            card.querySelector('.remove').addEventListener('click', this.removeContact.bind(this))
            card.querySelector('.edit').addEventListener('click', this.editContact.bind(this))
        }

    }

    modalWindowNewUser() {
        const form = document.createElement('div'); //создаем тег form

        form.classList.add('form__container'); //Добовляем класс

        form.innerHTML = `<form class="form-user">
                            <input type="name" class="user__input" placeholder="Имя" value = 'Anton'>
                            <input type="email" class="user__input" placeholder="Почта" value = 'Anton@mail.com'>
                            <input type="text" class="user__input" placeholder="Адресс"value = 'г. Минск'>
                            <input type="phone" class="user__input" placeholder="Телефон"value = '+375 44 777-77-77'>
                            <button class = 'user__btn'>Создать контакт</button>
                        </form>`; //заполняем контентом

        document.body.appendChild(form); //Вставляем форму в ДОМ

        form.addEventListener('submit', this.addUser.bind(this));
    }

    searchContacts(event){
        event.preventDefault();
        let searchValue = event.currentTarget.value.toLowerCase();
        const users =JSON.parse(localStorage.getItem('users'));
        const usersSearch=[];

        users.find(item=>{
            if(item.name.toLowerCase().includes(searchValue)){
                usersSearch.push(item)}
        })
    
        const mainBody = document.querySelector('.main__body'); //находим mainBody
        mainBody.innerHTML = ''; //отчищаем от контента mainBody
        for (let i = 0; i < usersSearch.length; i++) { // перебираем массив с юзерами и создаем для каждого свою карточку
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `  <span class="number__user">${i+1}</span>
                                <p class="name__user">${usersSearch[i].name}</p>
                                <a href = 'tel:${usersSearch[i].phone}' class="phone__user">${usersSearch[i].phone}</a>
                                <a href = 'mailto:${usersSearch[i].email}' class="email__user">${usersSearch[i].email}</a>
                                <button class="show"></button>
                                <button class="remove">&#10008</button>
                                <button class="edit">&#9998;</button>`
            mainBody.appendChild(card);
            card.querySelector('.show').addEventListener('click', this.showContact.bind(this)) //вешакм прослушиватель на кнопки
            card.querySelector('.remove').addEventListener('click', this.removeContact.bind(this))
            card.querySelector('.edit').addEventListener('click', this.editContact.bind(this))
        }
    }

    createStructure() { //Создаем структуру сайта и отрисовываем ее
        const app = document.createElement('div'); //Создаем главный div

        app.classList.add('app'); //Добовляем класс app

        app.innerHTML = `<header class="header">
                            <div class="container">
                                <h1 class="header__title">Контакты</h1>
                            </div>
                        </header>
                        <main class="main">
                            <header class="main__header">
                                <div class="container">
                                    <form action="#" class = "submit__search">
                                        <input class="contacts__search" type="text" placeholder="Поиск контакта">
                                    </form>
                                </div>
                            </header>
                            <div class="container">
                                <div class="main__body">
                                </div>
                            </div>
                            <button class='creat-newUser'>+</button>
                        </main>`; //Добовляем содержимое

        document.body.appendChild(app); //Добовляем в ДОМ
        document.querySelector('.creat-newUser').addEventListener('click', this.modalWindowNewUser.bind(this)) //Вызываем модальное окно для содания нового юзера
        document.querySelector('.contacts__search').addEventListener('input',this.searchContacts.bind(this))
        
    }

    init() { /* Запускаем приложение*/
        this.createStructure();

        if (this.data.length === 0) {
            this.getUsers()
        }
        this.showLoader();
        setTimeout(this.createUserCards.bind(this), 5000)
    }
}

const contacts = new ContactsApp();
contacts.init()