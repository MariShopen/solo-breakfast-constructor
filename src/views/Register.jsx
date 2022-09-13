const React = require('react');

const Layout = require('./Layout');

module.exports = function Registr() {
  return (
    <Layout>

      <script defer src=" js/register.js" />
      <div className="bg-img w-100 h-100">
        <div className="position-absolute start-50 w-50 h-50 d-flex align-items-center">
          <form id="registerForm" className="w-50 h-75 form-control form-flex">
            <h2>Create new account</h2>
            <input name="login" type="text" className="w-50 start-50 form-control m-2" id="exampleInput1" placeholder="login" />
            <input name="password" type="password" className="w-50 start-50 form-control m-2" id="exampleInput2" placeholder="password" />
            <button type="submit" className="btn btn-warning w-50 start-50">Create</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
