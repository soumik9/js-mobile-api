// default function
const displayStyle = (propertyId, propertyStyle) =>  document.getElementById(propertyId).style.display = propertyStyle;

/* ==================================================================
fetching data based on search and show error if input field is empty
==================================================================*/
const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    displayStyle('spinner','block');

    if(searchField.value == ''){
        displayStyle('spinner','none');
        displayStyle('result-msg','none');
        displayStyle('error-msg','block');
        document.getElementById('error-msg').innerText = 'Give some input to get result!';

        // clear view data when showing error
        document.getElementById('phones-container').textContent = '';
        document.getElementById('load-more').textContent = '';
        document.getElementById('phone-details-container').textContent = '';
    }else{
        displayStyle('spinner','block');
        displayStyle('error-msg','none');
        document.getElementById('phone-details-container').textContent = '';

        const searchValueText = searchField.value;
        searchField.value = '';
        
        // feting data from api based on search field
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValueText}`;
    
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
    }
}

/* ==========================
display phone data on website
============================*/
function displayResult(phone, phonesContainer){
    // create a div and adding class
    const div = document.createElement('div');
    div.classList.add('col-xl-4', 'col-md-4', 'col-sm-12');
    // showing data 
    div.innerHTML = 
        `<div class="card mb-3 p-3" style="max-width: 540px;">
                <div class="row justify-content-between g-0">
                <div class="col-md-5 col-5 h-100">
                    <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-6 col-6">
                    <div class="card-body">
                        <h2 class="card-title">${phone.brand}</h2>
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <button class="btn btn-primary mt-2" onclick="loadPhoneDetails('${phone.slug}')">Details</button>
                    </div>
                
                </div>
            </div>
        </div>`;
    // appending data
    phonesContainer.appendChild(div);
}

const displayPhones = (phones) => {
    // spinner display change
    displayStyle('spinner','none');

    const phonesContainer = document.getElementById('phones-container');
    const loadContainer = document.getElementById('load-more');
    phonesContainer.textContent = '';
    loadContainer.textContent = '';

    if(phones.length < 1){
        // check is there any data based on search if no then show error
        displayStyle('result-msg','block');
        displayStyle('error-msg','block');
        document.getElementById('result-msg').innerHTML = `<p class="text-primary">Total result: ${phones.length}</p>`;
        document.getElementById('error-msg').innerText = 'No data found based on your search';
    }else{
        // showing only 20 result with load more option
        const limitPhones = phones.slice(0, 20);
        document.getElementById('result-msg').style.display = 'block';
        document.getElementById('result-msg').innerHTML = `<p class="text-primary">Total result: ${phones.length}, Showing result: ${limitPhones.length ? limitPhones.length : phones.length} 🤖</p>`;

        limitPhones.forEach(phone => {
            displayResult(phone, phonesContainer);
        });

        // create a div and adding class 
        if(phones.length > 19){
            const loadDiv = document.createElement('div');
            loadDiv.classList.add('col-md-2', 'py-4')
            loadDiv.innerHTML = `<button onclick="showAll('${phones[0].brand}')" class="btn btn-primary">Show more</button>`;
            loadContainer.appendChild(loadDiv);
        }
    }
}

/* ==========================
load specific phone details 
============================*/
const loadPhoneDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (phone) => {
    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.textContent = '';
    // create a div and adding class
    const div = document.createElement('div');
    div.classList.add('col-xl-12', 'col-md-12', 'col-sm-12', 'col-12', 'mb-2');

    // showing data 
    div.innerHTML = 
        `<div class="card mb-3 p-3">
                <div class="row justify-content-lg-start justify-content-center">
                <div class="col-md-4 col-4">
                    <img src="${phone.image}" class="img-fluid rounded-start h-75 alt="...">
                </div>
                <div class="col-md-8 col-12">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <h4 class="card-title">Brand name</h4>
                            </div>
                            <div class="col-md-7 col-6">
                                <h4 class="card-title">${phone.brand}</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <h5 class="card-title">Phone name</h5>
                            </div>
                            <div class="col-md-7 col-6">
                                <h5 class="card-title">${phone.name}</h5>
                            </div>
                        </div>
                    
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <p class="card-title">Relase Date</p>
                            </div>
                            <div class="col-md-7 col-6">
                                 <p class="card-title">${phone.releaseDate ? phone.releaseDate : 'No release date is found'}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="text-center my-1">
                            <h4>Main features</h4>
                        </div>
                        <hr class="mb-1">
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <p class="card-title">Storage</p>
                            </div>
                            <div class="col-md-7 col-6">
                                 <p class="card-title">${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No storage data found'}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <p class="card-title">Display</p>
                            </div>
                            <div class="col-md-7 col-6">
                                 <p class="card-title">${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No display data found'}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <p class="card-title">Chipset</p>
                            </div>
                            <div class="col-md-7 col-6">
                                 <p class="card-title">${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No chipSet data found'}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <p class="card-title">Memory</p>
                            </div>
                            <div class="col-md-7 col-6">
                                 <p class="card-title">${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No memory data found'}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5 col-6">
                                <p class="card-title">Sensors</p>
                            </div>
                            <div class="col-md-7 col-6">
                                 <p class="card-title">${phone.mainFeatures.sensors.map(el => el).join(', ')}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="text-center my-1">
                            <h4>Others</h4>
                        </div>
                        <hr class="mb-1">

                        ${phone.others ? 
                            `<div class="row">
                                <div class="col-md-5 col-6">
                                    <p class="card-title">Bluetooth</p>
                                </div>
                                <div class="col-md-7 col-6">
                                    <p class="card-title">${phone.others.Bluetooth ? phone.others.Bluetooth : 'No bluetooth data found'}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 col-6">
                                    <p class="card-title">GPS</p>
                                </div>
                                <div class="col-md-7 col-6">
                                    <p class="card-title">${phone.others.GPS ? phone.others.GPS : 'No GPS data found'}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 col-6">
                                    <p class="card-title">NFC</p>
                                </div>
                                <div class="col-md-7 col-6">
                                    <p class="card-title">${phone.others.NFC ? phone.others.NFC : 'No NFC data found'}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 col-6">
                                    <p class="card-title">Radio</p>
                                </div>
                                <div class="col-md-7 col-6">
                                    <p class="card-title">${phone.others.Radio ? phone.others.Radio : 'No Radio data found'}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 col-6">
                                    <p class="card-title">USB</p>
                                </div>
                                <div class="col-md-7 col-6">
                                    <p class="card-title">${phone.others.USB ? phone.others.USB : 'No USB data found'}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-5 col-6">
                                    <p class="card-title">WLAN</p>
                                </div>
                                <div class="col-md-7 col-6">
                                    <p class="card-title">${phone.others.WLAN ? phone.others.WLAN : 'No WLAN data found'}</p>
                                </div>
                            </div>` : 'No others data found'}
 
                    </div>
                </div>
            </div>
        </div>`;
    // appending data
    phoneDetailsContainer.appendChild(div);
}

/* ==========================
Show more functionality 
============================*/
const showAll = (brand) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${brand}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllPhones(data.data));
}

const displayAllPhones = (phones) => {
    // spinner display change
    displayStyle('spinner','none');

    const phonesContainer = document.getElementById('phones-container');
    const loadContainer = document.getElementById('load-more');
    phonesContainer.textContent = '';
    loadContainer.textContent = '';

    displayStyle('error-msg','none');
    document.getElementById('result-msg').innerHTML = `<p class="text-primary">Total result: ${phones.length}, Showing result: ${phones.length}</p>`;

    // showing data
    phones.forEach(phone => {
        displayResult(phone, phonesContainer);
    });
}