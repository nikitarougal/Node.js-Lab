function fetchData() {
    //Fetch data, using The National Bank's API
    fetch("https://www.nbrb.by/api/exrates/rates?periodicity=0")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Response not ok.');
        })
        .then(data => { //iterate through the data received via API, and create a ceparate row for each currency
            const html = data
                .map(rate => {
                    return `
            <li class="table-row">
            <div class="col col-1" data-label="Currency abbreviation">${rate.Cur_Abbreviation}</div>
            <div class="col col-2" data-label="Number of units of foreign currency">${rate.Cur_Scale} ${rate.Cur_Name}</div>
            <div class="col col-3" data-label="Official rate">${rate.Cur_OfficialRate}</div>
            <div class="col col-4" data-label="Currency ID">${rate.Cur_ID}</div>
            </li>
        `;
                })
                .join('');
            //retrieve the current date
            const onDate = `on ${data[0].Date.split('T')[0]}`;
            console.log(onDate)
            document.querySelector('#app').insertAdjacentHTML('afterbegin', html);
            document.querySelector('#date').innerHTML = onDate;
        })
        .catch(error => console.error('Error:', error))
}

fetchData();
