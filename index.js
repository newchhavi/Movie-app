

let carousel_img = [


     "https://images.ui8.net/uploads/cover_1602827897308.jpg",

     "https://image.winudf.com/v2/image1/aGRmcmVlbW92aWVzLm1vdmllLmZyZWUubW92aWVzX3NjcmVlbl8wXzE2MDQwMjQzMTFfMDY1/screen-0.webp?fakeurl=1&type=.webp",


      "https://image.winudf.com/v2/image1/Y29tLmhkbW92aWVvbmxpbmUucGlrdHZvbm5saW5lLmhkdmlkZW9wbGF5ZXJfc2NyZWVuXzBfMTY3OTg2MDA0OV8wODk/screen-0.webp?fakeurl=1&type=.webp",

      "https://s3-alpha.figma.com/hub/file/3529743812/86bfc752-98b0-4bc1-a71e-c2784038cc62-cover.png",

      "https://image.winudf.com/v2/image1/Y29tLmZyZWUubW92aWUub25saW5lLmhkbW92aWVzZnJlZV9zY3JlZW5fMF8xNjA1MDA1NTcyXzA3OQ/screen-0.webp?fakeurl=1&type=.webp",
      
      "https://s3-alpha.figma.com/hub/file/1035967102/2be690db-d73c-484b-b698-11f94c021411-cover.png"


]

var i = 0;

let slides = ()=>{
    document.getElementById("slideImage").src = carousel_img[i]
    if(i<carousel_img.length-1){
        i++;
    }else{
        i = 0;

    }
}

setInterval(slides,1000)

// fetch Api

// let ApiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page="
let imageUrl = "https://image.tmdb.org/t/p/w1280"
// let searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
let movieData;
let pages = [1,2,3,4,5,6,7,8,9,10]
let current_page = 1;
let page = document.getElementById("currentPage")
page.innerText=current_page

let cont = document.getElementById("container");
const getMovies = async()=>{
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${current_page}`)
    const data = await res.json()
    console.log(data);
    movieData = data.results
    render_movies(movieData)
    
}
getMovies();


const render_movies = (data)=>{
    cont.innerHTML = null;
    data.forEach((ele)=>{
        const div = document.createElement("div");
        div.setAttribute("class" , "box");
        div.innerHTML = `
        <img src="${imageUrl+ele.poster_path}" alt = "Not Found"/>
        <div class = "title">
        <h3>${ele.title}</h3>
        <span>${ele.vote_average}</span>
    </div>
        <div class = "overlap">      
            <p id = "overview">${ele.overview}</p>
            <div id = "overviewBtn">
            <button class= "openModalBtn">View More</button> 
            <button class = "removeBtn">Delete</button>
            <button class = "editBtn">Edit</button></div>

        </div>
        
        `;
        cont.appendChild(div);

    })
    const modalButtons = document.querySelectorAll(".openModalBtn");
    modalButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            openModal(data[index]); // Pass the movie data to the modal function
        });
    });

    const removeBtn = document.querySelectorAll(".removeBtn");
    removeBtn.forEach((btn,index)=>{
        btn.addEventListener("click",()=>{
            data.splice(index,1);
            render_movies(data)
        })
    })
   
    

    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        openEditModal(data[index]);
  
      });
  
    });

}

const openModal = (movieData) => {
    console.log(movieData)
    const modalContent = `
        <div class="modal active">
        <h3 id = "title"> Title : ${movieData.title}</h3> 
        <img src="${imageUrl + movieData.poster_path}" alt="Not Found"/>
            <p id= "pop_overview">${movieData.overview}</p>
            <span id = "release">Release Date: ${movieData.release_date}</span>
            <button class="closeModalBtn">Close</button>
        </div>
    `;
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modalContainer");
    modalContainer.innerHTML = modalContent;

    // Append the modal container to the body
    document.body.appendChild(modalContainer);

    // Add a click event handler to the close button
    const closeModalBtn = modalContainer.querySelector(".closeModalBtn");
    closeModalBtn.addEventListener("click", () => {
        modalContainer.remove(); // Remove the modal when the close button is clicked
    });

    window.addEventListener("mousedown", (event) => {
        if (!modalContainer.contains(event.target)) {
      modalContainer.remove(); // Remove the modal when clicking outside of it
    //   console.log(modalContainer)
        }

    });

    window.onclick = function(ele){
        if(ele.target===modalContainer){
            modalContainer.style.display = "none"
        }
    }

    
}

// search functionality

// document.querySelector("#search").addEventListener("keyup",
// function(event){
//     // console.log(event.target.value);
//     if(event.target.value != ""){
//         getMovies(searchApi + event.target.value)
        
//     }else{
//         getMovies(ApiUrl)
//     }
// }
// )


// search function by applying debouncing
// let debounceTimer;
// let searchInput = document.getElementById("search")
// searchInput.addEventListener("keyup",(event)=>{
//     clearTimeout(debounceTimer)
   
//     const query = event.target.value;
//     // console.log(query)
//     debounceTimer = setTimeout(()=>{
//         if(query!==""){
//             getMovies(searchApi+query)
//         }else{
//             getMovies()
//         }
//     },2000)

// })

document.querySelector("#searchBtn").addEventListener("click", searchmovies);
async function searchmovies() {
  query = document.getElementById("search").value;
  console.log(query);
  let res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=04c35731a5ee918f014970082a0088b1`

  );

  let searchResult = await res.json();
  render_movies(searchResult.results);

}

// //sorting
function sortinglh(){

    let array = [...movieData].sort(function (a,b){
        return a.vote_average - b.vote_average;
    })
 render_movies(array)

}

function sortinghl() {
    let array = [...movieData].sort(function (a, b) {
      return  b.vote_average-a.vote_average;
    });

 render_movies(array)
  }



  document.querySelector("#sortbyrate").addEventListener("change", function sortbyRate(){
    let value = document.querySelector("#sortbyrate").value;
    if(value=="dsc"){
        let newData = [...movieData].sort((a,b)=>b.vote_average - a.vote_average)
        console.log(newData);
        render_movies(newData)
    }else{
        let newData = [...movieData].sort((a,b)=>a.vote_average - b.vote_average)
        console.log(newData);
        render_movies(newData)
    }

})

// pagination

const prev_btn = document.querySelector(".prev");
const next_btn = document.querySelector(".next");



prev_btn.addEventListener("click",()=>{
    if(current_page>1){
        current_page--;
        page.innerText=current_page
        getMovies()
    }
})

next_btn.addEventListener("click",()=>{
    current_page++;
    page.innerText=current_page
    getMovies()
    


})

let pageContainer = document.getElementById("pageContainer");
const renderPage = (data)=>{
    data.map((ele)=>{
        let btn = document.createElement("Button");
        btn.innerHTML = ele;
        btn.addEventListener("click" ,()=>{
            current_page =ele
            page.innerText = current_page
            getMovies()
        })
        pageContainer.append(btn)

    })


}

renderPage(pages)

// EditModal 



const openEditModal = (movieDatas, index) => {
    const editModal = document.createElement("div");
    editModal.classList.add("modal");
    const editModalContent = `
    <div class = "editForm">
      <h3 id = "editMovie">Edit Movie</h3>
      <label for="editTitle">Title:</label><br><br>
      <input type="text" id="editTitle" value="${movieDatas.title}"><br>

      <label for="editRate">Rate:</label><br><br>
      <input type="number" id="editRate" value="${movieDatas.vote_average}"><br>


      <label for="editOverview">Overview:</label><br><br>
      <textarea id="editOverview">${movieDatas.overview}</textarea><br>
      <label for="editReleaseDate">Release Date:</label><br><br>
      <input type="date" id="editReleaseDate" value="${movieDatas.release_date}"><br>
      <button class="saveEditBtn">Save</button><br>
      </div>
    `;

  
    editModal.innerHTML = editModalContent;
    const saveEditBtn = editModal.querySelector(".saveEditBtn");
    saveEditBtn.addEventListener("click", () => {
      movieDatas.title = document.getElementById("editTitle").value;
      movieDatas.overview = document.getElementById("editOverview").value;
      movieDatas.release_date = document.getElementById("editReleaseDate").value;
      movieDatas.vote_average = document.getElementById("editRate").value;
    
    //   render_movies(movieData)
      editModal.remove();
    });
  
    document.body.appendChild(editModal);
  
  };
  
   
  
   
  
   



