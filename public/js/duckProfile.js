const duckBtn = document.querySelector('#getNewDuck');
const divDuck = document.querySelector('.divDuck');

duckBtn.addEventListener('click', async (e) => {
  // e.preventDefault();
  // const login = e.target.login.value;
  // const password = e.target.password.value;
  // const obj = { login, password };
  const response = await fetch('/profile/img', {
    method: 'Get',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const result = await response.json();
  // console.log("result.url     ", result.url)

  const duckImg = `<img src='${result.url}' class="img-fluid rounded-start" alt='duck' />`
  divDuck.innerHTML = duckImg

  // window.location.assign('/profile');
});
