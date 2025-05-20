import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_API_URL } from "src/app/commons/constants/app.constats";
import { VagaOcupada } from "src/app/commons/models/vaga-ocupacao.type";
import { Vaga } from "src/app/vagas/models/vaga.type";
import { VagasService } from "src/app/vagas/services/vagas.service";

@Injectable({
    providedIn: 'root'
})
export class VagasOcupadasService {
    private readonly API_URL = BASE_API_URL + "/vagasOcupadas";

    constructor(private readonly httpClient: HttpClient) {

    }

    getAll() {
        return this.httpClient.get<VagaOcupada[]>(`${this.API_URL}/?finalizada=false`);
    }

    save(vagaOcupada: VagaOcupada) {
        return this.httpClient.post<VagaOcupada>(this.API_URL, vagaOcupada);
    }
    
    update(vagaOcupada: VagaOcupada) {
        return this.httpClient.put<VagaOcupada>(`${this.API_URL}/${vagaOcupada.id}`, vagaOcupada);
    }

    delete(vagaOcupadaId: string) {
        console.log('caiu aq');
        console.log(vagaOcupadaId);
        return this.httpClient.delete<VagaOcupada>(`${this.API_URL}/${vagaOcupadaId}`);
    }
}