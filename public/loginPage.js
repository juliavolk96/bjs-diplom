"use strict"
//Определяем класс UserForm
class UserForm {
  constructor() {
    this.loginForm = document.getElementById('login');
    this.registerForm = document.getElementById('register');

    this.loginErrorMessageBox = this.loginForm.querySelector('.message.negative');
    this.registerErrorMessageBox = this.registerForm.querySelector('.message.negative');

    this.loginFormAction = this.loginFormAction.bind(this);
    this.registerFormAction = this.registerFormAction.bind(this);

    this.loginForm.addEventListener('submit', this.loginFormAction);
    this.registerForm.addEventListener('submit', this.registerFormAction);
  }

  setLoginErrorMessage(message) {
    this.loginErrorMessageBox.textContent = message;
  }

  setRegisterErrorMessage(message) {
    this.registerErrorMessageBox.textContent = message;
  }

  loginFormAction(event) {
    event.preventDefault(); 

    const data = this.getData(this.loginForm); 

    this.loginFormCallback = (data) => {
      ApiConnector.login(data, (response) => {
        if (response.success) {
          location.reload(); 
        } else {
          this.setLoginErrorMessage(response.error); 
        }
      });
    };

    
    this.loginFormCallback(data);
  }

  registerFormAction(event) {
    event.preventDefault(); 

    const data = this.getData(this.registerForm); 

    this.registerFormCallback = (data) => {
      ApiConnector.register(data, (response) => {
        if (response.success) {
          location.reload(); 
        } else {
          this.setRegisterErrorMessage(response.error); 
        }
      });
    };

    this.registerFormCallback(data);
  }

  getData(form) {
    const formData = new FormData(form);
    const data = {};

    for (let [name, value] of formData.entries()) {
      data[name] = value;
    }

    return data;
  }
}

const userForm = new UserForm();