const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const login = e.target.login.value;
  const password = e.target.password.value;
  const objLog = { login, password };
  const responselogin = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(objLog),
  });
  const resultlogin = await responselogin.json();
  if (resultlogin.user === 'wrong') {
    window.alert('Вы ввели неправильный логин или пароль');
  }
  if (resultlogin.user === 'unknownUser') {
    window.alert('Такого пользователя не существует, зарегистрируйтесь!');
  }
  if (resultlogin.login === 'ok') {
    window.location.assign('/');
  }
});
