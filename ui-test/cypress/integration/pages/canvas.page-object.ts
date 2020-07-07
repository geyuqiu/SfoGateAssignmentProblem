import {Navigator} from "../../util/Navigator";

export class CanvasPage extends Navigator {
	getCanvas() {
		return cy.get('canvas');
	}
}
