

document.addEventListener('DOMContentLoaded', (e) => {
    axios.get('https://crudcrud.com/api/71705d17b2214fcbb9b63e7c99e31449/products')
    .then((response)=>{
        for(let i of response.data){
            printHistory(i);
        }
    })
    .catch(err=>console.log(err));
});

function onbuttonclick(e){

    //preventing the default behaviour of form submit
    e.preventDefault();
    //getting all the values of form on submit
    const price = document.getElementById('price').value;
    const product = document.getElementById('product').value;
    const category = document.getElementById('category').value;
    //console.log(price,product,category);

    //creating a object of product details
    let productDetails = {
        'price' : price,
        'product' : product,
        'category' : category
    };
    // console.log(productDetails);
    
    // using axios for storing product details to crudcrud endpoint
    axios.post('https://crudcrud.com/api/71705d17b2214fcbb9b63e7c99e31449/products',productDetails)
    .then((response)=>{
        console.log(response);
        printHistory(response.data);
    })
    .catch(err=>console.log(err));
    
}

function printHistory(obj){
    // console.log(obj);
    //getting product history list and creating a new list item child in it
    const electronic_ul = document.getElementById('electronic-list');
    const food_ul = document.getElementById('food-list');
    const skincare_ul = document.getElementById('skincare-list');
    const li = document.createElement('li');
    //modifying newly created list item
    li.appendChild(document.createTextNode(`${obj.price} - ${obj.category} - ${obj.product}`));
    li.id = obj._id;
    li.className = 'list-group-item';
    //creating edit and delete button and adding them to list item
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger btn-sm float-right delete';
    delBtn.appendChild(document.createTextNode('Delete'));
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-info btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    
    //when edit button is clicked
    editBtn.addEventListener('click', (e)=>{
        document.getElementById('price').value = obj.price;
        document.getElementById('product').value = obj.product;
        document.getElementById('category').value = obj.category;
        li.remove();
        axios.delete(`https://crudcrud.com/api/71705d17b2214fcbb9b63e7c99e31449/products/${obj._id}`)
        .then((response)=>{
                console.log(response.data);
        })
        .catch(err=>console.log(err));
        
    });
    //when delete button is clicked
    delBtn.addEventListener('click', (e)=>{
        axios.delete(`https://crudcrud.com/api/71705d17b2214fcbb9b63e7c99e31449/products/${obj._id}`)
        .then((response)=>{
            console.log('Deleted');
            li.remove();
        })
        .catch(err=>console.log(err));
    });


    if(obj.category=='Electronic Items'){
        electronic_ul.appendChild(li);
    }
    else if(obj.category=='Food Items'){
        food_ul.appendChild(li);
    }
    else{
        skincare_ul.appendChild(li);
    }
}