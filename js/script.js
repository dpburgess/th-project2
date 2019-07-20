/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// creating an array of the students, a variable to specify how many students per page, and then which number page this app should start on
const students = document.getElementsByClassName('student-item');
const pageSize = 10;
const defaultPageNumber = 1;


// without javascript enabled all students will show up on the page
// with javascript 10 people at a time will show up
// need to display those 10 people depending on what page number is entered into showPage function
const showPage = (list, page) => {
   const startIndex = (page * pageSize) - pageSize; // 0, 10, 20
   const endIndex = (page * pageSize); // 10, 20, 30

   // if the index of the student is not in the range then hide them
   // also unhides a student once they become in range
   for(let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

// create html dynamically to add to the bottom of the page for pagination
const appendPageLinks = list => {
   const page = document.querySelector('div.page');
   const totalLinks = Math.ceil(list.length / pageSize);
   const divElement = document.createElement('div');
   const ulElement = document.createElement('ul');
   divElement.className = 'pagination';
   divElement.appendChild(ulElement);

   for (let i = 1; i <= totalLinks; i++) {
      const liElement = document.createElement('li');
      const linkElement = document.createElement('a');

      // fires the showPage function when a link is clicked
      linkElement.addEventListener('click', (e) => {

         // remove active class from any a element
         for (let j = 0; j < totalLinks; j++) {
            const links = document.querySelectorAll('a');
            links[j].className = '';
         }

         e.target.className = 'active';
         showPage(list, i);
      });

      linkElement.href = '#';
      linkElement.textContent = (i);
      liElement.appendChild(linkElement);
      ulElement.appendChild(liElement);
   }

   ulElement.firstElementChild.firstElementChild.className = 'active';
   page.appendChild(divElement);
}

// start the app here with a call to the two methods
showPage(students, defaultPageNumber);
appendPageLinks(students);

// appends the search bar to the page when the page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
   addSearch();
});

// creating the search bar
const addSearch = () => {
   const pageHeader = document.querySelector('.page-header');
   const searchDiv = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchButton = document.createElement('button');
   searchDiv.className = 'student-search';
   searchButton.textContent = 'Search';
   searchInput.placeholder = 'Search for students...';
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   pageHeader.appendChild(searchDiv);


   // adding a click event handler to the search bar and a keyup event handler
   const searchButton1 = document.getElementsByTagName('button')[0];
   searchButton1.addEventListener('click', (e) => {
      const contents = document.getElementsByTagName('input')[0].value.toLowerCase();
      searchFeature(students, contents);
   });

   searchInput.addEventListener('keyup', (e) => {
      const contents = document.getElementsByTagName('input')[0].value.toLowerCase();
      searchFeature(students, contents);
   });
}

// the actual work of searching if the input value is found in the list of students
const searchFeature = (list, contents) => {
   const pageParent = document.querySelector('div.page');
   const pagination = document.querySelector('.pagination');
   const results = [];
   for (let i = 0; i < list.length; i++) {
      if (list[i].firstElementChild.firstElementChild.nextElementSibling.textContent.toLowerCase().includes(contents)) {
         results.push(list[i]);
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }

   if (results.length > 0) {
      const emptyResultsMsg = document.querySelector('.empty');
      if (emptyResultsMsg) {
         pageParent.removeChild(emptyResultsMsg)
      }

      if (pagination) {
         pageParent.removeChild(pagination);
      }
      showPage(results, 1);
      appendPageLinks(results);
   } else {
      noResults();
   }
}

// when no results are found display a message
const noResults = () => {
   const pageParent = document.querySelector('div.page');
   const pagination = document.querySelector('.pagination');
   const studentListParent = document.querySelector('.student-list');
   const empty = document.querySelector('.empty');
   if (pagination) {
      pageParent.removeChild(pagination);
   }

   if (!empty) {
      const message = 'There were not any matches.  Please try again.'
      const container = document.createElement('div');
      const messageH3 = document.createElement('h3');
      container.className = 'empty';
      messageH3.textContent = message;
      container.appendChild(messageH3);
      pageParent.insertBefore(container, studentListParent);
   }
}
