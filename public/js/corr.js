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
            const elemAssto = document.createElement('p');
            elemAssto.classList.add('assignedTo');
            const elemTrend = document.createElement('p');
            if (corrective.USER_DEFINED_1 === '' && corrective.USER_DEFINED_2 === '') {
                header.textContent = corrective.CORRECTIVE_ID;
            header.textContent = corrective.CORRECTIVE_ID + ' (' + corrective.USER_DEFINED_1 + ')';
            } else {
                if (corrective.USER_DEFINED_1 === '') {
                    header.textContent = corrective.CORRECTIVE_ID + ' (' + corrective.USER_DEFINED_2 + ')';
                } else {
                    header.textContent = corrective.CORRECTIVE_ID + ' (' + corrective.USER_DEFINED_1 + ')';
                }
            }

            // fix ANSI elipses
            let trend = corrective.NC_TREND;
            trend = trend.replace(/…/g, '...');
            elemTrend.textContent = trend;
            elemAssto.textContent = `Assigned to: ${corrective.ASSIGNED_TO}`;
            section.appendChild(header);
            section.appendChild(elemAssto);
            section.appendChild(elemTrend);

            main.appendChild(section);
        }
    })
}

getCorrectives();