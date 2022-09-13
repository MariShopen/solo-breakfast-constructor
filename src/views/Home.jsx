const React = require('react');

const Layout = require('./Layout');

module.exports = function Home({ newUser, recipes = [] }) {
  // console.log("allBreakfasts view", allBreakfasts)
  return (
    <Layout newUser={newUser}>
      <div className="d-flex align-items-center flex-column">
        <form id="searchForm" className="w-25 h-25 m-3 d-flex justify-content-center" action="/">
          <input name="search" type="text" className="w-75 start-50 form-control m-1" id="exampleInput1" placeholder="Start to find" />
          <button id="getBreakfast" type="submit" className="btn btn-warning w-25 m-1">Search</button>
        </form>
        <div className="w-50 m-3">
          {recipes && recipes?.map((recipe) => (
            <div className="card flex-card w-100 mButtom">
              <div className="card-body d-flex align-items-center flex-column" key={recipe.id}>
                <div className="m-2">
                  <a href={`/breakfast/${recipe.id}`} className="a-style font-h2">{recipe.title}</a>
                </div>
                <div className="d-flex flex-row justify-content-around w-100">
                  <div className="col-md-5">
                    <img src={recipe.image} className="img-fluid rounded-start" alt="..." />
                  </div>
                  <div>
                    missedIngredients:
                    {' '}
                    {recipe.missedIngredients?.map((ingredient) => (
                      <ul key={ingredient.id}>
                        <li>
                          {ingredient.name}
                        </li>
                      </ul>
                    ))}
                  </div>
                  <div>
                    usedIngredients:
                    {' '}
                    {recipe.usedIngredients?.map((ingredient) => (
                      <ul key={ingredient.id}>
                        <li>
                          {ingredient.name}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
