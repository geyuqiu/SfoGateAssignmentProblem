import {Subscription} from 'rxjs';

export default class DisposeHelper {
	private disposables: Subscription[];

	constructor() {
		this.disposables = [];
	}

	addSub(subscription: Subscription): void {
		this.disposables.push(subscription);
	}

	dispose(): void {
		for (const sub of this.disposables) {
			if (sub && typeof sub.unsubscribe === 'function') {
				sub.unsubscribe();
			}
		}
		this.disposables = [];
	}

	get Disposables(): Subscription[] {
		return this.disposables;
	}
}
