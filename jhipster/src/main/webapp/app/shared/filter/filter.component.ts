import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
	searchText = '';
	@Output()
	updateFilter = new EventEmitter<string>();
	@Input()
	placeholder = '';
	private debouncer: Subject<string> = new Subject<string>();
	readonly subscription: Subscription;
	time = 1000;

	constructor() {
		this.subscription = this.debouncer
			.pipe(debounceTime(this.time), distinctUntilChanged())
			.subscribe((debouncedValue: string) => this.updateFilter.emit(debouncedValue));
	}

	onChange(value: string): void {
		this.debouncer.next(value);
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
