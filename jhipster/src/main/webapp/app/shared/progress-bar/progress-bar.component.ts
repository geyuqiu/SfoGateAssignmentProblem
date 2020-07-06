import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import DisposeHelper from 'app/shared/util/dispose.helper';

@Component({
	selector: 'app-progress-bar',
	templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnInit, OnDestroy {

	value = 0;
	private disposeHelper: DisposeHelper;

	constructor() {
		this.disposeHelper = new DisposeHelper();
	}

	ngOnInit(): void {
		const countDown: Subscription = timer(0, 500).subscribe(val => {
			this.value = val + 10;
		});
		this.disposeHelper.addSub(countDown);
	}

	ngOnDestroy(): void {
		this.disposeHelper.dispose();
	}
}
