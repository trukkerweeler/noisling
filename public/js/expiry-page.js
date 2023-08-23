// const url = 'http://localhost:3001/expiry';
const url = 'https:noisling.onrender.com/expiry';

function getRecords () {
    const main = document.querySelector('main');
    
    fetch(url, { method: 'GET' })

    .then(response => response.json())
    .then(records => {
        // console.log(records);
        const table = document.createElement('table');
        table.id = 'expirytable';
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const header = document.createElement('tr');
        for (let key in records[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            header.appendChild(th);
        }
        thead.appendChild(header);

            for (let record of records) {
                const tr = document.createElement('tr');
                for (let key in record) {
                    const td = document.createElement('td');
                    switch (key) {
                        case 'EXPIRY':
                            const date = new Date(record[key]);
                            td.textContent = date.toLocaleDateString();
                            break;
                        case 'DISPOSITION':
                            td.textContent = record[key];
                            td.setAttribute('contenteditable', 'true');
                            break;
                        default:
                            td.textContent = record[key];
                    }

                    tr.appendChild(td)}
            const button = document.createElement('button');
            // button.action = 'expiry/' + record;
            // button.method = 'PUT';
            // const parentNode = tr.parentNode;
            button.textContent = 'Save';
            button.className = 'savebtn';
            tr.appendChild(button);
            
            tbody.appendChild(tr);

        }
        table.appendChild(thead);
        table.appendChild(tbody);
        main.appendChild(table);

    })
    .then(() => {
        // Get the parent node of the selected button
        const expirytable = document.getElementById('expirytable');
        if (expirytable){
            expirytable.addEventListener('click', event => {
                // console.log(event.target.tagName);
                if (event.target.tagName === 'BUTTON') {
                    const tr = event.target.parentNode;
                    const disposition = tr.querySelector('td:nth-child(5)').textContent;
                    const id = tr.querySelector('td:nth-child(1)').textContent;
                    console.log(disposition, id);
                    fetch(url + '/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ disposition, id }),
                    })
                    .then(response => response.json())
                    .then(updatedRecord => {
                        console.log(updatedRecord);
                    });
                }
            });
        }
    })
    .catch(err => console.log(err));

    // .then(() => {

}

getRecords();