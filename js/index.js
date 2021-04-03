// class User {
//     constructor(id, name, email, address, phone) {
//         this.id = id;
//         this.name = name;
//         this.email = email;
//         this.address = address;
//         this.phone = phone;
//     }
//     edit(newId, newName, newEmail, newAddress, newPhone) {
//         this.id = newId;
//         this.name = newName;
//         this.email = newEmail;
//         this.address = newAddress;
//         this.phone = newPhone;
//     }

//     get() {
//         return {
//             id: this.id,
//             name: this.name,
//             email: this.email,
//             address: this.address,
//             phone: this.phone,
//         }
//     }
// }

// class Contacts {
//     constructor() {
//         this.data = [];
//     }
//     addUser(event) {
//         event.preventDefault();
//         debugger;
//         // this.data(new User(id, name, email, address, phone))
//     }
// }




// class ContactsApp extends Contacts {
//     constructor() {
//         super()
//     }

//     modalWindowNewUser() {
//         const form = document.createElement('form'); //создаем тег form
//         form.classList.add('form-user'); //Добовляем сласс

//         form.innerHTML = `  <form class="form-user">
//                                 <input type="text" class="user__input" placeholder="ID">
//                                 <input type="text" class="user__input" placeholder="name">
//                                 <input type="text" class="user__input" placeholder="email">
//                                 <input type="text" class="user__input" placeholder="addres">
//                                 <input type="text" class="user__input" placeholder="phone">
//                                 <button class = 'user__btn'>Создать контакт</button
//                             </form>`; //заполняем контентом

//         document.body.appendChild(form); //Вставляем форму в ДОМ

//         form.addEventListener('submit', this.addUser);
//         debugger

//     }

//     createUser() {
//         const creatNewUser = document.createElement('button'); //Создаем кнопку

//         creatNewUser.innerHTML = '+'; //Добовляем содержимое кнопке

//         creatNewUser.classList.add('creat-user-btn'); //Добовляем класс кнопке

//         document.body.appendChild(creatNewUser); //Добовляем в ДОМ кнопку

//         creatNewUser.addEventListener('click', this.modalWindowNewUser.bind(this)); //Вешаем на кнопку оброботчик события по клику и вызываем функцию отрисовки модального окна
//     }

//     init() {
//         this.createUser();
//     }
// }


// const ContactsBook = new ContactsApp();
// ContactsBook.init()


/*1. Создайте класс с именем «Contacts» для будущего приложения «Контакты», и

создайте класс с именем «User» для каждого отдельного контакта.
2. В классе «User» реализуйте сл. свойства и методы:
1. Свойство data – для хранения данных о контакте в виде простого объекта со сл. полями: id,
name, email, address, phone.
2. Метод edit(obj) – для редактирования данных контакта. В качестве параметра метод должен
принимать объект с обновленными данными и обновлять свойство data.
3. Метод get() – для получения данных о контакте. Метод должен возвращать объект с данными
из св-ва data.
4. При создании объекта на основе этого класса важно передать в конструктор данные о контакте
в виде объекта для дальнейшего сохранения в св-во data.
3. В классе «Contacts» реализуйте сл. св-ва и методы:
1. Свойство data – для хранения всех добавленных контактов в массиве. Каждый эл-т массива
должен представлять собой объект созданный на основе класса «User».
2. Метод add() – для создания контакта (на основе класса «User») и добавления его в массив data.
3. Метод edit(id, obj) – для редактирования информации конкретного контакты из св-ва data,
используя соответствующий метод из «User». В качестве параметра нужно передать
идентификатор контакта для последующего поиска и объект с новыми данными для
редактирования.
4. Метод remove(id) – для удаления контакта из общего массива данных по идентификатору. В
качестве параметра нужно передать идентификатор контакта.
5. Метод get() – для получения всех контактов. Метод должен возвращать объект с данными из
св-ва data.
4. Создайте еще один класс «ContactsApp» для создания интерфейса и показа
его в браузере. Класс должен наследоваться от «Contacts».
5. В классе «ContactsApp» реализуйте сл. св-ва и методы:
1. При создании объекта на основе этого класса в DOM должен добавляться главный контейнер
приложения, например, «<div class=”contacts”></div>». Доступ к контейнеру должен быть
через свойство «app» (должен хранить созданный элемент).
2. Также, в конструкторе или через любой метод в классе полностью создайте интерфейс вашего
приложения внутри главного контейнера. Предусмотрите форму с полями и кнопками для
добавления и редактирования контактов. Дизайн может быть любым, но адаптивным к
мобильным устройствам.
3. Методы onAdd(), onEdit() и onRemove() – должны срабатывать по клику по соотв. кнопкам в
интерфейсе для добавления/редактирования/удаления контакта. Важно использование
методов от «Contacts» при соотв. действиях.
4. Метод get() - для получения и обновления списка контактов в соотв. контейнере вашего
приложения. Важно сохранить возможности родительского метода.
Вы можете добавлять любые другие свойства и методы во все классы.*/