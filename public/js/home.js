const getBreakfast = document.querySelector('#getBreakfast');
getBreakfast.addEventListener('click', async (e) => {
  const API_key = 'e20190a39c858ad1869ac521b68fb59f';
  const API_id = '1c003002';
  const response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&q=cheese%20tomato%20eggs&app_id=1c003002&app_key=e20190a39c858ad1869ac521b68fb59f&ingr=3&mealType=Breakfast', {
    method: 'GET',
  });
  const result = await response.json();
  // console.log(result);

});
