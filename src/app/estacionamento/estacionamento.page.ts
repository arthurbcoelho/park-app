import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-estacionamento',
    templateUrl: './estacionamento.page.html',
    styleUrls: ['./estacionamento.page.scss'],
    imports: [
        IonicModule
    ]
})
export class EstacionamentoPage implements OnInit {
    pageTitle: string = 'Estacionamento';
    constructor() { }

    ngOnInit() {
    }
}
