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