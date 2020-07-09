import {Moment} from 'moment';
import {Transaction} from 'app/shared/model/enumerations/transaction.model';

export interface IGateAssignments {
  id?: number;
  time?: Moment;
  airline?: string;
  flightNumber?: string;
  transaction?: Transaction;
  terminal?: string;
  gate?: string;
  remark?: string;
}

export interface IGateA {
  id?: number;
  time?: string;
  airline?: string;
  flightNumber?: string;
  transaction?: Transaction;
  terminal?: string;
  gate?: string;
  remark?: string;
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
