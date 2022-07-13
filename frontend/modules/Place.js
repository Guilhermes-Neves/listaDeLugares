import validator from "validator";

export default class Place {
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
    let valid = true;

    this.removeErros();

    if(nameInput.value === '') {
      this.createError(nameInput, 'Nome deve ser informado.');
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