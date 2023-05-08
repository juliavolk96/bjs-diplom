"use strict" //подключаем строгий режим

class UserForm { //создаем класс UserForm
  constructor() {
    this.loginForm = document.getElementById('login');
    this.registerForm = document.getElementById('register');

    this.loginErrorMessageBox = document.querySelector(".ui.message.negative");
    this.registerErrorMessageBox = document.querySelector(".ui.message.negative");

    //привязка контекста
    this.loginFormCallback = this.loginFormCallback.bind(this);
    this.registerFormCallback = this.registerFormCallback.bind(this);

    //вызов слушателей событий
    this.addLoginFormListener();
    this.addRegisterFormListener();
  }

  
}

