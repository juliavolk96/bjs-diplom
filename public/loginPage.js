"use strict"

//не сразу поняла задание

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
    alert(response.error)
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
    alert(response.error);
  }
}