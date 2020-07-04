import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SfoGateAssignmentProblemTestModule } from '../../../test.module';
import { GateAssignmentsDetailComponent } from 'app/entities/gate-assignments/gate-assignments-detail.component';
import { GateAssignments } from 'app/shared/model/gate-assignments.model';

describe('Component Tests', () => {
  describe('GateAssignments Management Detail Component', () => {
    let comp: GateAssignmentsDetailComponent;
    let fixture: ComponentFixture<GateAssignmentsDetailComponent>;
    const route = ({ data: of({ gateAssignments: new GateAssignments(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SfoGateAssignmentProblemTestModule],
        declarations: [GateAssignmentsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GateAssignmentsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GateAssignmentsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load gateAssignments on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gateAssignments).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
