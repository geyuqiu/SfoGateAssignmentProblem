import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SfoGateAssignmentProblemSharedModule } from 'app/shared/shared.module';
import { GateAssignmentsComponent } from './gate-assignments.component';
import { GateAssignmentsDetailComponent } from './gate-assignments-detail.component';
import { GateAssignmentsUpdateComponent } from './gate-assignments-update.component';
import { GateAssignmentsDeleteDialogComponent } from './gate-assignments-delete-dialog.component';
import { gateAssignmentsRoute } from './gate-assignments.route';

@NgModule({
  imports: [SfoGateAssignmentProblemSharedModule, RouterModule.forChild(gateAssignmentsRoute)],
  declarations: [
    GateAssignmentsComponent,
    GateAssignmentsDetailComponent,
    GateAssignmentsUpdateComponent,
    GateAssignmentsDeleteDialogComponent,
  ],
  entryComponents: [GateAssignmentsDeleteDialogComponent],
})
export class SfoGateAssignmentProblemGateAssignmentsModule {}
