export default class Swipe {
  constructor(startX) {
    this.startX = startX;
    this.endX = null;
    this.deltaX = 0;
  }

  putEndX(endX) {
    this.endX = endX;
  }

  isNeedtoList(page, nthLi) {
    let width = window.innerWidth;
    width = width > 1000 ? 1000 : width;
    this.deltaX = this.endX - this.startX;
    const moduleDeltaX = this.deltaX >= 0 ? this.deltaX : -this.deltaX;
    this.direction = this.deltaX >= 0 ? 'left' : 'right';
    if ((page === 0 && nthLi === 0 && this.direction === 'left') || width / 3 >= moduleDeltaX) {
      return false;
    }
    return true;
  }

  calculateDeltaX() {
    this.deltaX = this.startX - this.endX;
    return this.deltaX;
  }
}
