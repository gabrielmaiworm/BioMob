import dayjs from 'dayjs';
import { ICadastroUser } from 'app/shared/model/cadastro-user.model';
import { IItem } from 'app/shared/model/item.model';
import { IAcao } from 'app/shared/model/acao.model';

export interface ISolicitacao {
  id?: number;
  solicitante?: string | null;
  anonimidade?: boolean | null;
  dataSolicitacao?: string | null;
  enderecoEntrega?: string | null;
  localDeEntrega?: string | null;
  dataAprovacao?: string | null;
  aprovado?: boolean | null;
  ativa?: boolean | null;
  nome?: ICadastroUser | null;
  descricao?: IItem | null;
  acao?: IAcao | null;
}

export const defaultValue: Readonly<ISolicitacao> = {
  anonimidade: false,
  aprovado: false,
  ativa: false,
};
