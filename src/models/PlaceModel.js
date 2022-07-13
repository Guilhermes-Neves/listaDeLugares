const mongoose = require('mongoose');
const validator = require('validator');

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: false, default: '' },
  visited: { type: Boolean, required: false, default: false },
  createdAt: { type: Date, default: Date.now }
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

class Place {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.place = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    this.isVisited();
    console.log(this.body)
    this.place = await PlaceModel.create(this.body);
  }

  static async buscaPorId(id) {
    if (typeof id !== 'string');
    const place = await PlaceModel.findById(id);
    return place;
  }

  static async searchPlaces() {
    const place = await PlaceModel.find()
      .sort({ createdAt: -1 });
    return place;
  }

  static async delete(id) {
    if (typeof id !== 'string');
    const place = await PlaceModel.findOneAndDelete({ _id: id });
    return place;
  }

  async edit(id) {
    if (typeof id !== 'string');
    this.valida();
    if (this.errors.length > 0) return;
    this.isVisited();
    console.log(this.body)
    this.place = await PlaceModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  isVisited() {
    if (this.body.visited === 'on') {
      this.body = {
        name: this.body.name,
        comment: this.body.comment,
        visited: true
      }
    };
  }

  valida() {
    this.cleanUp();

    if (!this.body.name) this.errors.push('Nome deve ser informado.');
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] != 'string') this.body[key] = '';

      this.body = {
        name: this.body.name,
        comment: this.body.comment,
      }
    }
  }
}

module.exports = Place;