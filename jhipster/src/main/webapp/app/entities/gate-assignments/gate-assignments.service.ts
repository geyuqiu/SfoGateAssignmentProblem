import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IGateA, IGateAssignments} from 'app/shared/model/gate-assignments.model';

type EntityResponseType = HttpResponse<IGateAssignments>;
type EntityArrayResponseType = HttpResponse<IGateAssignments[]>;
type EntityArrayExportResponseType = HttpResponse<IGateA[]>;

@Injectable({ providedIn: 'root' })
export class GateAssignmentsService {
  public resourceUrl = SERVER_API_URL + 'api/gate-assignments';

  constructor(protected http: HttpClient) {}

  create(gateAssignments: IGateAssignments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gateAssignments);
    return this.http
      .post<IGateAssignments>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(gateAssignments: IGateAssignments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gateAssignments);
    return this.http
      .put<IGateAssignments>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGateAssignments>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  searchBy(param: string, value: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGateAssignments[]>(`${this.resourceUrl}/${param}/${value}`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  searchAllBy(param: string, value: string, req?: any): Observable<EntityArrayExportResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGateA[]>(`${this.resourceUrl}/${param}/all/${value}`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayExportResponseType) => res));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGateAssignments[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(gateAssignments: IGateAssignments): IGateAssignments {
    const copy: IGateAssignments = Object.assign({}, gateAssignments, {
      time: gateAssignments.time && gateAssignments.time.isValid() ? gateAssignments.time.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.time = res.body.time ? moment(res.body.time) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((gateAssignments: IGateAssignments) => {
        gateAssignments.time = gateAssignments.time ? moment(gateAssignments.time) : undefined;
      });
    }
    return res;
  }
}
