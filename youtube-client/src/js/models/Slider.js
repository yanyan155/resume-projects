export default class Clips {
  constructor() {
    this.page = 0;
    this.itemsPerPage = 4;
    this.nthLi = 0;
    this.firstItemCount = 0;
    this.countNthLi = 3;
  }

  calculateItemsPerPage() {
    const width = document.documentElement.clientWidth;
    const oldItemsPerPage = this.itemsPerPage;
    if (width < 520) {
      this.itemsPerPage = 1;
    } else if (width < 770) {
      this.itemsPerPage = 2;
    } else if (width < 1020) {
      this.itemsPerPage = 3;
    } else if (width > 1020) {
      this.itemsPerPage = 4;
    }
    return oldItemsPerPage !== this.itemsPerPage;
  }

  findIdtoLoad(ids) {
    this.firstItemCount = (this.page * this.countNthLi + this.nthLi) * this.itemsPerPage;
    this.lastItemCount = (this.page * this.countNthLi + this.nthLi) * this.itemsPerPage + this.itemsPerPage;
    this.idsToLoad = ids.slice(this.firstItemCount, this.lastItemCount);
  }

  changePage(direction) {
    if (direction === 'left' && this.page !== 0) {
      this.page--;
    } else if (direction === 'right') {
      this.page++;
    }
  }

  changeNthLi(direction) {
    if (direction === 'left') {
      if (this.nthLi === 0) {
        this.changePage(direction);
        this.nthLi = this.countNthLi - 1;
      } else {
        this.nthLi--;
      }
    } else if (direction === 'right') {
      if (this.nthLi + 1 === this.countNthLi) {
        this.changePage(direction);
        this.nthLi = 0;
      } else {
        this.nthLi++;
      }
    }
  }

  recalcilatePageAndNthLi() {
    this.page = Math.floor(this.firstItemCount / this.countNthLi / this.itemsPerPage);
    this.nthLi = Math.floor((this.firstItemCount / this.countNthLi) % this.itemsPerPage);
  }
}
