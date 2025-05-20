import { Component, OnInit } from '@angular/core';
import { VagasService } from '../services/vagas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-vaga-form',
    templateUrl: './vaga-form.component.html',
    styleUrls: ['./vaga-form.component.scss'],
    imports: [
        IonicModule,
        ReactiveFormsModule
    ],
})
export class VagaFormComponent implements OnInit {
    vagaId!: string;

    constructor(private readonly vagasService: VagasService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {
        this.vagaId = this.activatedRoute.snapshot.params['id'];

        if (this.vagaId) {
            this.vagasService.getById(this.vagaId).subscribe({
                next: (resp) => {
                    this.vagaForm.patchValue(resp);
                }
                , error: (error) => {
                    alert('Erro ao buscar vaga!');
                    console.error(error);
                }
            });
        }
    }

    vagaForm: FormGroup = new FormGroup({
        codigo: new FormControl('', Validators.required),
        coberta: new FormControl('', Validators.required),
    });

    onSubmit() {
        this.vagasService.save(this.vagaForm.value).subscribe({
            next: (resp) => {
                alert('Vaga cadastrada com sucesso!');
                this.vagaForm.reset();
            }
            , error: (error) => {
                alert('Erro ao cadastrar vaga!');
                console.error(error);
            }
        });
    }

    remove() {
        this.vagasService.remove(this.vagaId)
            .subscribe({
                next: (resp) => {
                    alert('Vaga removida com sucesso!');
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    alert('Erro ao remover a vaga');
                    console.error(error);
                }
            });
    }

    ngOnInit() { }
}
