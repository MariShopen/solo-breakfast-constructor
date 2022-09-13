const React = require('react');
const Layout = require('./Layout');

module.exports = function Profile({ newUser, user, favs = [] }) {
  // console.log('newUser-->>', newUser);
  // console.log('avatar-->>', avatar);
  console.log('user-->', user);
  return (
    <Layout newUser={newUser}>
      <script defer src="/js/duckProfile.js" />
      <div className="d-flex justify-content-around">
        <div className="w-50 m-5">
          {favs && favs?.map((fav) => (
            <div className="card flex-card w-100 mButtom">
              <div className="card-body d-flex align-items-center flex-column" key={fav.id}>
                <div className="m-2">
                  <a href={`/breakfast/${fav.recipeId}`} className="a-style font-h2">{fav.title}</a>
                </div>
                <div className="d-flex flex-row justify-content-around">
                  <div className="col-md-5">
                    <img src={fav.image} className="img-fluid rounded-start" alt="..." />
                  </div>
                  <div>
                    missedIngredients:
                    {' '}
                    {fav.missedIngredients?.map((ingredient) => (
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
                    {fav.usedIngredients?.map((ingredient) => (
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

        <div className="w-25 h-25 m-5">
          <button id="getNewDuck" type="button" className="btn btn-warning w-15 m-3">Change duck</button>
          <div className="w-50 divDuck">
            <img src={user.img_url} className="img-fluid rounded-start" alt="..." />
          </div>
        </div>
      </div>
    </Layout>
  );
};
