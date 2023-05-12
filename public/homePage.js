//LogoutButton
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) location.reload();
  });
};

//получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});


//получение текущих курсов валют
const ratesBoard = new RatesBoard();

function getExchangeRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

getExchangeRates();

setInterval(getExchangeRates, 60000);

//реализуем операции с деньгами
//1) пополнение баланса
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Баланс успешно пополнен!');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//2) конвертация валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Конвертация выполнена успешно!');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//3) перевод валюты 
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Перевод выполнен успешно!');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//работа с избранным
const favoritesWidget = new FavoritesWidget();

//1) Запрос начального списка избранного
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
  } else {
    favoritesWidget.setMessage(false, response.message);
  }
});


//2) добавление в список с избранным
favoritesWidget.addUserCallback = function(userData) {
  ApiConnector.addUserToFavorites(userData, function(response) {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное.");
    } else {
      favoritesWidget.setMessage(false, response.message);
    }
  });
};

//удаление пользователя 
favoritesWidget.removeUserCallback = function(userId) {
  ApiConnector.removeUserFromFavorites(userId, function(response) {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList(response.data);
      favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного.");
    } else {
      favoritesWidget.setMessage(false, response.message);
    }
  });
};