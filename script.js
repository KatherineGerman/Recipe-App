

const meals = document.getElementById('meals');

getRandomMeal();
fecthFavMeals();

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

   addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
        );
        const respData = await resp.json();
        const meal = respData.meals[0];

        return meal;

}

async function getMealsBySearch(term) {
const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );


}

function addMeal(mealData, random = false) {

    console.log(mealData);

    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${
                random
                    ? `
            <span class="random"> Random Recipe </span>`
                    : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>

            <button class="fav-btn" >
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn= meal.querySelector(".meal-body .fav-btn");
    
    btn.addEventListener('click', () => {

       if(btn.classList.contains("active")) {
           removeMealFromLs(mealData.idMeal);
           btn.classList.remove("active");
       }
       else{
        
        addMealToLS(mealData.idMeal);
        btn.classList.add("active");
       }

        //btn.classList.toggle("active");
    });

    meals.appendChild(meal);
}

function addMealToLS(mealId) {

   const mealIds = getMealsLS();

   localStorage.setItem("mealIds", JSON.stringify
   ([...mealIds, mealId]));
}

function removeMealFromLs(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds",

    JSON.stringify(mealIds.filter((id) => id
    !== mealId))
    );
    
    
    
}
function getMealsLS() {

    const mealIds =  JSON.parse(localStorage.
        getItem('mealIds'));

        return mealIds === null ? [] : mealIds;
}
async function fecthFavMeals() {
    const mealIds = getMealsLS();

    const mealId = [];

    for(let i=0; i<mealIds.getElementById; i++) {
        const mealId = mealIds[i];

        meal = await getMealById(mealId);
        meals.push(meal);

    }
    console.log(meals);

}