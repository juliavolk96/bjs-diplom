const { response } = require("express");

//создаем объекта класса LogoutButton
let logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

logoutButton.element.addEventListener('click', logoutButton.action);

//получаем текущего пользователя
function getCurrentUser(callback) {
  ApiConnector.current((response) => {
    if (response.success) {
      callback(null, response.data);
    } else {
      callback(response.error, null);
    }
  });
}

function showProfile(user) {
  let userName = document.querySelector('.profile-name');
  userName.textContent = user.name;
  let userBalance = document.querySelector('.profile-balance');
  userBalance.textContent = user.balance;
}

//получаем текущие курсы валют
function getCurrentRates(callback) {
  ApiConnector.getStocks((response) => {
    if(response.success) {
      callback(null, response.data);
    } else {
      callback(response.error, null)
    }
  });
}