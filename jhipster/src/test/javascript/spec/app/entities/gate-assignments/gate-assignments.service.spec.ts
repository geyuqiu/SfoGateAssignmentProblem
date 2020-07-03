import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { GateAssignmentsService } from 'app/entities/gate-assignments/gate-assignments.service';
import { IGateAssignments, GateAssignments } from 'app/shared/model/gate-assignments.model';
import { Transaction } from 'app/shared/model/enumerations/transaction.model';

describe('Service Tests', () => {
  describe('GateAssignments Service', () => {
    let injector: TestBed;
    let service: GateAssignmentsService;
    let httpMock: HttpTestingController;
    let elemDefault: IGateAssignments;
    let expectedResult: IGateAssignments | IGateAssignments[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(GateAssignmentsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new GateAssignments(0, currentDate, 'AAAAAAA', 'AAAAAAA', Transaction.DEP, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            time: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a GateAssignments', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            time: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            time: currentDate,
          },
          returnedFromService
        );

        service.create(new GateAssignments()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a GateAssignments', () => {
        const returnedFromService = Object.assign(
          {
            time: currentDate.format(DATE_TIME_FORMAT),
            airline: 'BBBBBB',
            flightNumber: 'BBBBBB',
            transaction: 'BBBBBB',
            terminal: 'BBBBBB',
            gate: 'BBBBBB',
            remark: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            time: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of GateAssignments', () => {
        const returnedFromService = Object.assign(
          {
            time: currentDate.format(DATE_TIME_FORMAT),
            airline: 'BBBBBB',
            flightNumber: 'BBBBBB',
            transaction: 'BBBBBB',
            terminal: 'BBBBBB',
            gate: 'BBBBBB',
            remark: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            time: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a GateAssignments', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
