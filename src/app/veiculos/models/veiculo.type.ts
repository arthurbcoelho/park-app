import { MarcaVeiculo } from "../enum/marca-veiculo.enum"
import { TipoVeiculo } from "../enum/tipo-veiculo.enum"

export type Veiculo = {
    id?: number,
    modelo: string,
    marca: MarcaVeiculo,
    tipo: TipoVeiculo,
    placa: string,
    cor: string,
    nomeProprietario: string,
    contatoProprietario: string
}