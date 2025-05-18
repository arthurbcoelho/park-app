import { Component } from '@angular/core';

@Component({
    selector: 'vagas',
    templateUrl: 'vagas.page.html',
    styleUrls: ['vagas.page.scss'],
    standalone: false,
})
export class VagasPage {
    pageName: string = 'Vagas';

    constructor() { }

}
