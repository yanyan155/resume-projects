export default class Search {
  constructor(query) {
    this.query = query;
    this.ids = [];
  }

  async httpRequestSearch() {
    const key = 'AIzaSyAxfbgsVbnwsMHqReQimHx5ptyX-ehHxY0';
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const tail = 'type=video&part=snippet&maxResults=15';
    const result = await fetch(`${url}?key=${key}&${tail}&q=${this.query}${this.createPageTokenString()}`);
    const data = await result.json();
    this.nextPageToken = data.nextPageToken;
    const items = data.items;
    this.ids = this.ids.concat(items.map(elem => elem.id.videoId));
    return this.ids;
  }

  createPageTokenString() {
    if (this.nextPageToken) {
      return `&pageToken=${this.nextPageToken}`;
    }
    return '';
  }

  async smoothLoading(firstItemCount) {
    if (this.ids.length - firstItemCount < 15) {
      await this.httpRequestSearch();
      return this.ids;
    }
    return false;
  }
}
