require("dotenv").config();

const dev = false;
if (dev) {
    const url = 'http://localhost:3001/expiry';
} else {
    const url = 'https://noisling.onrender.com/expiry';
}


async function incrementNextId(nextId) {
    try {
        await fetch(url + '/increment', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nextId),
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (err) {
        console.log('Error:', err);
    }
}


// let nextId = getNextId();
// console.log(nextId);

async function getNextId() {
    try{ 
    const nextId = await fetch(url + '/nextId', { method: 'GET' })    
    .then(response => response.json())
    .then(data => {
        JSON.stringify(data);
        // console.log(typeof(data));
        // console.log(data);      
        return data;
    });
    } catch (err) {
        console.log(err);
    }
}

// Send form to database
const form = document.querySelector('form');
form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {};
    const nextId = await fetch(url + '/nextId', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        JSON.stringify(data);     
        return data;
    });
    entry['expiration_id'] = nextId;

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
    
    // reset the form
    document.getElementById("entryform").reset();
});
