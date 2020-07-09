import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Data, ParamMap, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IGateA, IGateAssignments} from 'app/shared/model/gate-assignments.model';

import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {GateAssignmentsService} from './gate-assignments.service';
import {GateAssignmentsDeleteDialogComponent} from './gate-assignments-delete-dialog.component';
import {ExcelService} from '../../shared/services/excel.service';
import {GateAssignmentsColumn} from '../../shared/model/enumerations/gate-assignments-column.model';

@Component({
  selector: 'app-gate-assignments',
  templateUrl: './gate-assignments.component.html'
})
export class GateAssignmentsComponent implements OnInit, OnDestroy {
  gateAssignments: IGateAssignments[] = [];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  loading = true;
  searchTerm = '';
  gAExport: IGateA[] = [];
  gateAssignmentsColumn!: GateAssignmentsColumn;

  constructor(
    protected gateAssignmentsService: GateAssignmentsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private excelService: ExcelService
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    if (this.searchTerm) return;
    const pageToLoad: number = page || this.page || 1;
    this.loading = true;

    this.gateAssignmentsService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IGateAssignments[]>) => {
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate)
        },
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInGateAssignments();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGateAssignments): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGateAssignments(): void {
    this.eventSubscriber = this.eventManager.subscribe('gateAssignmentsListModification', () => {
      this.loadPage();
    });
  }

  delete(gateAssignments: IGateAssignments): void {
    const modalRef = this.modalService.open(GateAssignmentsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gateAssignments = gateAssignments;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IGateAssignments[] | null, headers: HttpHeaders, page: number, refresh: boolean): void {
    this.loading = false;
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (refresh) {
      this.router.navigate(['/gate-assignments'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.gateAssignments = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1; // https://medium.com/@rd1982rd/double-question-marks-over-typescript-3-7-nullish-coalescing-40cbe0404c45
  }

  exportAsXlsx(): void {
    this.loading = true;
    this.getAllBy();
  }

  private getAllBy(): void {
    switch (this.gateAssignmentsColumn) {
      case GateAssignmentsColumn.AIRLINE:
        this.searchAllBy('airline', this.searchTerm);
        break;
      default:
        break;
    }
  }

  searchAllBy(param: string, value: string): void {
    this.loading = true;

    this.gateAssignmentsService
      .searchAllBy(param, value, {
        page: 0,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IGateA[]>) => {
          this.onSuccessBulk(res)
        },
        () => this.onError()
      );
  }

  searchBy(param: string, value: string): void {
    this.loading = true;
    this.searchTerm = value;
    this.gateAssignmentsColumn = GateAssignmentsColumn[param.toUpperCase()];

    this.gateAssignmentsService
      .searchBy(param, value, {
        page: 0,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IGateAssignments[]>) => {
          this.onSuccess(res.body, res.headers, 0, false)
        },
        () => this.onError()
      );
  }

  reset(): void {
    this.searchTerm = '';
    this.loadPage();
  }

  private onSuccessBulk(res: HttpResponse<IGateA[]>): void {
    this.gAExport = res.body ? res.body : [];
    this.excelService.exportGateAssignmentsInExcel(this.gAExport, 'filtered');
    this.loading = false;
  }
}
