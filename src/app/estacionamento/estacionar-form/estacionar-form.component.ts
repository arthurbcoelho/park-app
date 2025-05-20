import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Vaga } from 'src/app/vagas/models/vaga.type';
import { VagasService } from 'src/app/vagas/services/vagas.service';
import { Veiculo } from 'src/app/veiculos/models/veiculo.type';
import { VeiculosService } from 'src/app/veiculos/services/veiculos.service';
import { VagasOcupadasService } from '../services/vagas-ocupadas.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-estacionar-form',
    templateUrl: './estacionar-form.component.html',
    styleUrls: ['./estacionar-form.component.scss'],
    imports: [
        IonicModule,
        ReactiveFormsModule
    ]
})
export class EstacionarFormComponent implements OnInit {
    veiculos: Veiculo[] = [];
    vagas: Vaga[] = [];

    constructor(private readonly veiculosService: VeiculosService,
        private readonly vagasService: VagasService,
        private readonly vagasOcupadasService: VagasOcupadasService,
        private readonly router: Router
    ) { }

    ngOnInit() {
        this.veiculosService.getAll().subscribe({
            next: (resp) => {
                this.veiculos = resp;
            }
            , error: (error) => {
                alert('Erro ao buscar veículos!');
                console.error(error);
            }
        });

        this.vagasService.getVagasLivres().then((vagas) => {
            this.vagas = vagas;
        }).catch((error) => {
            alert('Erro ao buscar vagas!');
            console.error(error);
        });
    }

    estacionarForm: FormGroup = new FormGroup({
        veiculo: new FormControl('', Validators.required),
        vaga: new FormControl('', Validators.required),
        horaInicio: new FormControl('', Validators.required),
        precoHora: new FormControl('', Validators.required)
    });

    onSubmit() {
        this.vagasOcupadasService.save(this.estacionarForm.value)
            .subscribe({
                next: (resp) => {
                    alert('Carro estacionado com sucesso!');
                    this.estacionarForm.reset();
                    this.vagasService.calculaPorcentagemVagas();
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    alert('Erro ao cadastrar vaga!');
                    console.error(error);
                }
            });
    }
}
