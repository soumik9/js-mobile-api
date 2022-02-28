// fetching data based on search and show error if input field is empty
const searchPhone = () =>{
    const searchField = document.getElementById('search-field');

    if(searchField.value == ''){
        document.getElementById('error-msg').style.display = 'block';
        document.getElementById('error-msg').innerText = 'Kichu toh likho naile khelbona';
    }else{
        document.getElementById('error-msg').style.display = 'none';

        const searchValueText = searchField.value;
        searchField.value = '';
        console.log(searchValueText);
        
        // feting data from api based on search field
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValueText}`;
    
        fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
    }
}