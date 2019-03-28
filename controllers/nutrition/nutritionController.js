const db = require("../../models/nutrition/meal");

// Defining methods for the booksController
module.exports = {
  findAllNutrition: function (req, res) {
    console.log(req.query.q);
    let query = req.query.q;

    const BASE_URL = "https://trackapi.nutritionix.com/v2/search/instant?"+ query
    console.log(BASE_URL);

    const APP_ID = 'eb95abc3';
    const APP_KEY = '368d7805ed86900874f9dc4fb92aba0f';
    var options = {
      headers: { 'x-app-id': APP_ID, 'x-app-key': APP_KEY}
    };

    axios
    .get(BASE_URL, options)
    .then(function (response){ 
      //console.log(response.data.items[0])
      results = response.data.items;
      res.json(results);
    }
      //({ data: { results } }) => res.json(results)
      )
    .catch(err => res.status(422).json(err));

}
};