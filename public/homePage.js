//LogoutButton

const logoutButton = new LogoutButton();
logoutButton.action = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
    });

    if (response.ok) {
      location.reload();
    } else {
      console.log('Ошибка запроса деавторизации');
    }
  } catch (error) {
    console.log('Ошибка при выполнении запроса деавторизации', error);
  }
};

//запрос на получение текущего пользователя 
ApiConnector.current((data) => {
  console.log(data);
});

ApiConnector.current((data) => {
  if (data.success) { //если ответ успешный, то вызовите метод отображения данных профиля (ProfileWidget.showProfile)
    ProfileWidget.showProfile(data);
  } 
});

//получение текущих курсов валют
let ratesBoard = new RatesBoard();

async function fetchCurrencyRates() {
  try {
    let response = await fetch('/currency-rates');
    if(response.ok) {
      let data = await response.json();
      ratesBoard.clearTable();
      ratesBoard.fillTable(data);
    } else {
      console.error('Ошибка при получении курсов валют:', response.status);
    }
  } catch(error) {
    console.error('Ошибка при получении курсов валют:', error);
  }
}

//вызыываем функцию
fetchCurrencyRates();
//устанавливаем интервал
setInterval(fetchCurrencyRates, 60000);

//реализуем операции с деньгами
//1) пополнение баланса
let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = async (data) => {
  try {
    let response = await fetch('/add-money', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(response.ok) {
      let responseData = await response.json();

      ProfileWidget.showProfile(responseData);

      moneyManager.setMessage(true, 'Баланс успешно пополнен');
    } else {
      moneyManager.setMessage(false, 'Ошибка при пополнении баланса');
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса на пополнение баланса:', error);
  }
};

//2) конвертация валюты
moneyManager.conversionMoneyCallback = async(data) => {
  try {
    let response = await fetch('/convert-money', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(response.ok) {
      let responseData = await response.json();
      ProfileWidget.showProfile(responseData);
      moneyManager.setMessage(true, 'Конвертация выполнена успешно');
    } else {
      moneyManager.setMessage(false, 'Ошибка при выполнении конвертации');
    }
  } catch(error) {
    console.error('Ошибка при выполнении запроса на конвертацию:', error);
  }
};