import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGateAssignments } from 'app/shared/model/gate-assignments.model';

@Component({
  selector: 'jhi-gate-assignments-detail',
  templateUrl: './gate-assignments-detail.component.html',
})
export class GateAssignmentsDetailComponent implements OnInit {
  gateAssignments: IGateAssignments | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gateAssignments }) => (this.gateAssignments = gateAssignments));
  }

  previousState(): void {
    window.history.back();
  }
}
