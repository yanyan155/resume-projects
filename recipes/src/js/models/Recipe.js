import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id
  }
  async httpRequest() {
    try {

      const key = 'e27bdefe5f0114fd257c56deda292c63';
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      //const proxy = '';
      const url = 'https://www.food2fork.com/api/get';
      
      let res = await axios(`${proxy}${url}?key=${key}&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.image = res.data.recipe.image_url;
      this.publisher = res.data.recipe.publisher;
      this.ingredients = res.data.recipe.ingredients;
      this.url = res.data.recipe.source_url;

    } catch(error) {
      console.log(error);
      alert("Something went wrong :(");
    }
  }
  calcTime() {
    // let assume that we need 15 min to cook 3 elements
    const parts = Math.ceil(this.ingredients.length / 3);
    const time = parts*15;
    this.time = time;
  }

  calcServing() {
    this.serving = 4;
  }

  rewriteIngredients() {
    const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitShort = ['tbsp','tbsp','oz','oz','tsp','cup','pound'];

    let newIngredients = this.ingredients.map(elem => {

      let ingredient = elem.toLowerCase();
      unitLong.forEach((str,i) => ingredient = ingredient.replace(str, unitShort[i]));
      // remove text in () brackets
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      //parse ingr to obj
      let IngObj;
      let splitIng = ingredient.split(' ');
      let unitIndex = splitIng.findIndex(element => unitShort.some(str => element.includes(str)));

      if(unitIndex > -1) {
        // contain unit, and 1 element is number
        let index = unitShort.findIndex(elem => splitIng[unitIndex].includes(elem));
        splitIng[unitIndex] = unitShort[index];
        if(unitIndex === 1) {
          IngObj = {
            count: eval(splitIng[0].replace('-','+')),
            unit: splitIng[unitIndex],
            description: splitIng.slice(unitIndex + 1).join(' ')
          }
        } else {
          // contain unit, and second element is number
          let values = splitIng.slice(0, unitIndex);
          values = values.filter(elem => parseInt(elem, 10));
          let str = values.reduce((prev , curr) => prev + '+' + curr);
          let value = eval(str.replace('-','+'));
  
          IngObj = {
            count: value,
            unit: splitIng[unitIndex],
            description: splitIng.slice(unitIndex + 1).join(' ')
          }
        }
      } else if(parseInt(splitIng[0])) {
        // no unit, but 1 element is number
        IngObj = {
          count: eval(splitIng[0].replace('-','+')),
          unit: '',
          description: splitIng.slice(1).join(' ')
        }
      } else {
        // no unit, and no number
        IngObj = {
          count: 0,
          unit: '',
          description: splitIng.join(' ')
        }
      }
      return IngObj;
    });
    this.ingredients = newIngredients;
  }
  recountIngredients(type) {
    // count servings
    const newServing = (type === 'inc' ? this.serving + 1 : this.serving - 1);

    // count multiplier for each elem
    this.ingredients.forEach(ing => {
      const newCount = ing.count*newServing/this.serving;
      ing.count = newCount;
    })

    this.serving = newServing;
  }

}