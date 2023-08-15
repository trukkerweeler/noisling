const url = 'http://localhost:3000/corrective';

function getCorrectives () {
    const main = document.querySelector('main');
    
    fetch(url, { method: 'GET' })

    .then(response => response.json())
    .then(correctives => {
        console.log(correctives);
        for (let corrective of correctives) {
            const section = document.createElement('section');
            const header = document.createElement('h2');
            header.textContent = corrective.ASSIGNED_TO;
            section.appendChild(header);
            
            const form = document.createElement('form');
            form.action = '/corrective/' + corrective.CORRECTIVE_ID + "/flip";
            form.method = 'POST';
            const currentClosed = document.createElement('p');
            currentClosed.textContent = `Current Closed Status: ${corrective.CLOSED || 'N'}`;

            form.appendChild(currentClosed);
            const flipClosed = document.createElement('button');
            flipClosed.textContent = 'Flip Closed Status';
            form.appendChild(flipClosed);
            section.appendChild(form);



            main.appendChild(section);
        }
    })
}

getCorrectives();