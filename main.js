//Page 1 (Initialize Landing/Home Page)

fetchData('best-seller-home');
fetchData('new-arrival-home');
fetchData('shop-dropdown');

//Page 2

const popular = document.getElementById('popular');
const bestSeller = document.getElementById('best-selling');
const newest = document.getElementById('newest');
const cheapest = document.getElementById('cheapest-price');
const allBrand = document.getElementById('all-brand');
const myModal = document.getElementById('myModal');
const cartButton = document.getElementById('cart-btn');
const itemCount = document.getElementById('item-count');
const sendMail = document.getElementById('checkout');


popular.addEventListener('click', sortButton);
bestSeller.addEventListener('click', sortButton);
newest.addEventListener('click', sortButton);
cheapest.addEventListener('click', sortButton);
allBrand.addEventListener('click', filterCheckBox);
myModal.addEventListener('show.bs.modal', modalFetch);
cartButton.addEventListener('click', cartModal);
sendMail.addEventListener('click', sendEmail);

const addCart = [];

const cartStorage = localStorage.getItem('addCart');
if (cartStorage) {
    let countStoreItem = 0;
    for (let cartStore of JSON.parse(cartStorage)) {
        addCart.push(cartStore);
        countStoreItem++;
    }
    
    itemCount.textContent = countStoreItem;
    cartModal();

 } else {
    itemCount.textContent = '0'
}


function navigationButton(event) {
    const category = document.querySelectorAll('.category a');
    for (let list of category) {
        list.classList.remove('active');

        if (list.id === event) {
            list.classList.add('active');
        }
    }
    fetchData();
}

function sortButton(event) {
    const category = document.querySelectorAll('.category a');
    for (let list of category) {
        list.classList.remove('active');

        if (list.id === event.target.id) {
            list.classList.add('active');
        }
    }
    fetchData();
}

function filterCheckBox(event) {
    console.log(event.target);
    const vivo = document.getElementById('VIVO');
    const oppo = document.getElementById('OPPO');

    if (event.target.id === 'all-brand' && event.target.checked === true) {
        const brands = document.querySelectorAll('#brands-list .brands');
        for (let brand of brands) {
            brand.checked = true;
        }
    } else if (event.target.id === 'all-brand' && event.target.checked === false) {
        const brands = document.querySelectorAll('#brands-list .brands');
        for (let brand of brands) {
            brand.checked = false;
        }
    } else if (event.target.id === 'OPPO' && event.target.checked === false) {
        allBrand.checked = false;

    } else if (event.target.id === 'VIVO' && event.target.checked === false) {
        allBrand.checked = false;

    } else if (oppo.checked === true && vivo.checked === true) {
        allBrand.checked = true;

    }

    fetchData();
}


function fetchData(event) {

    return fetch('https://raw.githubusercontent.com/FloresJerome/Gizmotronix-ecommerce/main/smartphone-product.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response error');
            }
            return response.json();
        })
        .then(data => {

            if (event === 'best-seller-home') {
                for (let x = 0; x < 8; x++) {
                    let bestSellerList = data.product;
                    let soldItem = 0;
                    let count = 0;
                    let itemIndex = 0;

                    for (let item of bestSellerList) {
                        if (soldItem < item.rating.sold) {
                            soldItem = item.rating.sold;
                            itemIndex = count;
                        }
                        count++;
                    }

                    let starRating = '';

                    if (bestSellerList[itemIndex].rating.rate == 5) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate > 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate == 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate > 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate == 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate > 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate == 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate > 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (bestSellerList[itemIndex].rating.rate == 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else {
                        starRating = 'No Rating';
                    }

                    const newArrival = document.getElementById('best-seller');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${bestSellerList[itemIndex].id}>
                                                            <div class="inner"><img class="card-img-top" src="${bestSellerList[itemIndex].image.thumbnail}"></div>
                                                            <div class="card-body p-2 text-center">
                                                                    <div>
                                                                            <p class="card-text fw-bolder">${bestSellerList[itemIndex].title}</p>
                                                                            <div id="price-quantity">
                                                                                <span>${bestSellerList[itemIndex].price.currency} ${bestSellerList[itemIndex].price.value}</span><br>
                                                                                <span class="text-dark">${bestSellerList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                                    
                                                                                <div class="d-flex justify-content-center text-warning my-4 align-items-center">
                                                                                        ${starRating}
                                                                                        <span class="text-dark ms-1">| ${bestSellerList[itemIndex].rating.sold} Sold</span>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            
                                                                    </div>
                                                            </div>
                                                    </div>`;
                    newArrival.appendChild(productContainer);

                    bestSellerList.splice(itemIndex, 1);

                }
            } else if (event === 'new-arrival-home') {
                for (let y = 0; y < 8; y++) {
                    let newArrivalList = data.product;
                    let newItem = newArrivalList[0].rating.sold;
                    let count = 0;
                    let itemIndex = 0;

                    for (let item of newArrivalList) {
                        if (newItem > item.rating.sold) {
                            newItem = item.rating.sold;
                            itemIndex = count;
                        }
                        count++;
                    }

                    let starRating = '';

                    if (newArrivalList[itemIndex].rating.rate == 5) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate > 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate == 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate > 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate == 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate > 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate == 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate > 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (newArrivalList[itemIndex].rating.rate == 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else {
                        starRating = 'No Rating';
                    }

                    const newArrival = document.getElementById('new-arrival');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${newArrivalList[itemIndex].id}>
                                                    <div class="inner"><img class="card-img-top" src="${newArrivalList[itemIndex].image.thumbnail}"></div>
                                                    <div class="card-body p-2 text-center">
                                                            <div>
                                                                    <p class="card-text fw-bolder">${newArrivalList[itemIndex].title}</p>
                                                                    <div id="price-quantity">
                                                                        <span>${newArrivalList[itemIndex].price.currency} ${newArrivalList[itemIndex].price.value}</span><br>
                                                                        <span class="text-dark">${newArrivalList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                                
                                                                        <div class="d-flex justify-content-center text-warning my-4 align-items-center">
                                                                                ${starRating}
                                                                                <span class="text-dark ms-2">| ${newArrivalList[itemIndex].rating.sold} Sold</span>
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                </div>`;
                    newArrival.appendChild(productContainer);

                    newArrivalList.splice(itemIndex, 1);
                }
            } else if (event === 'shop-dropdown') {

                data.product.forEach(item => {
                    const dropDownList = document.querySelectorAll('#shop-dropdown li a');
                    let count = 0;

                    for (let list of dropDownList) {
                        if (item.brand === list.textContent) {
                            count++;
                        }
                    }

                    if (count === 0) {
                        const list = document.createElement('li');
                        const shopDropDown = document.getElementById('shop-dropdown');
                        list.innerHTML = `<a class="dropdown-item" onclick="nextContent('${item.brand}')">${item.brand}</a>`;
                        shopDropDown.appendChild(list);
                    }
                });
            } else if (event === 'initializeFilter') {

                data.product.forEach(item => {
                    const productList = document.querySelectorAll('#brands-list div input');
                    let count = 0;
                    for (let list of productList) {
                        if (item.brand === list.id) {
                            count++;
                        }
                    }

                    if (count === 0) {
                        const list = document.createElement('div');
                        const brandsList = document.getElementById('brands-list');
                        list.innerHTML = `<div>
                                                <input type="checkbox" id=${item.brand} name="product-brands" id=${item.brand} class="brands" checked>
                                                <label for=${item.brand}>${item.brand}</label>
                                        </div>`;
                        brandsList.appendChild(list);
                    }
                });
                const oppo = document.getElementById('OPPO');
                const vivo = document.getElementById('VIVO');

                oppo.addEventListener('click', filterCheckBox);
                vivo.addEventListener('click', filterCheckBox);

            } else if (allBrand.checked && popular.classList[1]) {

                //Clear All Fields Product List
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

                //Start sorting of data from high rating to low rating

                let countItem = 0;
                for (let y of data.product) {
                    countItem++;
                }

                for (let x = 1; x <= countItem; x++) {
                    let rating = 0, count = 0, itemIndex = 0;
                    for (let item of data.product) {
                        if (rating < item.rating.rate) {
                            rating = item.rating.rate;
                            itemIndex = count;
                        }
                        count++;
                    }

                    let starRating = '';

                    if (data.product[itemIndex].rating.rate == 5) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else {
                        starRating = 'No Rating';
                    }

                    const productList = document.getElementById('product-list');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${data.product[itemIndex].id}>
                                                        <div class="inner"><img class="card-img-top" src="${data.product[itemIndex].image.thumbnail}"></div>
                                                        <div class="card-body p-2 text-center">
                                                            <div>
                                                                    <p class="card-text fw-bolder">${data.product[itemIndex].title}</p>
                                                                    <span class="fs-4">${data.product[itemIndex].price.currency} ${data.product[itemIndex].price.value}</span><br>
                                                                    <span class="text-dark fs-6">${data.product[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>

                                                                    <div class="d-flex justify-content-center text-warning my-4 align-items-center">
                                                                            ${starRating}
                                                                            <span class="text-dark fs-6 ms-2">| ${data.product[itemIndex].rating.sold} Sold</span>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (allBrand.checked && bestSeller.classList[1]) {

                //Clear product list
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

                //Start sorting of data from high rating to low rating

                let countItem = 0;
                for (let y of data.product) {
                    countItem++;
                }

                for (let x = 1; x <= countItem; x++) {
                    let sold = 0, count = 0, itemIndex = 0;
                    for (let item of data.product) {
                        if (sold < item.rating.sold) {
                            sold = item.rating.sold;
                            itemIndex = count;
                        }
                        count++;
                    }

                    let starRating = '';

                    if (data.product[itemIndex].rating.rate == 5) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else {
                        starRating = 'No Rating';
                    }

                    const productList = document.getElementById('product-list');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${data.product[itemIndex].id}>
                                                        <div class="inner"><img class="card-img-top" src="${data.product[itemIndex].image.thumbnail}"></div>
                                                        <div class="card-body p-2 text-center">
                                                            <div>
                                                                    <p class="card-text fw-bolder">${data.product[itemIndex].title}</p>
                                                                    <span class="fs-4">${data.product[itemIndex].price.currency} ${data.product[itemIndex].price.value}</span><br>
                                                                    <span class="text-dark fs-6">${data.product[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>

                                                                    <div class="d-flex justify-content-center text-warning my-4 align-items-center">
                                                                            ${starRating}
                                                                            <span class="text-dark fs-6 ms-2">| ${data.product[itemIndex].rating.sold} Sold</span>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (allBrand.checked && newest.classList[1]) {

                //Clear product list
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

                //Start sorting of data from high rating to low rating

                let countItem = 0;
                for (let y of data.product) {
                    countItem++;
                }

                for (let x = 1; x <= countItem; x++) {
                    let sold = data.product[0].rating.sold, count = 0, itemIndex = 0;
                    for (let item of data.product) {
                        if (sold > item.rating.sold) {
                            sold = item.rating.sold;
                            itemIndex = count;
                        }
                        count++;
                    }

                    let starRating = '';

                    if (data.product[itemIndex].rating.rate == 5) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else {
                        starRating = 'No Rating';
                    }

                    const productList = document.getElementById('product-list');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${data.product[itemIndex].id}>
                                                        <div class="inner"><img class="card-img-top" src="${data.product[itemIndex].image.thumbnail}"></div>
                                                        <div class="card-body p-2 text-center">
                                                            <div>
                                                                    <p class="card-text fw-bolder">${data.product[itemIndex].title}</p>
                                                                    <span class="fs-4">${data.product[itemIndex].price.currency} ${data.product[itemIndex].price.value}</span><br>
                                                                    <span class="text-dark fs-6">${data.product[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>

                                                                    <div class="d-flex justify-content-center text-warning my-4 align-items-center">
                                                                            ${starRating}
                                                                            <span class="text-dark fs-6 ms-2">| ${data.product[itemIndex].rating.sold} Sold</span>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (allBrand.checked && cheapest.classList[1]) {

                //Clear product list
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

                let countItem = 0;
                for (let y of data.product) {
                    countItem++;
                }

                for (let x = 1; x <= countItem; x++) {
                    let sold = parseFloat(data.product[0].price.value.replaceAll(',', '')), count = 0, itemIndex = 0;
                    for (let item of data.product) {
                        if (sold > parseFloat(item.price.value.replaceAll(',', ''))) {
                            sold = parseFloat(item.price.value.replaceAll(',', ''));
                            itemIndex = count;
                        }
                        count++;
                    }

                    let starRating = '';

                    if (data.product[itemIndex].rating.rate == 5) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate > 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (data.product[itemIndex].rating.rate == 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else {
                        starRating = 'No Rating';
                    }

                    const productList = document.getElementById('product-list');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${data.product[itemIndex].id}>
                                                        <div class="inner"><img class="card-img-top" src="${data.product[itemIndex].image.thumbnail}"></div>
                                                        <div class="card-body p-2 text-center">
                                                            <div>
                                                                    <p class="card-text fw-bolder">${data.product[itemIndex].title}</p>
                                                                    <span class="fs-4">${data.product[itemIndex].price.currency} ${data.product[itemIndex].price.value}</span><br>
                                                                    <span class="text-dark fs-6">${data.product[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>

                                                                    <div class="d-flex justify-content-center text-warning my-4 align-items-center">
                                                                            ${starRating}
                                                                            <span class="text-dark fs-6 ms-2">| ${data.product[itemIndex].rating.sold} Sold</span>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else {
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function modalFetch(event) {

    return fetch('https://raw.githubusercontent.com/FloresJerome/Gizmotronix-ecommerce/main/smartphone-product.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response error');
            }
            return response.json();
        })
        .then(data => {

            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = '';

            data.product.forEach(item => {
                if (item.id == event.relatedTarget.id) {
                    let starRating = '';

                    if (item.rating.rate == 5) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i>';
                    } else if (item.rating.rate > 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i>';
                    } else if (item.rating.rate == 4) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (item.rating.rate > 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (item.rating.rate == 3) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (item.rating.rate > 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (item.rating.rate == 2) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (item.rating.rate > 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-solid fa-star-half-stroke" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else if (item.rating.rate == 1) {
                        starRating = '<i class="fa-solid fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i><i class="fa-regular fa-star" style="color: #febf00;"></i>';
                    } else {
                        starRating = 'No Rating';
                    }

                    const productItem = document.createElement('div');
                    productItem.innerHTML = `<div class="modal-header d-flex justify-content-end border-0">
                    <button type="button" class="btn-close bg-danger btn-close-danger"
                        data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-6">
                            <div class="row d-flex gap-5 ps-4">
                                <div class="col-12 pe-0">
                                    <img style="width: 100%; height: 20rem;"
                                        src=${item.image.thumbnail}
                                        class="preview-img" alt="product">
                                </div>
                                <div class="col-12 d-flex justify-content-around pe-0">
                                    <img style="width: 132px; height: 88px"
                                        src=${item.image.OtherImages[0]}
                                        class="preview-img" alt="sample-1">
                                    <img style="width: 132px; height: 88px"
                                        src=${item.image.OtherImages[1]}
                                        class="preview-img" alt="sample-2">
                                    <img style="width: 132px; height: 88px"
                                        src=${item.image.OtherImages[2]}
                                        class="preview-img" alt="sample-3">
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row pe-4">
                                <div class="col-12">
                                    <h4 class="text-secondary">${item.brand}</h4>
                                    <h1>${item.title}</h1>
                                    <p class="border-bottom mb-0 pb-3 border-3 d-flex gap-3 align-items-center">
                                        <span>${starRating}</span>
                                        <span>${item.rating.rate}/5.0</span> 
                                        <span>${item.rating.sold} Sold</span>
                                        <span class="text-success fw-bolder">${item.stocks > 0 ? 'Available' : 'Out of Stock'}</span>
                                    </p>
                                    <h4 class="mt-3">Description</h4>
                                    <p class="mb-4">${item.description}</p>
                                </div>
                                <div class="col-12">
                                    <div class="row d-flex justify-content-center align-items-center">
                                        <div class="col-4 d-flex flex-column">
                                            <p class="d-flex align-items-center m-0">${item.price.currency}<span style="font-size: 4rem;" class="ms-2">${item.price.value}</span></p>      
                                        </div>
                                        <div class="col mt-3 d-flex flex-column gap-2 align-items-end">
                                            <button style="width: 75%;" type="button" class="btn btn-warning fs-3 rounded-0"
                                                data-bs-dismiss="modal" id="add-to-cart">Add to Cart</button>
                                            <button style="width: 75%;" type="button" class="btn btn-primary fs-3 rounded-0"
                                                id="buy-now">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                    modalContent.appendChild(productItem);

                    const addToCart = document.getElementById('add-to-cart');
                    addToCart.addEventListener('click', () => {
                        const productID = `${item.id}`;
                        const priceCurrency = `${item.price.currency}`;
                        const productImage = `${item.image.thumbnail}`;
                        const priceItem = `${item.price.value}`;
                        const productTitle = `${item.title}`;

                        const cartItem = {
                            id: productID,
                            quantity: '1',
                            title: productTitle,
                            price: {
                                currency: priceCurrency,
                                value: priceItem
                            },
                            image: productImage
                        };

                        addCart.push(cartItem);
                        localStorage.setItem('addCart', JSON.stringify(addCart));

                        let countItem = 0;

                        for (let item of addCart) {
                            countItem++;
                        }

                        itemCount.textContent = countItem;
                    });
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function cartModal() {
    const cartList = document.getElementById('cart-modal-list');
    cartList.innerHTML = '';

    let countCartItem = 0;
    let cartTotalPrice = 0;

    for (let cartItem of addCart) {
        cartTotalPrice += parseFloat(cartItem.price.value.replaceAll(',', '')) * parseFloat(cartItem.quantity);
        countCartItem++;
    }

    const totalSelectedPrice = document.getElementById('total-selected-price');

    itemCount.textContent = countCartItem;
    totalSelectedPrice.innerHTML = `&#8369 ${cartTotalPrice.toLocaleString('en-US')}`;

    if (countCartItem > 0) {
        addCart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList = 'col-12 border border-3 bg-light mb-2 rounded-2';
            cartItem.innerHTML = `<div class="row">
                                    <div class="col-4 pe-0 d-flex flex-row justify-content-center align-items-center gap-3">
                                            <input type="checkbox" name="card" id="checkbox${item.id}" class="cart-checkbox" checked>
                                            <img src=${item.image} style="width: 100px; height: 100px;" alt=${item.title} class="py-2">
                                    </div>
                                    <div class="col px-0 d-flex flex-column justify-content-center ms-3">
                                            <h5 class="mb-1">${item.title}</h5>
                                            <p class="mb-1">${item.price.currency} ${item.price.value}</p>
                                            <p class="d-flex flex-row mb-0 gap-2">Quantity:<input type="number" name="quantity" id="quantity${item.id}" class="product-title text-center cart-input-quantity" style="width: 3rem; height: 1.5rem;" value="1" min="1" max="99"></p>
                                    </div>
                                    <div class="col-2 ps-0 d-flex justify-content-center align-items-center trashcan-list" id=${item.id}>
                                            <i class="fa-solid fa-trash-can fa-lg" style="color: #2d2e32;" id=${item.id}></i>
                                    </div>
                            </div>`;

                cartList.prepend(cartItem);
                document.getElementById('checkout').disabled = false;

            });

        } else {
            const cartItem = document.createElement('div');
            cartItem.classList = 'col-12 d-flex flex-column justify-content-center align-items-center';
            cartItem.innerHTML = `<i class="fa-solid fa-cart-shopping fa-5x" style="color: #c0c0c0;"></i>
                              <h3 class="text-secondary">Cart Empty</h3>`;
            cartList.appendChild(cartItem);

            document.getElementById('checkout').disabled = true;
        }

        const cartCheckbox = document.querySelectorAll('.cart-checkbox');
        for (let itemCheckbox of cartCheckbox) {
            itemCheckbox.addEventListener('change', (event) => {
                const checkboxID = event.target.id.replace(/\D/g, '');

                if (!itemCheckbox.checked) {
                    addCart.forEach(item => {
                        if (item.id === checkboxID) {
                            cartTotalPrice -= parseFloat(item.price.value.replaceAll(',', '')) * parseFloat(item.quantity);
                            totalSelectedPrice.innerHTML = `&#8369 ${cartTotalPrice.toLocaleString('en-US')}`;

                            document.getElementById(`quantity${item.id}`).disabled = true;
                        }
                    });
                } else {
                    addCart.forEach(item => {
                        if (item.id === checkboxID) {
                            cartTotalPrice += parseFloat(item.price.value.replaceAll(',', '')) * parseFloat(item.quantity);
                            totalSelectedPrice.innerHTML = `&#8369 ${cartTotalPrice.toLocaleString('en-US')}`;

                            document.getElementById(`quantity${item.id}`).disabled = false;
                        }
                    });
                }
            });
        }

        const cartInputQuantity = document.querySelectorAll('.cart-input-quantity');
        for (let inputQuantity of cartInputQuantity) {
            inputQuantity.addEventListener('input', (event) => {
                cartTotalPrice = 0;
                let index = 0;
                const quantityID = event.target.id.replace(/\D/g, '');

                addCart.forEach(item => {

                    if (item.id === quantityID) {
                        addCart[index].quantity = inputQuantity.value;
                    }

                    if (document.getElementById(`checkbox${item.id}`).checked) {
                        cartTotalPrice += parseFloat(item.price.value.replaceAll(',', '')) * parseFloat(item.quantity);
                    }
                    index++;
                });

                totalSelectedPrice.innerHTML = `&#8369 ${cartTotalPrice.toLocaleString('en-US')}`;
            });
        }

        const trashcanList = document.querySelectorAll('.trashcan-list');
        for (let trashcan of trashcanList) {
            trashcan.addEventListener('click', (event) => {
                let count = 0, index = 0;

                addCart.forEach(item => {
                    if (item.id === event.target.id) {
                        index = count;
                    }
                    count++;
                });

                addCart.splice(index, 1);
                localStorage.setItem('addCart', JSON.stringify(addCart));
                cartModal();
            });
        }
    }

    function sendEmail() {
        Email.send({
            SecureToken: "d7510748-0de5-495e-9519-c457b26f06c3",
            From: "sarabia.karljoseph@gmail.com",
            To: 'sarabia.karljoseph@gmail.com',
            ReplyTo: "GIZMOTRONIX.com",
            Subject: "Payment Transaction Confirmation",
            Body: "This is a testing purpose only. Thank you"
        }).then(
            alert("Payment transaction receipt was send via Email")
        );
    }



                        // CATEGORY PRODUCT SCROLLING


let scrollPosition = 0;
let scrollAmount = 140;

    const scrollCategory = document.getElementsByClassName('category-items');
    const horScroll = document.getElementsByClassName('hscroll');

    let maxScroll = -scrollCategory[0].offsetWidth + horScroll[0].offsetWidth;

    function scrollHorizontal(amt){
            scrollPosition += (amt * scrollAmount);

            if (scrollPosition > 0){
                scrollPosition = 0;
            } 
            
            // else if (scrollPostion < maxScroll) {
            //     scrollPosition = maxScroll;
            // }
            
            


            scrollCategory[0].style.left = scrollPosition + 'px';
    }



// FOR HISTORY API

window.history.replaceState({ page: 'homepage' }, 'homepage', '#homepage');

function nextContent(pageName) {
    window.history.pushState({ page: pageName }, pageName, `#${pageName}`);
    updatePage(pageName);
}

function updatePage(pageName) {
    const pages = document.getElementsByClassName('page');
    for (let p of pages) {
        p.classList.add('hide');
    }

    if (pageName === 'home-page') {
        const homePageHeader = document.getElementById('home-page-header');
        homePageHeader.classList.remove('hide');
        const homePageMain = document.getElementById('home-page-main');
        homePageMain.classList.remove('hide');
    } else if (pageName === 'contact-page' || pageName === 'register-page' || pageName === 'login-page') {
        const page = document.getElementById(pageName);
        page.classList.remove('hide');
    } else {
        const toProduceList = document.getElementById('to-product-list');
        toProduceList.classList.remove('hide');
        fetchData('initializeFilter');
        navigationButton(pageName);

    }
}


window.addEventListener('popstate', function (e) {
    if (e.state) {
        updatePage(e.state.page);
    }
});



function validateForm() {
    let hasError = false;


    const formErrors = document.getElementsByClassName('form-error');
    for(let fe of formErrors) {
        fe.textContent = '';
        fe.classList.add('d-none');
    }

    const firstNameInput = document.getElementById('f-name');
    if (firstNameInput.value === '') {
        const firstNameError = document.getElementById('f-name-error');
        firstNameError.classList.remove('d-none');
        firstNameError.textContent = 'First name is required';
        hasError = true;
    }

    const lastNameInput = document.getElementById('l-name');
    if (lastNameInput.value === '') {
        const lastNameError = document.getElementById('l-name-error');
        lastNameError.classList.remove('d-none');
        lastNameError.textContent = 'Last name is required';
        hasError = true;
    }

    const addressInput = document.getElementById('address');
    if (addressInput.value === '') {
        const addressError = document.getElementById('address-error');
        addressError.classList.remove('d-none');
        addressError.textContent = 'Address is required';
        hasError = true;
    }


    const emailAddressInput = document.getElementById('email-address');
    if (emailAddressInput.value === '') {
        const emailAddressError = document.getElementById('email-address-error');
        emailAddressError.classList.remove('d-none');
        emailAddressError.textContent = 'Email address is required';
        hasError = true;
    }
    
    let passwordErrorText = '';
    const passwordError = document.getElementById('password-error');

    const passwordInput = document.getElementById('password');
    if (passwordInput.value === '') {
        passwordError.classList.remove('d-none');
        passwordErrorText += 'Password is required \n';
        hasError = true;
    } else if (passwordInput.value.length < 8) {
        passwordError.classList.remove('d-none');
        passwordErrorText += 'Password must contain at least 8 characters \n';
        hasError = true;
    }

    const confirmPasswordInput = document.getElementById('confirm-password');
    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.classList.remove('d-none');
        passwordErrorText += 'Password did not match';
        hasError = true;
    }

    passwordError.textContent = passwordErrorText;



  
    if (!hasError) {
        openConfirmModal();
    } else {
        window.scrollTo(0,0);
    }
}

function openConfirmModal() {

   
        const firstNameInput = document.getElementById('f-name');
        const firstNameConfirm = document.getElementById('f-name-confirm');
        firstNameConfirm.textContent = firstNameInput.value;
    
      
        const lastNameInput = document.getElementById('l-name');
        const lastNameConfirm = document.getElementById('l-name-confirm');
        lastNameConfirm.textContent = lastNameInput.value;

        const addressInput = document.getElementById('address');
        const addressConfirm = document.getElementById('address-confirm');
        addressConfirm.textContent = addressInput.value;

        const emailAddressInput = document.getElementById('email-address');
        const emailAddressConfirm = document.getElementById('email-address-confirm');
        emailAddressConfirm.textContent = emailAddressInput.value;




   

    const confirmationModal = new bootstrap.Modal(document.getElementById("confirmation-modal"), {});
    confirmationModal.show();
}

function alertSuccess() {
    alert('Successfully registered! Thank you!');
}




                         // FOR STORAGE API



    //    const loggedinEmailAddress = localStorage.getItem('email');

    //     updateContent(loggedinEmailAddress);

    //     function updateContent(loggedInEmail) {
    //         if (loggedInEmail) {
    //             const loginForm = document.getElementById('login-form');
    //             loginForm.classList.add('hide');

    //             const loggedinSection = document.getElementById('loggedin-section');
    //             loggedinSection.classList.remove('hidden');

    //             const loggedinUser = document.getElementById('logout-btn');
    //             loggedinUser.textContent = `Logout: ${loggedInEmail}`;
    //         } else {
    //             const loginForm = document.getElementById('login-form');
    //             loginForm.classList.remove('hide');

    //             const loggedinSection = document.getElementById('login-area');
    //             loggedinSection.classList.add('hidden');
    //         }
    //     }

    //     function login() {
    //         const emailAddressInput = document.getElementById('email');

    //         const emailAddress = emailAddressInput.value;

    //         localStorage.setItem('email', emailAddress);
    //         updateContent(emailAddress);
    //     }

    //     function logout() {
    //         localStorage.removeItem('email');
    //         updateContent(null);
    //     }  