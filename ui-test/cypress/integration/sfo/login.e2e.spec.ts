import {LoginPage} from "../pages/login.page";

describe('go to home page', () => {

  let loginPage: LoginPage;
  before(()=> {
    loginPage = new LoginPage();
  });

  it('Login successfully ', () => {
    loginPage.login();
  });

  after(() => {
    loginPage.logout();
  });
});
