import { Veiculo } from "src/app/veiculos/models/veiculo.type"
import { Vaga } from "src/app/vagas/models/vaga.type"

export type VagaOcupacao = {
    id?: number,
    vaga: Vaga,
    veiculo: Veiculo,
    inicioOcupacao: Date,
    finalOcupacao?: Date,
    precoHora: number,
    precoTotal: number
}