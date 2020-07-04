import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {of} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';

import {SfoGateAssignmentProblemTestModule} from '../../../test.module';
import {MockEventManager} from '../../../helpers/mock-event-manager.service';
import {MockActiveModal} from '../../../helpers/mock-active-modal.service';
import {GateAssignmentsDeleteDialogComponent} from 'app/entities/gate-assignments/gate-assignments-delete-dialog.component';
import {GateAssignmentsService} from 'app/entities/gate-assignments/gate-assignments.service';

describe('Component Tests', () => {
  describe('GateAssignments Management Delete Component', () => {
    let comp: GateAssignmentsDeleteDialogComponent;
    let fixture: ComponentFixture<GateAssignmentsDeleteDialogComponent>;
    let service: GateAssignmentsService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SfoGateAssignmentProblemTestModule],
        declarations: [GateAssignmentsDeleteDialogComponent],
      })
        .compileComponents();
      fixture = TestBed.createComponent(GateAssignmentsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GateAssignmentsService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
