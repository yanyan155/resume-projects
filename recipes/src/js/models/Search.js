import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query
  }
  async httpRequest() {
    const key = 'e27bdefe5f0114fd257c56deda292c63'; 
    //const proxy = 'https://cors-anywhere.herokuapp.com/';
    const proxy = '';
    const url = 'https://www.food2fork.com/api/search';
    
    let res = await axios(`${proxy}${url}?key=${key}&q=${this.query}`);
    this.result = res.data.recipes;
  }
}



