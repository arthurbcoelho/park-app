import { Injectable } from "@angular/core";
import { Veiculo } from "../models/veiculo.type";
import { HttpClient } from "@angular/common/http";
import { BASE_API_URL } from "src/app/commons/constants/app.constats";

@Injectable({
    providedIn: 'root'
})
export class VeiculosService {
    private readonly API_URL = BASE_API_URL + "/veiculos";

    constructor(private readonly httpClient: HttpClient) {}

    getById(veiculoId: number) {
        return this.httpClient.get<Veiculo>(`${this.API_URL}/${veiculoId}`);
    }

    getAll() {
        return this.httpClient.get<Veiculo[]>(this.API_URL);
    }

    save(veiculo: Veiculo) {
        return this.httpClient.post<Veiculo>(this.API_URL, veiculo);
    }

    remove(veiculoId: number) {
        return this.httpClient.delete(`${this.API_URL}/${veiculoId}`);
    }
}