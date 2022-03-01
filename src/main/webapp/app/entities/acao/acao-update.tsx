import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICadastroDoacao } from 'app/shared/model/cadastro-doacao.model';
import { getEntities as getCadastroDoacaos } from 'app/entities/cadastro-doacao/cadastro-doacao.reducer';
import { ISolicitacao } from 'app/shared/model/solicitacao.model';
import { getEntities as getSolicitacaos } from 'app/entities/solicitacao/solicitacao.reducer';
import { ICadastroUser } from 'app/shared/model/cadastro-user.model';
import { getEntities as getCadastroUsers } from 'app/entities/cadastro-user/cadastro-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './acao.reducer';
import { IAcao } from 'app/shared/model/acao.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AcaoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const cadastroDoacaos = useAppSelector(state => state.cadastroDoacao.entities);
  const solicitacaos = useAppSelector(state => state.solicitacao.entities);
  const cadastroUsers = useAppSelector(state => state.cadastroUser.entities);
  const acaoEntity = useAppSelector(state => state.acao.entity);
  const loading = useAppSelector(state => state.acao.loading);
  const updating = useAppSelector(state => state.acao.updating);
  const updateSuccess = useAppSelector(state => state.acao.updateSuccess);
  const handleClose = () => {
    props.history.push('/acao');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getCadastroDoacaos({}));
    dispatch(getSolicitacaos({}));
    dispatch(getCadastroUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dataCriacao = convertDateTimeToServer(values.dataCriacao);

    const entity = {
      ...acaoEntity,
      ...values,
      cadastroDoacao: cadastroDoacaos.find(it => it.id.toString() === values.cadastroDoacao.toString()),
      solicitacao: solicitacaos.find(it => it.id.toString() === values.solicitacao.toString()),
      cadastroUser: cadastroUsers.find(it => it.id.toString() === values.cadastroUser.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          dataCriacao: displayDefaultDateTime(),
        }
      : {
          ...acaoEntity,
          dataCriacao: convertDateTimeFromServer(acaoEntity.dataCriacao),
          cadastroDoacao: acaoEntity?.cadastroDoacao?.id,
          solicitacao: acaoEntity?.solicitacao?.id,
          cadastroUser: acaoEntity?.cadastroUser?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bioMobApp.acao.home.createOrEditLabel" data-cy="AcaoCreateUpdateHeading">
            Create or edit a Acao
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="acao-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Data Criacao"
                id="acao-dataCriacao"
                name="dataCriacao"
                data-cy="dataCriacao"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Usuario Criacao Acao"
                id="acao-usuarioCriacaoAcao"
                name="usuarioCriacaoAcao"
                data-cy="usuarioCriacaoAcao"
                type="text"
              />
              <ValidatedField label="Pendente" id="acao-pendente" name="pendente" data-cy="pendente" check type="checkbox" />
              <ValidatedField
                label="Data Execucao Acao"
                id="acao-dataExecucaoAcao"
                name="dataExecucaoAcao"
                data-cy="dataExecucaoAcao"
                type="date"
              />
              <ValidatedField label="Ativa" id="acao-ativa" name="ativa" data-cy="ativa" check type="checkbox" />
              <ValidatedField label="Observacoes" id="acao-observacoes" name="observacoes" data-cy="observacoes" type="text" />
              <ValidatedField id="acao-cadastroDoacao" name="cadastroDoacao" data-cy="cadastroDoacao" label="Cadastro Doacao" type="select">
                <option value="" key="0" />
                {cadastroDoacaos
                  ? cadastroDoacaos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="acao-solicitacao" name="solicitacao" data-cy="solicitacao" label="Solicitacao" type="select">
                <option value="" key="0" />
                {solicitacaos
                  ? solicitacaos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="acao-cadastroUser" name="cadastroUser" data-cy="cadastroUser" label="Cadastro User" type="select">
                <option value="" key="0" />
                {cadastroUsers
                  ? cadastroUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/acao" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AcaoUpdate;
