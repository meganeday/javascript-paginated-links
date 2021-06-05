// Global Variables

const li = document.querySelectorAll("li")
const perPage = 10;

// showPage function
// limits 10 list items to each "page"
// & specifies which 10 list items are shown
// on each "page"

const showPage = (list, section) => {

   const start = (section * perPage) - perPage;
   const stop = (section * perPage);

   // Loop over items in the list parameter
   // How do I get this to work without line 32?
   for (let i=0; i<list.length; i+=1) {
      if (i >= start && i < stop) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none"
      }
   }
}

//appendPageLinks function
//generates & adds functionality to pagination links

const appendPageLinks = (list) => {

   //generate a container for pagination links
   //and append to page

   const page = document.querySelector('div.page')
   const container = document.createElement('div');
   container.className = "pagination";
   page.appendChild(container);
   
   const listOfPages = document.createElement("ul");
   container.appendChild(listOfPages);
   
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
         setAction(e);
         showPage(li, pageButtons[i].innerText);
      })
   }
}

//call functions

appendPageLinks(li);
showPage(li, 1);