import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Registro
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="username"
              label="Usuário"
              placeholder={'Seu nome de usuário'}
              validate={{
                required: { value: true, message: 'Seu nome de usuário é obrigatório.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Seu usuário é inválido.',
                },
                minLength: { value: 1, message: 'É obrigatório ter pelo menos 1 caractere.' },
                maxLength: { value: 50, message: 'Não é permitido mais que 50 caracteres.' },
              }}
              data-cy="username"
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder={'Seu email'}
              type="email"
              validate={{
                required: { value: true, message: 'Seu email é obrigatório.' },
                minLength: { value: 5, message: 'É obrigatório ter pelo menos 1 caractere.' },
                maxLength: { value: 254, message: 'Não é permitido mais que 50 caracteres.' },
                validate: v => isEmail(v) || 'Seu email é inválido.',
              }}
              data-cy="email"
            />
            <ValidatedField
              name="firstPassword"
              label="Senha"
              placeholder={'Insira sua senha'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, message: 'Sua senha é obrigatória.' },
                minLength: { value: 4, message: 'É obrigatório ter pelo menos 1 caractere.' },
                maxLength: { value: 50, message: 'Não é permitido mais que 50 caracteres.' },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="secondPassword"
              label="Confirme a senha"
              placeholder="Confirme sua senha"
              type="password"
              validate={{
                required: { value: true, message: 'Sua senha de confirmação é obrigatória.' },
                minLength: { value: 4, message: 'É obrigatório ter pelo menos 1 caractere.' },
                maxLength: { value: 50, message: 'Não é permitido mais que 50 caracteres.' },
                validate: v => v === password || 'As senhas não são iguais!',
              }}
              data-cy="secondPassword"
            />

            <ValidatedField
              name="nome"
              label="Nome"
              placeholder={'Seu nome'}
              validate={{
                minLength: { value: 2, message: 'É obrigatório ter pelo menos 2 caractere.' },
                maxLength: { value: 75, message: 'Não é permitido mais que 75 caracteres.' },
              }}
              data-cy="nome"
            />
            <ValidatedField
              name="telefone"
              label="Telefone"
              placeholder={'Informe seu telefone com DDD'}
              validate={{
                minLength: { value: 6, message: 'É obrigatório ter pelo menos 6 caractere.' },
                maxLength: { value: 20, message: 'Não é permitido mais que 20 caracteres.' },
              }}
              data-cy="telefone"
            />
            <ValidatedField
              name="tipo"
              label="Tipo"
              placeholder={'Tipo de pessoa Ex: ONG, Pessoa física, etc'}
              validate={{
                minLength: { value: 2, message: 'É obrigatório ter pelo menos 2 caractere.' },
                maxLength: { value: 30, message: 'Não é permitido mais que 30 caracteres.' },
              }}
              data-cy="tipo"
            />
            <ValidatedField
              name="pais"
              label="País"
              placeholder={'Seu País'}
              validate={{
                minLength: { value: 2, message: 'É obrigatório ter pelo menos 2 caractere.' },
                maxLength: { value: 35, message: 'Não é permitido mais que 35 caracteres.' },
              }}
              data-cy="pais"
            />
            <ValidatedField
              name="estado"
              label="Estado"
              placeholder={'Seu Estado'}
              validate={{
                minLength: { value: 2, message: 'É obrigatório ter pelo menos 2 caractere.' },
                maxLength: { value: 30, message: 'Não é permitido mais que 30 caracteres.' },
              }}
              data-cy="estado"
            />
            <ValidatedField
              name="cidade"
              label="Cidade"
              placeholder={'Sua cidade'}
              validate={{
                minLength: { value: 1, message: 'É obrigatório ter pelo menos 1 caractere.' },
                maxLength: { value: 30, message: 'Não é permitido mais que 30 caracteres.' },
              }}
              data-cy="cidade"
            />
            <ValidatedField
              name="logradouro"
              label="Logradouro"
              placeholder={'Sua rua'}
              validate={{
                minLength: { value: 3, message: 'É obrigatório ter pelo menos 3 caractere.' },
                maxLength: { value: 50, message: 'Não é permitido mais que 50 caracteres.' },
              }}
              data-cy="logradouro"
            />
            <ValidatedField
              name="numero"
              label="Número"
              placeholder={'Infome o número de sua residência'}
              validate={{
                minLength: { value: 1, message: 'É obrigatório ter pelo menos 1 caractere.' },
                maxLength: { value: 6, message: 'Não é permitido mais que 6 caracteres.' },
              }}
              data-cy="numero"
            />
            <ValidatedField
              name="complemento"
              label="Complemento"
              placeholder={'Ex: Muro azul, apt 5'}
              validate={{
                minLength: { value: 2, message: 'É obrigatório ter pelo menos 2 caractere.' },
                maxLength: { value: 50, message: 'Não é permitido mais que 50 caracteres.' },
              }}
              data-cy="complemento"
            />
            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              Registrar
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
