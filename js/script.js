/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const students = document.getElementsByClassName('student-item');
const pageSize = 10;
const pageNumber = 1;


//without javascript enabled all students people will show up on the page
//with javascript 10 people at a time will show up
// need to display those 10 people depending on what page number is entered into showPage function
const showPage = (list, page) => {
   const startIndex = (page * pageSize) - pageSize;
   const endIndex = (page * pageSize);


 for(let i = 0; i < list.length; i++) {
   if (i >= startIndex && i < endIndex) {
      list[i].style.display = 'block';
   } else {
      list[i].style.display = 'none';
   }
 }
}


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

showPage(students, 1);
appendPageLinks(students);