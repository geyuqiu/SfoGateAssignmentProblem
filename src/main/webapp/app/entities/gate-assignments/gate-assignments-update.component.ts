import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IGateAssignments, GateAssignments } from 'app/shared/model/gate-assignments.model';
import { GateAssignmentsService } from './gate-assignments.service';

@Component({
  selector: 'jhi-gate-assignments-update',
  templateUrl: './gate-assignments-update.component.html',
})
export class GateAssignmentsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    time: [],
    airline: [],
    flightNumber: [],
    transaction: [],
    terminal: [],
    gate: [],
    remark: [],
  });

  constructor(
    protected gateAssignmentsService: GateAssignmentsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gateAssignments }) => {
      if (!gateAssignments.id) {
        const today = moment().startOf('day');
        gateAssignments.time = today;
      }

      this.updateForm(gateAssignments);
    });
  }

  updateForm(gateAssignments: IGateAssignments): void {
    this.editForm.patchValue({
      id: gateAssignments.id,
      time: gateAssignments.time ? gateAssignments.time.format(DATE_TIME_FORMAT) : null,
      airline: gateAssignments.airline,
      flightNumber: gateAssignments.flightNumber,
      transaction: gateAssignments.transaction,
      terminal: gateAssignments.terminal,
      gate: gateAssignments.gate,
      remark: gateAssignments.remark,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gateAssignments = this.createFromForm();
    if (gateAssignments.id !== undefined) {
      this.subscribeToSaveResponse(this.gateAssignmentsService.update(gateAssignments));
    } else {
      this.subscribeToSaveResponse(this.gateAssignmentsService.create(gateAssignments));
    }
  }

  private createFromForm(): IGateAssignments {
    return {
      ...new GateAssignments(),
      id: this.editForm.get(['id'])!.value,
      time: this.editForm.get(['time'])!.value ? moment(this.editForm.get(['time'])!.value, DATE_TIME_FORMAT) : undefined,
      airline: this.editForm.get(['airline'])!.value,
      flightNumber: this.editForm.get(['flightNumber'])!.value,
      transaction: this.editForm.get(['transaction'])!.value,
      terminal: this.editForm.get(['terminal'])!.value,
      gate: this.editForm.get(['gate'])!.value,
      remark: this.editForm.get(['remark'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGateAssignments>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
