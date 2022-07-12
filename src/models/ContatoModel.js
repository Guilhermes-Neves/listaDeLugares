const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
  }

  static async buscaPorId(id) {
    if (typeof id !== 'string');
    const contato = await ContatoModel.findById(id);
    return contato;
  }

  static async buscaContatos() {
    const contatos = await ContatoModel.find()
      .sort({ createdAt: -1 });
    return contatos;
  }

  static async delete(id) {
    if (typeof id !== 'string');
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
  }

  async edit(id) {
    if (typeof id !== 'string');
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  valida() {
    this.cleanUp();

    if (!this.body.name) this.errors.push('Nome deve ser informado.');

    if (!this.body.email && !this.body.phone) this.errors.push('E-mail ou telefone deve ser informado.');

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] != 'string') this.body[key] = '';

      this.body = {
        name: this.body.name,
        lastName: this.body.lastName,
        email: this.body.email,
        phone: this.body.phone
      }
    }
  }
}

module.exports = Contato;