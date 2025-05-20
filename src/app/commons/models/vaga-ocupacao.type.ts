export type VagaOcupada = {
    id?: string,
    vagaId: string,
    vagaCodigo: string
    veiculoId: string,
    placaVeiculo: string,
    horaInicio: Date,
    finalOcupacao?: Date,
    precoHora: number,
    precoTotal: number
}