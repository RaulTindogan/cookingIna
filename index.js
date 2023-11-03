const searchBtn = document.getElementById('submit-btn')
const searchForm = document.getElementById('search-form')
const searchResult = document.getElementById('result')
const modal = document.getElementById('modal')
const modalFooter = document.getElementById('modal-footer')
const searchText = document.getElementById('ingredients-input')

searchForm.addEventListener('submit', (e)=> {
    e.preventDefault();
})

searchBtn.addEventListener('click', ()=> {
    // Use to Store html elements
    let div = ''

    // Get Input
    let toSearch = searchText.value
    if(!toSearch) {
        alert('Please Enter an Ingredient')
    }else {
        // Show the loader while fetching data
        searchResult.classList.add('inactive')
        loader.classList.toggle('active')
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${toSearch}`)
        .then (response => response.json())
        .then (data => {
            // Hide the loader after data is fetched
            setTimeout(() => {
                loader.classList.toggle('active')
                searchResult.classList.remove('inactive')
            }, 1000);
        if(data.meals === null) {
            div+=`<h2 class="text-black">No Recipe Match to Your Ingredient</h2>`
        } else {
            data.meals.forEach(meal => {
                div+= `
                        <div class="meal-container d-flex flex-column flex-wrap meal-container px-2 py-3 border border-2 rounded">
                            <div class="position-relative mb-3">   
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="thumbnail border rounded">
                                <h3 class="fw-bold meal-name">${meal.strMeal}</h3>
                            </div>
                            <button class="recipe-btn py-2 border rounded" id=${meal.idMeal}  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Get Recipe</button>
                        </div>
                    `
            });
        }
            searchResult.innerHTML=div
    })
    }
    
})

// If the user click to any recipe it will call the mealRecipe function
searchResult.addEventListener('click', mealRecipe)

// Function called after clicking to get recipe and displaying a modal that contains informations about the meal
function mealRecipe(e) {
    e.preventDefault();

    // This will store the Id of the chosen recipe
    let mealItem = e.target.id

    // This condition tests the clicked element if it has a class of recipe-btn, if it has, it will fetch the 
    // data in api using the id of the meal that is stored in (mealItem) variable, if false it will return nothing
    if(e.target.classList.contains('recipe-btn')) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem}`)
        .then (response => response.json())
        .then (data => {
            getMeal(data.meals[0])
        })
    } else return
    
}

// This function will show the data of the selected meal after clicking the (Get Recipe) Button
function getMeal(meal) {
    modalFooter.innerHTML = `
    <a href="${meal.strYoutube}" class="custom-btn">Watch Here</a>
    `

    modal.innerHTML = `
        <h2 class="text-center">${meal.strMeal}</h2>
        <h3 class="fw-bold">Category</h3>
        <p class="text-center">${meal.strCategory}</p>
        <img src="${meal.strMealThumb}" alt=${meal.strMeal} class="thumbnail mb-3 border rounded">
        <h3 class="fw-bold my-4">Instruction</h3>
        <p>${meal.strInstructions}</p>
    `
}