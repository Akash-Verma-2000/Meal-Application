//****************** CONTENT APPEARING ON THE HOME PAGE STARTS ***********************
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let response = fetch(url);//FETCHING API

response.then((value) => {
    return value.json();
}).then((value) => {
    console.log(value);
    let iHTML = "";
    for (i in value) {
        for (j = 0; j < value[i].length; j++) {

            iHTML += ` <div class="col-12 col-md-6 col-lg-4  my-5 d-flex justify-content-evenly" >
             <div class="card my-cards" style="width: 30rem;">
                         <img src="${value[i][j].strMealThumb}" class="card-img-top " alt="dish-img">
                         <div class="card-body">
                             <h2 class="card-title">${value[i][j].strMeal}</h2>
                             <p>Category: ${value[i][j].strCategory} </p>
                             <p>Made by: ${value[i][j].strArea} </p>
                             <div class="my-card-buttons">
                             <a href="#" class="btn btn-primary my-more-details-btn" onclick="showMealDetails('${value[i][j].strMealThumb}', '${value[i][j].strMeal}','${value[i][j].strArea}','${value[i][j].strCategory}', '${value[i][j].strMeasure1}','${value[i][j].strIngredient1}','${value[i][j].strIngredient2}','${value[i][j].strIngredient3}','${value[i][j].strIngredient4}','${value[i][j].strIngredient5}',  '${value[i][j].strTags}' )">More Details</a>
                             <i class="bi bi-suit-heart-fill my-add-to-fav-btn" onclick="addFavList('${value[i][j].strMealThumb}','${value[i][j].strMeal}','${value[i][j].strArea}','${value[i][j].strCategory}')"></i>
                             </div>
                        </div>
                  </div></div>`
        }
    }
    document.getElementById("my-content-cards").innerHTML = iHTML;
})
//********************** CONTENT APPEARING ON THE HOME PAGE ENDS ******************************

//*********** THIS FUNCTION WILL DELETE THE ITEMS FROM THE FAVOURITE LIST STARTS **************
function deleteFavList(index, name) {
    let favData = JSON.parse(localStorage.getItem("favItem")) ?? []; //GETTING THE DATA FROM THE LOCAL STORAGE
    favData.splice(index, 1);                                       //DELETING THE DATA FROM THE ARRAY   
    localStorage.setItem("favItem", JSON.stringify(favData));       //UPDATING THE DATA IN THE LOCAL STORAGE
    displayFavList();                                               //DIPLAYING THE UPDATED LIST
    document.getElementById("my-notification-bar").style.background = "red";   //CHANGING THE COLOR OF NOTICE BAR
    document.getElementById("my-notification-bar").style.display = "block";    //MAKING IT VISIBLE
    document.getElementById("my-notice").innerHTML = `${name} has been removed `;//CHANGING MESSAGE
}
//*********** THIS FUNCTION WILL DELETE THE ITEMS FROM THE FAVOURITE LIST ENDS **************

//*********** THIS FUNCTION WILL DISPLAY THE DATA IN THE FAVOURITE LIST STARTS **************
function displayFavList() {
    document.getElementById("my-search-bar").style.display = "none";        //MAKING SEARCH BAR INVISIBLE
    document.getElementById("my-search-result-sec").style.display = "none"; //MAKING SEARCH RESULTS INVISIBLE
    document.getElementById("my-cont-sec").style.display = "none";          //MAKING HOME PAGE CONTENT INVISIBLE
    document.getElementById("more-details-page").style.display = "none"     //MAKING DETAILS PAGE INVISIBLE

    let favData = JSON.parse(localStorage.getItem("favItem")) ?? []; //GETTING THE DATA FROM THE LOCAL STORAGE

    if (favData.length == 0) { // CHECKING IF THE STORAGE ARRAY IS EMPTY TO CHANGE MESSAGE ACCORDINGLY
        document.getElementById("my-first-heading").innerHTML = "Sorry! But You Did't Add Anything ";
    } else {
        document.getElementById("my-first-heading").innerHTML = "My Favourite Meals";
    }

    let iHTML = "";     //UNDATING THE FAVOURITES LIST'S INNER HTML
    favData.forEach((element, index) => {
        iHTML += ` 
        <div class="col-12 col-sm-12 col-md-6 col-lg-4  my-5 d-flex justify-content-evenly " id="dish-cards">
            <div class="card my-cards" style="width: 30rem;">
                <img src="${element.pic}" class="card-img-top " alt="dish-img">
                <div class="card-body">
                <h2 class="card-title">${element.name}</h2>
                <p>Category: ${element.category} </p>
                <p>Made by: ${element.area} </p>
                <div class="my-card-buttons">
                <i class="bi bi-x-lg my-add-to-fav-btn" onclick="deleteFavList('${index}','${element.name}')"></i>
                </div>
                </div>
                </div>
                </div>`
    });

    document.getElementById("fav-page").innerHTML = iHTML;
}
//*********** THIS FUNCTION WILL DISPLAY THE DATA IN THE FAVOURITE LIST ENDS **************

//************************THIS WILL MAKE THE NOTIFICATION BAR INVISIBLE STARTS***********************
function removeNotification() {
    document.getElementById("my-notification-bar").style.display = "none"; //REMOVE THE BAR WHEN CLICKED 
}
//************************THIS WILL MAKE THE NOTIFICATION BAR INVISIBLE ENDS**************************

//*******************THIS FUNCTION WILL ADD THE MEALS TO THE FAVOURITES LIST STARTS**************
function addFavList(pic, name, area, category) {

    let favData = JSON.parse(localStorage.getItem("favItem")) ?? []; //GETTING THE DATA FROM THE LOCAL STORAGE
    for (let elem of favData) {
        if (elem.name == name) { //CHECHING IF THE LIST ALREADY HAS THE MEAL ADDED
            document.getElementById("my-notification-bar").style.background = "#02f7e7"; //CHANGING THE COLOR
            document.getElementById("my-notification-bar").style.display = "block";//MAKING NOTICE VISIBLE
            document.getElementById("my-notice").innerHTML = `${name} is already added `;// CHANGING MESSAGE 
            return;// CLOSE THE FUNCTION THE MEAL IS ALREADY ADDED
        }
    }
    favData.push({ //ADDING THE OBJECT TO THE STORAGE ARRAY
        "pic": pic,
        "name": name,
        "area": area,
        "category": category
    })
    localStorage.setItem("favItem", JSON.stringify(favData));//UPDATING THE LOCAL STORAGE

    document.getElementById("my-notification-bar").style.background = "#76fa02";//CHANGING THE COLOR OF NOTICEBAR
    document.getElementById("my-notification-bar").style.display = "block";//MAKING THE NOTICE BAR VISIBLE
    document.getElementById("my-notice").innerHTML = `${name} has been added `;//CHANGING THE MESSAGE 
}
//*******************THIS FUNCTION WILL ADD THE MEALS TO THE FAVOURITES LIST ENDS**********************

//*******************THIS FUNCTION WILL SHOW THE MORE DETAILS PAGE STARTS**********************
function showMealDetails(img, name, area, category, quantity, tags, ing1, ing2, ing3, ing4, ing5,) {
    document.getElementById("my-first-heading").innerHTML = `Let's Try ${name} once`; //CHANGING THE TOP HEADING
    document.getElementById("my-search-bar").style.display = "none"; //MAKING SEARCH BAR IN VISIBLE
    document.getElementById("my-cont-sec").style.display = "none"; //MAKING HOME PAGE CONTENT SECTION INVISIBLE
    document.getElementById("my-search-result-sec").style.display = "none"; //MAKING SEARCH RESULT INVISIBLE

    document.getElementById("more-details-page").innerHTML = `<div class="row">
    <div class="col" >
        <div class="card mb-3 more-details-card"  style="max-width: 100%;">
            <div class="row g-0" >
                <div class="col-md-4">
                    <img src="${img}" class="img-fluid rounded-start more-details-img" alt="Meals's pic">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h2 class="card-title mb-4">${name}</h2>
                        <p class="card-text">Made by: ${area}</p>
                        <p class="card-text">Category: ${category}</p>
                        <p class="card-text">Quantity: ${quantity}</p>
                        <p class="card-text">Ingredients: ${ing1}, ${ing2}, ${ing3}, ${ing4}, ${ing5}</p>
                        <p class="card-text">Tags: ${tags}</p>
                        <div class="my-card-buttons">
                            <i class="bi bi-suit-heart-fill my-add-to-fav-btn " onclick="addFavList('${img}','${name}','${area}','${category}')" ></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>`;
}
//*******************THIS FUNCTION WILL SHOW THE MORE DETAILS PAGE ENDS**********************

//*******************THIS FUNCTION WILL SHOW THE SEARCH RESULTS ENDS**********************
let serchBar = document.getElementById("my-search-input"); //PUTTING THE SEARCH BAR IN A VARIABLE
serchBar.addEventListener("keyup", () => {  // FUNCTION WILL WORK THE MOMENT USER LET THE KEY UP
    //GETTING THE VALUE OF SEARCH BAR IN UPPER CASE
    let seachValue = document.getElementById("my-search-input").value.toUpperCase();
    let url2 = "https://www.themealdb.com/api/json/v1/1/search.php?s="; 
    let response2 = fetch(url2);//FEATCHING THE API
    response2.then((value) => {
        return value.json();
    }).then((value) => {

        let iHTML = "";

        for (i in value) {

            for (j = 0; j < value[i].length; j++) {
                let dishName = value[i][j].strMeal.toUpperCase();//CONVERTING THE MEAL NAME INTO UPPER CASE 
                //COMPARING IF THE USER INPUT IS PRESENT IN THE STARTING OF THE NAME STRING OF THE MEAL NAME 
                if (dishName.indexOf(seachValue) == 0) {  
                    //UDPADING THE SEARCH RESULT VALUE
                    iHTML += `      
                     
                    <div class="col-12 col-md-6 col-lg-4  my-5 d-flex justify-content-evenly ">
                    <div class="card my-cards" style="width: 30rem;">
                                <img src="${value[i][j].strMealThumb}" class="card-img-top " alt="dish-img">
                                <div class="card-body">
                                    <h2 class="card-title">${value[i][j].strMeal}</h2>
                                    <p>Category: ${value[i][j].strCategory} </p>
                                    <p>Made by: ${value[i][j].strArea} </p>
                                    <div class="my-card-buttons">
                                    <a href="#" class="btn btn-primary my-more-details-btn food" onclick="showMealDetails('${value[i][j].strMealThumb}', '${value[i][j].strMeal}','${value[i][j].strArea}','${value[i][j].strCategory}', '${value[i][j].strMeasure1}','${value[i][j].strIngredient1}','${value[i][j].strIngredient2}','${value[i][j].strIngredient3}','${value[i][j].strIngredient4}','${value[i][j].strIngredient5}',  '${value[i][j].strTags}')" >More Details</a>
                                    <i class="bi bi-suit-heart-fill my-add-to-fav-btn" onclick="addFavList('${value[i][j].strMealThumb}','${value[i][j].strMeal}','${value[i][j].strArea}','${value[i][j].strCategory}')"></i>
                                                                       </div>
                                                                  </div>
                                                            </div></div>`;
                };
                document.getElementById("my-search-results").innerHTML = iHTML;
            }
        }
    })
})
