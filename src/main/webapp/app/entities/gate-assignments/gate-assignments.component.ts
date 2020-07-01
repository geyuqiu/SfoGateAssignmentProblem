import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGateAssignments } from 'app/shared/model/gate-assignments.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { GateAssignmentsService } from './gate-assignments.service';
import { GateAssignmentsDeleteDialogComponent } from './gate-assignments-delete-dialog.component';

@Component({
  selector: 'jhi-gate-assignments',
  templateUrl: './gate-assignments.component.html',
})
export class GateAssignmentsComponent implements OnInit, OnDestroy {
  gateAssignments: IGateAssignments[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  currentSearch: string;

  constructor(
    protected gateAssignmentsService: GateAssignmentsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute
  ) {
    this.gateAssignments = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.gateAssignmentsService
        .search({
          query: this.currentSearch,
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe((res: HttpResponse<IGateAssignments[]>) => this.paginateGateAssignments(res.body, res.headers));
      return;
    }

    this.gateAssignmentsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IGateAssignments[]>) => this.paginateGateAssignments(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.gateAssignments = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  search(query: string): void {
    this.gateAssignments = [];
    this.links = {
      last: 0,
    };
    this.page = 0;
    if (query) {
      this.predicate = '_score';
      this.ascending = false;
    } else {
      this.predicate = 'id';
      this.ascending = true;
    }
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGateAssignments();
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
    this.eventSubscriber = this.eventManager.subscribe('gateAssignmentsListModification', () => this.reset());
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

  protected paginateGateAssignments(data: IGateAssignments[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.gateAssignments.push(data[i]);
      }
    }
  }
}
