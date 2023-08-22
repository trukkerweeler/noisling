const { get } = require("../../routes/expiry");

const url = 'http://localhost:3001/expiry';

let nextId = getNextId();
function getNextId() {
    try{ 
    fetch(url + '/nextId', { method: 'GET' })    
    .then(response => response.json())
    .then(data => {
        console.log(typeof(data));        
        return data;
    });
    } catch (err) {
        console.log(err);
    }
}

// Send form to database
const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {};
    entry['EXPIRATION_ID'] = getNextId();

    for (let field of formData.keys()) {
        entry[field] = formData.get(field);
    }
    console.log(entry);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    })
    .then(response => response.json())
    .then(createdEntry => {
        console.log(createdEntry);
        // getCorrectives();
    });
});
