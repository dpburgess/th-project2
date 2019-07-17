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

showPage(students, defaultPageNumber);
appendPageLinks(students);