import validator from "validator";

export default class UserForm {
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
    const emailInput = el.querySelector('#input-email');
    const passwordInput = el.querySelector('#input-password');
    let valid = true;

    this.removeErros();

    if(!validator.isEmail(emailInput.value)) {
      this.createError(emailInput, 'Informe um e-mail válido.');
      valid = false;
    }


    if (passwordInput.value.length < 3 || passwordInput.value.length > 12) {
      this.createError(passwordInput, 'Senha precisa estar entre 3 e 12 caracteres.');
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