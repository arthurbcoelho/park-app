import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";
import { MarcaVeiculo } from '../enum/marca-veiculo.enum';
import { TipoVeiculo } from '../enum/tipo-veiculo.enum';
import { VeiculosService } from '../services/veiculos.service';

@Component({
    selector: 'app-veiculo-form',
    templateUrl: './veiculo-form.component.html',
    styleUrls: ['./veiculo-form.component.scss'],
    imports: [
        IonicModule,
        ReactiveFormsModule
    ]
})
export class VeiculoFormComponent implements OnInit {
    marcas = Object.values(MarcaVeiculo);
    tipos = Object.values(TipoVeiculo)
    
    constructor(private readonly veiculosService: VeiculosService) { }

    onSubmit() {
        this.veiculosService.save(this.veiculoForm.value).subscribe({
            next: (resp) => {
                alert('Veículo cadastrado com sucesso!');
                this.veiculoForm.reset();
            }
            , error: (error) => {
                alert('Erro ao cadastrar veículo!');
                console.error(error);
            }
        });
    }
    veiculoForm: FormGroup = new FormGroup({
        modelo: new FormControl('', Validators.required),
        marca: new FormControl('', Validators.required),
        tipo: new FormControl('', Validators.required),
        placa: new FormControl('', [Validators.required, Validators.maxLength(7)]),
        cor: new FormControl('', Validators.required),
        nomeProprietario: new FormControl('', Validators.required),
        contatoProprietario: new FormControl('', Validators.required)
    });

    ngOnInit() { }

}
