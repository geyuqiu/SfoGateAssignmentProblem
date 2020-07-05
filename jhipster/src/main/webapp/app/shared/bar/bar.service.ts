import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {SERVER_API_URL} from 'app/app.constants';
import {IBar} from '../model/bar.model';

type EntityResponseType = HttpResponse<IBar>;

@Injectable({providedIn: 'root'})
export class BarService {
	public resourceUrl = SERVER_API_URL + 'api/gate-assignments';

	constructor(protected http: HttpClient) {
	}

	query(): Observable<EntityResponseType> {
		return this.http
			.get<IBar>(`${this.resourceUrl}/bar`, {observe: 'response'})
			.pipe(map((res: EntityResponseType) => res));
	}
}
