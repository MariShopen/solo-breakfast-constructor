const React = require('react');

module.exports = function Layout({ children, newUser }) {
  // console.log(newUser);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/css/public.css" />
        <title>Breakfast</title>
      </head>
      <header className="backColorHeader">
        <nav className="navbar navbar-expand">
          <div className="container-fluid d-flex justify-content-between">
            <a className="navbar-brand" href="/"><img src="/img/duck-home-orange.png" alt="..." width="60px" height="60px" /></a>
            <h1 className="text-white">Duck breakfast constructor</h1>
            <div className="collapse navbar-collapse w-20" id="navbarNav">
              <ul className="navbar-nav">
                {
                  newUser
                    ? (
                      <>
                        <li className="nav-item">
                          <a className="nav-link fontColor" aria-current="page" href="/profile">{newUser}</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link fontColor" aria-current="page" href="/logout">log Out</a>
                        </li>
                      </>
                    )
                    : (
                      <>
                        <li className="nav-item">
                          <a className="nav-link fontColor" aria-current="page" href="/login">Log In</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link fontColor" aria-current="page" href="/register">Create New Account</a>
                        </li>
                      </>
                    )
                }
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <body>
        { children }
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous" />
      </body>
    </html>
  );
};
