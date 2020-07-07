import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SfoGateAssignmentProblemTestModule} from '../../../test.module';
import {ProfileInfo} from 'app/layouts/profiles/profile-info.model';
import {NavbarComponent} from 'app/layouts/navbar/navbar.component';
import {AccountService} from 'app/core/auth/account.service';
import {ProfileService} from 'app/layouts/profiles/profile.service';
import {ActiveMenuDirective} from 'app/layouts/navbar/active-menu.directive';

describe('Component Tests', () => {
  describe('Navbar Component', () => {
    let comp: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let accountService: AccountService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [SfoGateAssignmentProblemTestModule],
        declarations: [NavbarComponent, ActiveMenuDirective],
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      comp = fixture.componentInstance;
      accountService = TestBed.get(AccountService);
    });

    it('Should call accountService.isAuthenticated on authentication', () => {
      // WHEN
      comp.isAuthenticated();

      // THEN
      expect(accountService.isAuthenticated).toHaveBeenCalled();
    });
  });
});
