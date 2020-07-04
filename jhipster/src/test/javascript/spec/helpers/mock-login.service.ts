import Spy = jasmine.Spy;
import {of} from 'rxjs';

import {SpyObject} from './spyobject';
import {LoginService} from 'app/core/login/login.service';

export class MockLoginService extends SpyObject {
  loginSpy: Spy;
  logoutSpy: Spy;
  cancelSpy: Spy;

  constructor() {
    super(LoginService);

    this.loginSpy = this.spy('login').andReturn(of({}));
    this.logoutSpy = this.spy('logout').andReturn(this);
    this.cancelSpy = this.spy('cancel').andReturn(this);
  }

  setResponse(json: any): void {
    this.loginSpy = this.spy('login').andReturn(of(json));
  }
}
