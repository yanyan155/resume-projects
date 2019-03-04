export default class Clips {
  constructor(array) {
    this.clips = [];
    this.ids = array;
    this.page = 1;
    this.itemsPerPage = 4;
  }

  createClip(data) {
    const id = data.id;
    const image = data.snippet.thumbnails.default.url;
    const title = data.snippet.localized.title;
    const author = data.snippet.channelTitle;
    const views = data.statistics.viewCount;
    const date = data.snippet.publishedAt;
    const description = data.snippet.localized.description;
    const item = {
      id,
      image,
      title,
      author,
      views,
      date,
      description,
    };
    this.clips.push(item);
  }

  async httpRequestClips(array) {
    this.slint = 'thx slint';
    const idString = array.reduce((prev, curr) => `${prev},${curr}`);
    const key = 'AIzaSyAxfbgsVbnwsMHqReQimHx5ptyX-ehHxY0';
    const url = 'https://www.googleapis.com/youtube/v3/videos';
    const tail = 'part=snippet,statistics';
    const result = await fetch(`${url}?key=${key}&${tail}&id=${idString}`);
    const data = await result.json();
    return data.items;
  }
}
