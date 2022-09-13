const React = require('react');

const Layout = require('./Layout');

module.exports = function OneBreakfast({ newUser, recipe = {} }) {
  return (
    <Layout newUser={newUser}>
      <script defer src="/js/favorite.js" />
      <br />
      <div className="flex-card-info">
        <div className="card-info card flex-card-info p-3">
          <div className="card-body-info">
            <div className="img-title-flex">
              <div>
                <img src={recipe.image} alt="..." />
              </div>

              <div className="w-100">
                <div className="title-btn">
                  <h2>{recipe.title}</h2>
                  {recipe.fav
                    ? (
                      <button id="removeToFav" data-id={recipe.id} type="button" data-title="Remove to favorite" className="removeFavBtn btn btn-light" />
                    )
                    : <button id="addToFav" data-id={recipe.id} type="button" data-title="Add to favorite" className="addFavBtn btn btn-light" />}
                </div>

                <p>
                  Сooking time:
                  {' '}
                  {recipe.timeOfCook}
                  {' '}
                  min
                </p>
                <p>
                  Servings:
                  {' '}
                  {recipe.servings}
                </p>
              </div>
            </div>
            <div className="text m-2">
              {recipe.instructions}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
