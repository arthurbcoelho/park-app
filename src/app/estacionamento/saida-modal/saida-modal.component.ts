import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { VagaOcupada } from 'src/app/commons/models/vaga-ocupacao.type';
import { VagasOcupadasService } from '../services/vagas-ocupadas.service';
import { Vaga } from 'src/app/vagas/models/vaga.type';

@Component({
    selector: 'app-saida-modal',
    templateUrl: './saida-modal.component.html',
    styleUrls: ['./saida-modal.component.scss'],
    imports: [
        IonicModule
    ]
})
export class SaidaModalComponent implements OnInit {
    @Input() vagasOcupadas: VagaOcupada[] = [];

    constructor(private modalController: ModalController, 
        private readonly vagasOcupadasService: VagasOcupadasService) { }

    dismiss() {
        this.modalController.dismiss();
    }

    selecionar(vaga: VagaOcupada) {
        this.modalController.dismiss(vaga);
    }

    excluirVaga(vaga: VagaOcupada) {
        console.log('caiu aqui');
        console.log(vaga);
        if (vaga.id) {
            console.log('caiu aqui 1');
            this.vagasOcupadasService.delete(vaga.id)
            .subscribe(resp => alert('Vaga ocupada excluída com sucesso!'));
        } else {
            console.error('Vaga id é undefined');
        }
    }

    ngOnInit() { }

}
