document.addEventListener("DOMContentLoaded", function () {

    // Funkcija kuri iesko vaisiaus 
    function searchFruits(searchTerm) {
        fetch(`https://www.fruityvice.com/api/fruit/${searchTerm}`)
            .then(response => response.json()) 
            .then(fruit => { // gaunam viena vaisiu
                if (fruit) { 
                    const fruitsContainer = document.getElementById("fruits-container");
                    fruitsContainer.innerHTML = ''; // vaisiu konteineri isvalom
                  
                    const cardElement = createFruitCard(fruit);
                    fruitsContainer.appendChild(cardElement);
                
                } else {
                    const fruitsContainer = document.getElementById("fruits-container");
                    fruitsContainer.innerHTML = '<p>Vaisių nerasta.</p>';
                }
            })
            .catch(error => {
                const fruitsContainer = document.getElementById("fruits-container");
                fruitsContainer.innerHTML = '<p>Vaisių nerasta.</p>';
                console.error("Error fetching fruits:", error);
            });
    }

    // funkcija gauna visus vaisius 
    function getAllFruits() {
        fetch(`https://www.fruityvice.com/api/fruit/all`)
            .then(response => response.json()) 
            .then(fruits => { 
                
                if (fruits && fruits.length > 0) { 
                    const fruitsContainer = document.getElementById("fruits-container");
                    fruitsContainer.innerHTML = ''; 
                  
                    fruits.forEach(fruit => { 
                        const cardElement = createFruitCard(fruit);
                        fruitsContainer.appendChild(cardElement);
                    });
                
                } else {
                    const fruitsContainer = document.getElementById("fruits-container");
                    fruitsContainer.innerHTML = '<p>Vaisių nerasta.</p>';
                }
            })
            .catch(error => console.error("Error fetching fruits:", error));
    }

    // uzdedam event listener paieskai
    document.getElementById("search-input").addEventListener("keypress", function (event) {

        if (event.key === "Enter") { 
            event.preventDefault();
            const searchInput = document.getElementById("search-input");
            const searchWord = searchInput.value.trim();
            if (searchWord !== "") { 
                searchFruits(searchWord);
            }
        }
    });

    // uzdedam event listener mygtukui show all
    document.getElementById("show-all-button").addEventListener("click", function (event) {
        event.preventDefault();
        const searchInput = document.getElementById("search-input");
        searchInput.value = "";
        getAllFruits();
    });

    // funkcija kurti vaisiaus kortele
    function createFruitCard(fruit) {
        
        const cardElement = document.createElement("div");
        cardElement.classList.add("card", "m-2", "rounded-4", "border", "border-0");
        cardElement.style.width = "24rem";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = fruit.name;
        cardBody.appendChild(cardTitle);
        

        const cardSubTitle = document.createElement("h6");
        cardSubTitle.classList.add("card-subtitle", "mb-2", "text-body-secondary");
        cardSubTitle.innerHTML = fruit.family + " • " + fruit.genus;
        cardBody.appendChild(cardSubTitle);

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerHTML = "Fruit nutritions:";
        cardBody.appendChild(cardText);

        const nutritionsList = document.createElement("ul");
        nutritionsList.classList.add("nutritions-list");

        const calories = document.createElement("li");
        calories.innerHTML = "calories: " + fruit.nutritions.calories;
        nutritionsList.appendChild(calories);

        const carbohydrates = document.createElement("li");
        carbohydrates.innerHTML = "carbohydrates: " + fruit.nutritions.carbohydrates;
        nutritionsList.appendChild(carbohydrates);

        const fat = document.createElement("li");
        fat.innerHTML = "fat: " + fruit.nutritions.fat;
        nutritionsList.appendChild(fat);

        const protein = document.createElement("li");
        protein.innerHTML = "protein: " + fruit.nutritions.protein;
        nutritionsList.appendChild(protein);

        const sugar = document.createElement("li");
        sugar.innerHTML = "sugar: " + fruit.nutritions.sugar;
        nutritionsList.appendChild(sugar);

        cardBody.appendChild(nutritionsList);
        cardElement.appendChild(cardBody);

        return cardElement;
    }

});