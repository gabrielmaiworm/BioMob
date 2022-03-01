import dayjs from 'dayjs';
import { ICadastroUser } from 'app/shared/model/cadastro-user.model';
import { IItem } from 'app/shared/model/item.model';
import { IAcao } from 'app/shared/model/acao.model';

export interface ICadastroDoacao {
  id?: number;
  anonimidade?: boolean | null;
  realizaEntrega?: boolean | null;
  dataDoacao?: string | null;
  logradouro?: string | null;
  numero?: number | null;
  bairro?: string | null;
  cidade?: string | null;
  cep?: string | null;
  estado?: string | null;
  pais?: string | null;
  complemento?: string | null;
  nome?: ICadastroUser | null;
  descricao?: IItem | null;
  acao?: IAcao | null;
}

export const defaultValue: Readonly<ICadastroDoacao> = {
  anonimidade: false,
  realizaEntrega: false,
};
