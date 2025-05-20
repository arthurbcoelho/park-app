import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VeiculosService } from '../services/veiculos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MARCAS_VEICULO_LIST } from '../models/marca-veiculo.interface';
import { TIPOS_VEICULO_LIST } from '../models/tipo-veiculo.interface';

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
    marcas = MARCAS_VEICULO_LIST;
    tipos = TIPOS_VEICULO_LIST;
    veiculoId!: string;
    
    constructor(private readonly veiculosService: VeiculosService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) { 
        this.veiculoId = this.activatedRoute.snapshot.params['id'];
        
        if (this.veiculoId) {
            this.veiculosService.getById(this.veiculoId).subscribe({
                next: (resp) => {
                    const marcaObj = this.marcas.find(marca => marca.id === resp.marca.id);
                    const tipoObj = this.tipos.find(tipo => tipo.id === resp.tipo.id);
                    this.veiculoForm.patchValue({...resp, marca: marcaObj, tipo: tipoObj});
                }
                , error: (error) => {
                    alert('Erro ao buscar veículo!');
                    console.error(error);
                }
            });
        }
    }

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

    remove() {
        this.veiculosService.remove(this.veiculoId).subscribe({
            next: (resp) => {
                alert('veículo removido com sucesso');
                this.veiculoForm.reset();
                this.router.navigate(['/']);
            },
            error: (error) => {
                alert('erro ao remover veículo');
                console.error(error);
            }
        })
    }

    ngOnInit() { }

}
