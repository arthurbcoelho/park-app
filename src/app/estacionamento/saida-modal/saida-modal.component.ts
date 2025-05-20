import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { VagaOcupada } from 'src/app/commons/models/vaga-ocupacao.type';
import { VagasOcupadasService } from '../services/vagas-ocupadas.service';
import { Vaga } from 'src/app/vagas/models/vaga.type';
import { CommonModule } from '@angular/common';
import { VagasService } from 'src/app/vagas/services/vagas.service';

@Component({
    selector: 'app-saida-modal',
    templateUrl: './saida-modal.component.html',
    styleUrls: ['./saida-modal.component.scss'],
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class SaidaModalComponent implements OnInit {
    @Input() vagasOcupadas: VagaOcupada[] = [];

    constructor(private modalController: ModalController,
        private readonly vagasOcupadasService: VagasOcupadasService,
        private readonly vagasService: VagasService) { }

    dismiss() {
        this.modalController.dismiss();
    }

    selecionar(vaga: VagaOcupada) {
        this.modalController.dismiss(vaga);
    }

    finalizarVaga(vagaOcupada: VagaOcupada) {
        vagaOcupada.horaFim = new Date();
        vagaOcupada.finalizada = true;

        if (vagaOcupada.id) {
            console.log('caiu aqui 1');
            this.vagasOcupadasService.update(vagaOcupada)
                .subscribe(resp => { 
                    this.vagasOcupadasService.totalFaturado = this.vagasOcupadasService.totalFaturado + this.calculaTotal(vagaOcupada);
                    this.vagasService.calculaPorcentagemVagas();
                    alert('Vaga liberada com sucesso!');
                });
        } else {
            console.error('Vaga id é undefined');
        }
    }

    ngOnInit() { }


    calculaTotal(vagaOcupada: VagaOcupada) {
        return this.vagasOcupadasService.calcularHorasInteiras(vagaOcupada) * vagaOcupada.precoHora;
    }
}
