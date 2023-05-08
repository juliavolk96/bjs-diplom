"use strict"
const { response } = require("express");

 //подключаем строгий режим

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

  //слушатель события submit
  addLoginFormListener() {
    this.loginForm.addEventListener("submit",(event) => {
      event.preventDefault();

      //значения логина и пароля в коллекции 
      let email = this.loginForm.elements.email.value;
      let password = this.loginForm.elements.password.value;

      //объявление объекта data, который содержит значения логина и пароля
      let data = {
        login: email,
        password: password,
      };
      //передача объекта data внутрь loginFormAction
      this.loginFormAction(data)
    });
  }

  addRegisterFormListener() {
    this.registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let email = this.registerForm.elements.email.value;
      let password = this.registerForm.elements.email.value;

      let data = {
        login: email,
        password: password,
      };

      this.registerFormAction(data)
    });
  }

  registerFormAction(data) {
    //вызов ApiConnector
    ApiConnector.register(data, (response) => {
      console.log(response);

      if(response.success) {
        alert("Регистрация прошла успешно");
        location.reload();
      } else {
        let errorMessage =
        response.error || "Произошла ошибка регистрации"; 

        this.setRegisterErrorMessage(errorMessage);
      }
    });
  }

  setLoginErrorMessage(message) {
    this.loginErrorMessageBox.textContent = message;
  }

  setRegisterErrorMessage(message) {
    this.registerErrorMessageBox.textContent = message;
  }

  getData(form) {
    let data = {};
    let elements = form.elements;

    for(let i = 0; i < elements.length; i++) {
      let element = element[i];
      if(element.type !== "submit") {
        data[elements.name] = element.value;
      }
    }

    return data;
  }


  
}

