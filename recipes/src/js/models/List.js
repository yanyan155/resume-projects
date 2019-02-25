import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.array = [];
  }
  
  create(count, unit, description) {
    const item = {
      count,
      unit,
      description,
      id: uniqid()
    }
    this.array.push(item);
    return item;
  }

  updateCount(id, count) {
    this.array.find(elem => elem.id === id).count = count;
  }

  delete(id) {
    const index = this.array.findIndex(elem => elem.id === id);
    this.array.splice(index, 1);
  }
}