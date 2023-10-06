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
            comments.setAttribute('id', 'exstcmmt');
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

            // create edit button
            const edtBtn = document.createElement('button');
            edtBtn.setAttribute('data-open-modal', '');
            edtBtn.setAttribute('type', 'button');
            edtBtn.setAttribute('class', 'show');
            edtBtn.textContent = 'Edit';

            detailSection.appendChild(eid);
            detailSection.appendChild(expCreateDate);
            detailSection.appendChild(pid);
            detailSection.appendChild(lotID);
            detailSection.appendChild(expExpiry);
            detailSection.appendChild(expDispo);
            detailSection.appendChild(comments);
            // detailSection.appendChild(edtBtn);

            // Create the form
            const appendForm = document.createElement('form');
            appendForm.setAttribute('id', 'appendForm');

            // Create Disposition selection
            const appendLabelD = document.createElement('label');
            appendLabelD.setAttribute('for', 'disposition');
            appendLabelD.textContent = 'Disposition';
            const appendInputD = document.createElement('input');
            // Create a select element
            const appendSelectD = document.createElement('select');
            appendSelectD.setAttribute('name', 'disposition');
            appendSelectD.setAttribute('id', 'disposition');
            // Create options
            const appendOptionD0 = document.createElement('option');
            const appendOptionD1 = document.createElement('option');
            appendOptionD1.setAttribute('value', 'D');
            appendOptionD1.textContent = 'Disposed';
            const appendOptionD2 = document.createElement('option');
            appendOptionD2.setAttribute('value', 'G');
            appendOptionD2.textContent = 'Gone/Not Found';
            const appendOptionD3 = document.createElement('option');
            appendOptionD3.setAttribute('value', 'O');
            appendOptionD3.textContent = 'Other';

            //  append child nodes to the select element
            appendSelectD.appendChild(appendOptionD0);
            appendSelectD.appendChild(appendOptionD1);
            appendSelectD.appendChild(appendOptionD2);
            appendSelectD.appendChild(appendOptionD3);
            
            // append child nodes to the form
            appendForm.appendChild(appendLabelD);
            appendForm.appendChild(appendSelectD);

            // Create Comment field
            const appendLabelC = document.createElement('label');
            appendLabelC.setAttribute('for', 'comment');
            appendLabelC.textContent = 'Comment';
            const appendInputC = document.createElement('input');
            appendInputC.setAttribute('type', 'textarea');
            appendInputC.setAttribute('name', 'comment');
            appendInputC.setAttribute('id', 'comment');
            appendInputC.setAttribute('placeholder', 'Enter comment');            
            
            // create button
            const appendButton = document.createElement('button');
            appendButton.setAttribute('type', 'submit');
            appendButton.setAttribute('id', 'appendButton');
            appendButton.textContent = 'Submit';

            // Append child nodes to the form
            appendForm.appendChild(appendLabelC);
            appendForm.appendChild(appendInputC);
            // appendForm.appendChild(appendButton);
            

            main.appendChild(elemRpt);
            main.appendChild(elemId);
            main.appendChild(detailSection);
            // main.appendChild(appendForm);
            
        }
    });
});


// Listen for edit button click
const openButton = document.getElementById('data-open-modal');
const submitButton = document.getElementById('appendButton');
const closeButton = document.getElementById('data-close-modal');
const modal = document.querySelector("[data-modal]");

openButton.addEventListener('click', (event) => {
    modal.showModal();

});

closeButton.addEventListener('click', (event) => {
    modal.close();
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.close();
    // console.log('submit button clicked');
    const expid = document.querySelector('#expid');
    const expidValue = expid.value;
    let longExpidValue = expidValue.padStart(7, '0');
    const oldCmmt = document.querySelector('#exstcmmt');
    const oldCmmtValue = oldCmmt.textContent.slice(10, oldCmmt.textContent.length);
    const disposition = document.querySelector('#disposition');
    const dispositionValue = disposition.value;
    const comment = document.querySelector('#comment');
    const commentValue = comment.value;


    // console.log(longExpidValue);
    // console.log("Disposition: " + dispositionValue);
    // console.log(commentValue);

    const url = 'http://localhost:3001/expiry/' + longExpidValue;
    console.log(url);

    // Create timestamped comment
    const myDate = new Date();
    myDate.setDate(myDate.getDate())
    let myTimeStamp = myDate.toISOString().slice(0, 19).replace('T', ' ');
    // console.log(myRequestDate);

    // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // const dateTime = date + ' ' + time;
    // console.log(dateTime);
    // let tsComment = dateTime + ' ' + commentValue;
    // console.log(tsComment);

    const data = {
        disposition: dispositionValue,
        comment: commentValue,
        oldCmmt: oldCmmtValue,
        user: 'TKENT',
        ts: myTimeStamp
    };
    // console.log(data);

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Record updated successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

