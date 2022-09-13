const addToFav = document.querySelector('#addToFav');
console.log("addToFav", addToFav)

addToFav?.addEventListener('click', async (e) => {
  const { id } = e.target.dataset;
  console.log('e.target.classList', e.target.classList);
  const response = await fetch(`/breakfast/fav/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  console.log("response.status", response.status)
  if (response.status === 200) {
    // надо поменять класс кнопки, на бэке добавить рецепт в бд
    e.target.classList.remove('addFavBtn');
    e.target.classList.add('removeFavBtn');
    console.log('e.target.classList после ответа', e.target.classList);
  }
});

const removeToFav = document.querySelector('#removeToFav');
console.log("removeToFav", removeToFav)
removeToFav?.addEventListener('click', async (e) => {
  const { id } = e.target.dataset;
  console.log("e.target.classList", e.target.classList)
  const response = await fetch(`/breakfast/fav/remove/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  console.log("response.status", response.status)
  if (response.status === 200) {
    // надо поменять класс кнопки, на бэке убрать рецепт из бд
    e.target.classList.remove('removeFavBtn');
    e.target.classList.add('addFavBtn');
    console.log('e.target.classList после ответа', e.target.classList);
  }
});
