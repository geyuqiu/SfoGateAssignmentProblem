import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGateAssignments } from 'app/shared/model/gate-assignments.model';
import { GateAssignmentsService } from './gate-assignments.service';

@Component({
  templateUrl: './gate-assignments-delete-dialog.component.html',
})
export class GateAssignmentsDeleteDialogComponent {
  gateAssignments?: IGateAssignments;

  constructor(
    protected gateAssignmentsService: GateAssignmentsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gateAssignmentsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gateAssignmentsListModification');
      this.activeModal.close();
    });
  }
}
