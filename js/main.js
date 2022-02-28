// fetching data based on search and show error if input field is empty
const searchPhone = () =>{
    const searchField = document.getElementById('search-field');

    if(searchField.value == ''){
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('result-msg').style.display = 'none';
        document.getElementById('error-msg').innerText = 'Kichu toh likho naile khelbona 😿';
    }else{
        document.getElementById('error-msg').style.display = 'none';

        const searchValueText = searchField.value;
        searchField.value = '';
        console.log(searchValueText);
        
        // feting data from api based on search field
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValueText}`;
    
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
    }
}

// display phone data on website
const displayPhones = (phones) => {

    const phonesContainer = document.getElementById('phones-container');

    // showing in ui how many result we get
    const lengthArr = phones.length
    document.getElementById('result-msg').innerHTML = `<p class="text-primary">Total result: ${lengthArr} 🤖</p>`;

    console.log(phones);

    if(lengthArr < 1){
        // check is there any data based on search if no then show error
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('result-msg').style.display = 'block';
        document.getElementById('error-msg').innerText = 'Tumi ja likhso tar sathe miliye kicchu pawa jaini 😿';
    }else{
        document.getElementById('error-msg').style.display = 'none';
        document.getElementById('result-msg').style.display = 'block';

        // showing data
        phones.forEach(phone => {
            // create a div and adding class
            const div = document.createElement('div');
            div.classList = 'col-xl-4 col-md-4 col-sm-12';
    
            // showing data 
            div.innerHTML = 
                `<div class="card mb-3 p-3" style="max-width: 540px;">
                        <div class="row justify-content-between g-0">
                            <div class="col-md-5 h-100">
                                <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h1 class="card-title">${phone.brand}</h1>
                                    <h5 class="card-title">${phone.phone_name}</h5>
                                </div>
                            </div>
                        </div>
                    </div>`;
            // appending data
            phonesContainer.appendChild(div);
        });
    }
}