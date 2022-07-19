import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <main>
        <label htmlFor="nomeCompleto">
          Nome Completo:
          <input
            type="text"
            id="nomeCompleto"
            data-testid="checkout-fullname"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            data-testid="checkout-email"
          />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input
            type="text"
            id="cpf"
            data-testid="checkout-cpf"
          />
        </label>
        <label htmlFor="telefone">
          Telefone:
          <input
            type="text"
            id="telefone"
            data-testid="checkout-phone"
          />
        </label>
        <label htmlFor="cep">
          CEP:
          <input
            type="text"
            id="cep"
            data-testid="checkout-cep"
          />
        </label>
        <label htmlFor="endereço">
          Endereço:
          <input
            type="text"
            id="endereço"
            data-testid="checkout-address"
          />
        </label>
      </main>
    );
  }
}

export default Checkout;
