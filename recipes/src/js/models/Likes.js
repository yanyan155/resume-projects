export default class Likes {
  constructor() {
    this.arr = [];
  }
  
  create(id, title, author, img) {
    const item = {
      title,
      author,
      img,
      id: id
    }
    this.arr.push(item);

    this.setToLocalStorage(this.arr);
    return item;
  }

  delete(id) {
    const index = this.arr.findIndex(elem => elem.id === id);
    this.arr.splice(index, 1);
    this.setToLocalStorage(this.arr);
  }

  isLiked(id) {
    const index = this.arr.findIndex(elem => elem.id === id);
    return (index === -1 ? false : true);
  }
  setToLocalStorage(value) {
    window.localStorage.setItem('likes', JSON.stringify(value));
  }
  getFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem('likes'));
  }


}