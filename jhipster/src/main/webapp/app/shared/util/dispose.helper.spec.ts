import {Subject} from 'rxjs';
import DisposeHelper from './dispose.helper';

describe('Dispose (Helper)', () => {
	let helper, testSub;
	beforeEach(() => {
		helper = new DisposeHelper();
		helper.addSub({});
		testSub = new Subject().subscribe(() => {
		});
		spyOn(testSub, 'unsubscribe');
		helper.addSub(testSub);
	});
	it('should remember disposables', () => {
		expect(helper.Disposables.length).toBe(2);
	});
	it('should dispose/unsubscribe', () => {
		helper.dispose();
		expect(testSub.unsubscribe).toHaveBeenCalled();
		expect(helper.Disposables.length).toBe(0);
	});
});
