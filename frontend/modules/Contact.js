import validator from "validator";

export default class Contact {
  constructor(form) {
    this.form = document.querySelector(form);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    }) 
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validate(e)) {
      this.form.submit();
    }
  }

  validate(e) {
    const el = e.target;
    const nameInput = el.querySelector('#input-name');
    const emailInput = el.querySelector('#input-email');
    const phoneInput = el.querySelector('#input-phone');
    let valid = true;

    this.removeErros();

    if(nameInput.value === '') {
      this.createError(nameInput, 'Nome deve ser informado.');
      valid = false;
    }

    if(!validator.isEmail(emailInput.value)) {
      this.createError(emailInput, 'Informe um e-mail válido.');
      valid = false;
    }


    if (!emailInput.value && !phoneInput.value) {
      this.createError(emailInput, 'E-mail ou telefone deve ser informado.');
      this.createError(phoneInput, 'E-mail ou telefone deve ser informado.');
      valid = false;
    }

    return valid;
  }

  removeErros() {
    const msgErros = document.querySelectorAll('.msg-error')

    msgErros.forEach(erro => {
      erro.remove();
    })
  }

  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.setAttribute('class', 'text-danger msg-error');
    field.insertAdjacentElement('afterend', div)
  }
}