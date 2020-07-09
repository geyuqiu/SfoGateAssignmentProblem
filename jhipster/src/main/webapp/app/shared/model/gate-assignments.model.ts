import {Moment} from 'moment';
import {Transaction} from 'app/shared/model/enumerations/transaction.model';

export interface IGateAssignmentsBase {
  id?: number;
  airline?: string;
  flightNumber?: string;
  transaction?: Transaction;
  terminal?: string;
  gate?: string;
  remark?: string;
}

export interface IGateAssignments extends IGateAssignmentsBase {
  time?: Moment;
}

export interface IGateA extends IGateAssignmentsBase {
  time?: string;
}

export class GateAssignments implements IGateAssignments {
  constructor(
    public id?: number,
    public time?: Moment,
    public airline?: string,
    public flightNumber?: string,
    public transaction?: Transaction,
    public terminal?: string,
    public gate?: string,
    public remark?: string
  ) {}
}
