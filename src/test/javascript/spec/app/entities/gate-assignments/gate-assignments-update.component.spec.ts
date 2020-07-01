import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SfoGateAssignmentProblemTestModule } from '../../../test.module';
import { GateAssignmentsUpdateComponent } from 'app/entities/gate-assignments/gate-assignments-update.component';
import { GateAssignmentsService } from 'app/entities/gate-assignments/gate-assignments.service';
import { GateAssignments } from 'app/shared/model/gate-assignments.model';

describe('Component Tests', () => {
  describe('GateAssignments Management Update Component', () => {
    let comp: GateAssignmentsUpdateComponent;
    let fixture: ComponentFixture<GateAssignmentsUpdateComponent>;
    let service: GateAssignmentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SfoGateAssignmentProblemTestModule],
        declarations: [GateAssignmentsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GateAssignmentsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GateAssignmentsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GateAssignmentsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GateAssignments(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GateAssignments();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
