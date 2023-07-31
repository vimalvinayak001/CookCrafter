let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
          let ingredient = myMeal[`strIngredient${i}`];
          let measure = myMeal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
            ingredients.push({ number: i, ingredient: `${measure} ${ingredient}` });
          }
        }
        console.log(ingredients);
        result.innerHTML = `
          <img src=${myMeal.strMealThumb}>
          <div class="details">
              <h2>${myMeal.strMeal}</h2>
              <h4>${myMeal.strArea}</h4>
          </div>
          <div id="ingredient-con">
              <h3>Ingredients:</h3>
              <ul id="ingredient-list"></ul>
          </div>
          <div id="recipe" style="display: none;">
              <button id="hide-recipe">X</button>
              <pre id="instructions">${myMeal.strInstructions}</pre>
          </div>
          <button id="show-recipe">View Recipe</button>
        `;

        let ingredientList = document.getElementById("ingredient-list");
        ingredients.forEach((ingredientObj) => {
          let listItem = document.createElement("li");
          listItem.setAttribute("data-number", ingredientObj.number);
          listItem.innerText = ingredientObj.ingredient;
          ingredientList.appendChild(listItem);
        });

        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");
        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
          showRecipe.style.display = "block";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
          showRecipe.style.display = "none";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
});
