// fetching data based on search and show error if input field is empty
const searchPhone = () =>{
    const searchField = document.getElementById('search-field');

    if(searchField.value == ''){
        document.getElementById('result-msg').style.display = 'none';
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('error-msg').innerText = 'Kichu toh likho naile khelbona 😿';

        // clear view data when showing error
        document.getElementById('phones-container').textContent = '';
        document.getElementById('load-more').textContent = '';
        document.getElementById('phone-details-container').textContent = '';
    }else{
        document.getElementById('error-msg').style.display = 'none';
        document.getElementById('phone-details-container').textContent = '';

        const searchValueText = searchField.value;
        searchField.value = '';

        //console.log(searchValueText);

        /* 
            Huawei
            Samsung
            Oppo
            Apple
            Iphone
        */
        
        // feting data from api based on search field
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValueText}`;
    
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
    }
}

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

// display phone data on website
const displayPhones = (phones) => {

    const phonesContainer = document.getElementById('phones-container');
    const loadContainer = document.getElementById('load-more');
    phonesContainer.textContent = '';
    loadContainer.textContent = '';

    // showing in ui how many result we get
    const lengthArr = phones.length
    console.log(phones);

    if(lengthArr < 1){
        // check is there any data based on search if no then show error
        document.getElementById('result-msg').innerHTML = `<p class="text-primary">Total result: ${lengthArr} 🤖</p>`;
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('error-msg').innerText = 'Tumi ja likhso tar sathe miliye kicchu pawa jaini 😿';
    }else if(lengthArr > 19){
        // showing only 20 result with load more option
        const limitPhones = phones.slice(0, 20);
        document.getElementById('result-msg').innerHTML = `<p class="text-primary">Total result: ${lengthArr}, Showing result: ${limitPhones.length} 🤖</p>`;

        // showing data
        limitPhones.forEach(phone => {
            displayResult(phone, phonesContainer);
        });

        // create a div and adding class 
        const loadDiv = document.createElement('div');
        loadDiv.classList.add('col-md-2', 'py-4')
        loadDiv.innerHTML = `<button onclick="${phones.slice(0, 25)}" class="btn btn-primary">Show more</button>`;
        loadContainer.appendChild(loadDiv);
        
    }else{
        document.getElementById('error-msg').style.display = 'none';
        document.getElementById('result-msg').innerHTML = `<p class="text-primary">Total result: ${lengthArr}, Showing result: ${lengthArr} 🤖</p>`;

        // showing data
        phones.forEach(phone => {
            displayResult(phone, phonesContainer);
        });
    }
}

const loadPhoneDetails = (slug) => {
    //console.log(slug);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (phone) => {
    console.log(phone);

    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.textContent = '';

    // create a div and adding class
    const div = document.createElement('div');
    div.classList.add('col-xl-12', 'col-md-12', 'col-sm-12');

    if(phone.releaseDate){
        releaseDate = phone.releaseDate;
    }else{
        releaseDate = 'No release date is found';
    }

    // showing data 
    div.innerHTML = 
        `<div class="card mb-3 p-3">
                <div class="row">
                <div class="col-md-4 col-5">
                    <img src="${phone.image}" class="img-fluid rounded-start h-75 alt="...">
                </div>
                <div class="col-md-8 col-8">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-5">
                                <h4 class="card-title">Brand name</h4>
                            </div>
                            <div class="col-md-7">
                                <h4 class="card-title">${phone.brand}</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <h5 class="card-title">Phone name</h5>
                            </div>
                            <div class="col-md-7">
                                <h5 class="card-title">${phone.name}</h5>
                            </div>
                        </div>
                    
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Relase Date</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${releaseDate}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Storage</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.mainFeatures.storage}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Display</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.mainFeatures.displaySize}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Chipset</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.mainFeatures.chipSet}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Memory</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.mainFeatures.memory}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Sensors</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.mainFeatures.sensors}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Bluetooth</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.others.Bluetooth}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">GPS</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.others.GPS}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">NFC</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.others.NFC}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">Radio</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.others.Radio}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">USB</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.others.USB}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <p class="card-title">WLAN</p>
                            </div>
                            <div class="col-md-7">
                                 <p class="card-title">${phone.others.WLAN}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    // appending data
    phoneDetailsContainer.appendChild(div);
}

// const showMore = (phones) =>{
//     console.log(phones);
// }