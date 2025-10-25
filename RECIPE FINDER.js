 
        const search = document.getElementById("search")
        const searchBtn = document.getElementById("searchBtn")
        const result = document.getElementById("result")
        
        searchBtn.addEventListener("click", function (){
            const searchTerm = search.value.trim();

            if(!searchTerm) {
            alert("please type a recipe name!");
            return;
        }
result.innerHTML= "<p>loading recipes....</p>";

const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${searchTerm}`;
const options = {
    method:"GET",
    headers: {
         "x-rapidapi-key": "232a73fda9msh3e89973d9539737p19be73jsna7996716fcc1",
    "x-rapidapi-host": "tasty.p.rapidapi.com" 
    }
    };

fetch(url, options)
.then(response => response.json())
.then(data => {
console.log(data);
result.innerHTML = "";

if (!data.results || data.results.length === 0) {
    result.innerHTML = "<p> No recipes found.</p>";
    return;
}
data.results.forEach(recipe => {

       const card = `
     <div style="border:1px solid #ccc; margin:10px; padding:10px; border-radius:8px;">
         <h3>${recipe.name}</h3>
     <img src="${recipe.thumbnail_url}" width="200" alt="${recipe.name}">
  <p>${recipe.description || "No description available."}</p>
    ${recipe.original_video_url ? '<a href="${recipe.original_video_url}" target="_blank">🎥 Watch Video</a>'
    : ""}
 </div>
  `;
    result.innerHTML += card;
      });
    })
    .catch(error => {
     console.error("Error:", error);
    result.innerHTML = "<p>Something went wrong. Please try again.</p>";
    });
       });


