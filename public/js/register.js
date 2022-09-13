const registerForm = document.querySelector('#registerForm');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const login = e.target.login.value;
  const password = e.target.password.value;
  const obj = { login, password };
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  const result = await response.json();

  if (result.user === 'exist') {
    window.alert('Вы уже зарегестрированны');
  }
  if (result.login === 'ok') {
    window.location.assign('/');
  }
});
