import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, Router, Routes} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

import {Authority} from 'app/shared/constants/authority.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {GateAssignments, IGateAssignments} from 'app/shared/model/gate-assignments.model';
import {GateAssignmentsService} from './gate-assignments.service';
import {GateAssignmentsComponent} from './gate-assignments.component';
import {GateAssignmentsDetailComponent} from './gate-assignments-detail.component';
import {GateAssignmentsUpdateComponent} from './gate-assignments-update.component';
import {BarComponent} from '../../shared/bar/bar.component';

@Injectable({ providedIn: 'root' })
export class GateAssignmentsResolve implements Resolve<IGateAssignments> {
  constructor(private service: GateAssignmentsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGateAssignments> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gateAssignments: HttpResponse<GateAssignments>) => {
          if (gateAssignments.body) {
            return of(gateAssignments.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GateAssignments());
  }
}

export const gateAssignmentsRoute: Routes = [
  {
    path: '',
    component: GateAssignmentsComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sfoGateAssignmentProblemApp.gateAssignments.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GateAssignmentsDetailComponent,
    resolve: {
      gateAssignments: GateAssignmentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sfoGateAssignmentProblemApp.gateAssignments.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GateAssignmentsUpdateComponent,
    resolve: {
      gateAssignments: GateAssignmentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sfoGateAssignmentProblemApp.gateAssignments.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GateAssignmentsUpdateComponent,
    resolve: {
      gateAssignments: GateAssignmentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sfoGateAssignmentProblemApp.gateAssignments.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
	{
		path: 'bar',
		component: BarComponent,
		canActivate: [UserRouteAccessService]
	}
];
