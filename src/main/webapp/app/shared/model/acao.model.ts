import dayjs from 'dayjs';
import { ICadastroDoacao } from 'app/shared/model/cadastro-doacao.model';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { ICadastroUser } from 'app/shared/model/cadastro-user.model';

export interface IAcao {
  id?: number;
  dataCriacao?: string | null;
  usuarioCriacaoAcao?: string | null;
  pendente?: boolean | null;
  dataExecucaoAcao?: string | null;
  ativa?: boolean | null;
  observacoes?: string | null;
  cadastroDoacao?: ICadastroDoacao | null;
  solicitacao?: ISolicitacao | null;
  cadastroUser?: ICadastroUser | null;
}

export const defaultValue: Readonly<IAcao> = {
  pendente: false,
  ativa: false,
};
