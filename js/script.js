// GLOBAL VARIABLES

const li = document.querySelectorAll('li')
const ul = document.querySelector('ul.student-list')
const headerDiv = document.querySelector('div.page-header')
const page = document.querySelector('div.page')
const perPage = 10

//create div to hold pagination links
const pageLinksContainer = document.createElement('div')
pageLinksContainer.className = "pagination"
page.append(pageLinksContainer)

//FUNCTIONS

// showPage function
// limits 10 list items to each "page"
// & specifies which 10 list items are shown
// on each "page"

const showPage = (list, section) => {

   const start = (section * perPage) - perPage
   const stop = (section * perPage)

   // Loop over items in the list parameter
   // How do I get this to work without line 32?
   for (let i=0; i<list.length; i+=1) {
      if (i >= start && i < stop) {
         list[i].style.display = "block"
      } else {
         list[i].style.display = "none"
      }
   }
}

//appendPageLinks function
//generates & adds functionality to pagination links

const appendPageLinks = (list) => {

   //generate a ul for pagination links
   //and append to pageLinksContainer

   const listOfPages = document.createElement("ul");
   pageLinksContainer.appendChild(listOfPages)

   //calculate number of pagination links to render

   let numberOfPages = Math.ceil(list.length / perPage);

   //render pagination links to page

   for (let i=0; i < numberOfPages; i++) {
      let pageLink = document.createElement("li")
      let pageLinkInnerHTML = `
         <a href=#>${i+1}</a>
      `
      pageLink.innerHTML = pageLinkInnerHTML;
      listOfPages.appendChild(pageLink);
   }

   //toggle which pagination link is active

   const pageButtons = document.querySelectorAll('a')

   const setAction = (e) => {
      for (let i=0; i<pageButtons.length; i++) {
         pageButtons[i].classList.remove('active')
      }
      const target = e.target
      target.classList.add('active')
   }

   // add event listeners to pagination links

   for(let i=0; i<pageButtons.length; i++) {
      pageButtons[i].addEventListener('click', (e) => {
         setAction(e)
         showPage(li, pageButtons[i].innerText)
      })
   }
}

//call functions
appendPageLinks(li)
showPage(li, 1)


//*~*~*~ exceeds code *~*~*~

//generate a div containing search bar
//& append to page

const searchDiv = document.createElement('div')
searchDiv.className = "student-search"
headerDiv.appendChild(searchDiv)

const searchBar = document.createElement('input')
searchBar.placeholder = "Search for students..."
searchDiv.appendChild(searchBar)

const noMatch = document.createElement('h2')
noMatch.innerText = "Sorry, no matches. Try again."

//handleSearch function
//filters through names based on search bar input
const handleSearch = (searchInput, names) => {
   //create an array to hold search matches
   let newList = []

   //clear pagination links
   pageLinksContainer.innerHTML = ""

   //conditional that instructs only search matches to render to page
   for (let i = 0; i < names.length; i++) {
      if(searchInput.length !== 0 && !names[i].textContent.toLowerCase().includes(searchInput.toLowerCase())) {
         names[i].style.display = "none"
      } else {
         names[i].style.display = "block"
         //append search matches to new array
         newList = [...newList, names[i]]
      }
   }
   
   //ternary operator instructs page to return
   //error message if search has no matches
   //OR append pagination links
   newList.length == 0 ? page.append(noMatch) : appendPageLinks(newList)

}

//add event listener to search bar
searchBar.addEventListener('keyup', (e) => {
   e.preventDefault()
   handleSearch(e.target.value, li)
})