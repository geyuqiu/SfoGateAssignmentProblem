import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'gate-assignments',
        loadChildren: () => import('./gate-assignments/gate-assignments.module').then(m => m.SfoGateAssignmentProblemGateAssignmentsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SfoGateAssignmentProblemEntityModule {}
