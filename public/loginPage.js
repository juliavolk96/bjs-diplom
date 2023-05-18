"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = myFunc;

function myFunc(data) {
  ApiConnector.login(data, consoleChecker)
}

function consoleChecker(response) {
  console.log(response)
  if (response.success) {
    location.reload()
  } else {
    userForm.setLoginErrorMessage(response.error)
  }
}

userForm.registerFormCallback = registration;

function registration(data) {
  ApiConnector.register(data, registerChecker);
}

function registerChecker(response) {
  if (response.success) {
    myFunc(data); 
    location.reload()
  } else {
    userForm.setRegisterErrorMessage(response.error);
  }
}