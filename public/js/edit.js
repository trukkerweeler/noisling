import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const url = "http://localhost:3001/expiry";



const main = document.querySelector('main');
// const url = window.location.href;
// const id = url.split('=')[1];
// console.log(id);

const expid = document.querySelector('#expid');
const expidValue = expid.value;

const button = document.getElementById('detailsearch');
button.addEventListener('click', async (event) => {
    event.preventDefault();
    const caid = document.querySelector('#expid');    
    let expidValue = caid.value;
    if (expidValue.length === 0) {
        alert('Please enter a Corrective Action ID');
    } else {
        // console.log(expidValue);
        // console.log(expidValue.length);
        while (expidValue.length < 7) {
            expidValue = '0' + expidValue;
        }
    }

    const url = 'http://localhost:3001/expiry/' + expidValue;
    // console.log(url);


    // Delete the child nodes of the main element
    while (main.firstChild) {
        // if (main.firstChild.nodeName === 'section') {
            main.removeChild(main.firstChild);
            // section.remove();
        // }
    }


    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(record => {
        // console.log(record);
        for (const key in record) {
            const detailSection = document.createElement('section');
            detailSection.setAttribute('class', 'section');
            const elemRpt = document.createElement('h1');
            const elemId = document.createElement('h2');
            
            const elemDesc = document.createElement('p');
            const elemIA = document.createElement('p');
            const elemIaDate = document.createElement('p');
            const elemCause = document.createElement('p');
            elemIaDate.setAttribute('class', 'actiondate');
            // const elemCaDate = document.createElement('p');
            // elemCaDate.setAttribute('class', 'actiondate2');
            // const elemCC = document.createElement('p');

            const eid = document.createElement('p');
            eid.textContent = 'Expiry ID:' + ' ' + record[key]['EXPIRATION_ID'];
            eid.setAttribute('class', 'tbl');

            const expCreateDate = document.createElement('p');
            if (record[key]['CREATE_DATE'] === null) {
                expCreateDate.textContent = 'Create Date:' + ' ' + '';
            } else
                expCreateDate.textContent = 'Create Date:' + ' ' + record[key]['CREATE_DATE'].substring(0, 10);
            expCreateDate.setAttribute('class', 'tbl');
            
            const expExpiry = document.createElement('p');
            if (record[key]['EXPIRY_DATE'] === null) {
                expExpiry.textContent = 'Expiry:' + ' ' + '';
            } else {
                expExpiry.textContent = 'Expiry Date:' + ' ' + record[key]['EXPIRY_DATE'].substring(0, 10);
            }
            expExpiry.setAttribute('class', 'tbl');

            const pid = document.createElement('p');
            pid.textContent = 'Product ID:' + ' ' + record[key]['PRODUCT_ID'];
            pid.setAttribute('class', 'tbl');
            
            const lotID = document.createElement('p');
            lotID.textContent = 'Lot:' + ' ' + record[key]['LOT'];
            lotID.setAttribute('class', 'tbl');
            
            const expDispo = document.createElement('p');
            if (record[key]['DISPOSITION'] === null) {
                expDispo.textContent = 'Disposition:' + ' ' + '';
            } else {
                expDispo.textContent = 'Disposition:' + ' ' + record[key]['DISPOSITION'];
            }
            expDispo.setAttribute('class', 'tbl');

            const comments = document.createElement('p');
            if (record[key]['COMMENT'] === null) {
                comments.textContent = 'Comments:' + ' ' + '';
            }
            else {
                comments.textContent = 'Comments:' + ' ' + record[key]['COMMENT'];
            }
           

            const ncTrendTitle = document.createElement('h3');
            const correctionTrendTitle = document.createElement('h3');
            const causeTitle = document.createElement('h3');
            // const controlTextTitle = document.createElement('h3');
            const linebreak = document.createElement('br');

            elemRpt.textContent = 'Expiry Detail';
            elemRpt.setAttribute('class', 'header');

            detailSection.appendChild(eid);
            detailSection.appendChild(expCreateDate);
            detailSection.appendChild(pid);
            detailSection.appendChild(lotID);
            detailSection.appendChild(expExpiry);
            detailSection.appendChild(expDispo);
            detailSection.appendChild(comments); 

            main.appendChild(elemRpt);
            main.appendChild(elemId);
            main.appendChild(detailSection);
        }
        // main.appendChild(detailSection);

        // const editButton = document.createElement('button');
        // editButton.setAttribute('class', 'edit');
        // editButton.setAttribute('id', 'edit');
        // editButton.textContent = 'Edit';
        // main.appendChild(editButton);
        // main.appendChild(detailSection);

    });
});


// Listen for edit button click
const edit = document.getElementById('edit');
edit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Edit button clicked');
    // console.log(expidValue);
    // window.location.href = 'http://localhost:3001/expiry/edit/' + expidValue;

    const editExpiry = document.createElement('dialog');
    editExpiry.setAttribute('id', 'editExpiry');
    editExpiry.setAttribute('class', 'dialog');
    editExpiry.setAttribute('open', 'open');
    const editForm = document.createElement('form');
    editForm.setAttribute('id', 'editForm');
    editForm.setAttribute('class', 'form');
    const editSection = document.createElement('section');

});
