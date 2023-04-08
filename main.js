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


popular.addEventListener('click', sortButton);
bestSeller.addEventListener('click', sortButton);
newest.addEventListener('click', sortButton);
cheapest.addEventListener('click', sortButton);
allBrand.addEventListener('click', filterCheckBox);
myModal.addEventListener('show.bs.modal', modalFetch);

const addCart = [];


function navigationButton(event) {
    console.log(event);
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
                    const newArrival = document.getElementById('best-seller');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${bestSellerList[itemIndex].id}>
                                                            <div class="inner"><img class="card-img-top" src="${bestSellerList[itemIndex].image.thumbnail}"></div>
                                                            <div class="card-body p-2 text-center">
                                                                    <div>
                                                                            <p class="card-text fw-bolder">${bestSellerList[itemIndex].title}</p>
                                                                            
                                                                                <span class="fs-4">${bestSellerList[itemIndex].price.currency} ${bestSellerList[itemIndex].price.value}</span><br>
                                                                                <span class="text-dark fs-6">${bestSellerList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                                    
                                                                                <div class="d-flex justify-content-center text-warning my-4 text-center">
                                                                                        <div><i class="fa-solid fa-star"></i></div>
                                                                                        <div><i class="fa-solid fa-star"></i></div>
                                                                                        <div><i class="fa-solid fa-star"></i></div>
                                                                                        <div><i class="fa-solid fa-star"></i></div>
                                                                                        <div><i class="fa-solid fa-star-half-stroke"></i></div>
                                                                                        <span class="text-dark fs-6 ms-2">| ${bestSellerList[itemIndex].rating.sold} Sold</span>
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
                    const newArrival = document.getElementById('new-arrival');
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-6 col-lg-3 mb-4';
                    productContainer.innerHTML = `<div class="card" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${newArrivalList[itemIndex].id}>
                                                    <div class="inner"><img class="card-img-top" src="${newArrivalList[itemIndex].image.thumbnail}"></div>
                                                    <div class="card-body p-2 text-center">
                                                            <div>
                                                                    <p class="card-text fw-bolder">${newArrivalList[itemIndex].title}</p>
                                                                    <span class="fs-4">${newArrivalList[itemIndex].price.currency} ${newArrivalList[itemIndex].price.value}</span><br>
                                                                    <span class="text-dark fs-6">${newArrivalList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                            
                                                                    <div class="d-flex justify-content-center text-warning my-4 text-center">
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star-half-stroke"></i></div>
                                                                            <span class="text-dark fs-6 ms-2">| ${newArrivalList[itemIndex].rating.sold} Sold</span>
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

            } else if (allBrand.checked && popular.classList[1] === 'active') {

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

                                                                    <div class="d-flex justify-content-center text-warning my-4 text-center">
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star-half-stroke"></i></div>
                                                                            <span class="text-dark fs-6 ms-2">| ${data.product[itemIndex].rating.sold} Sold</span>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (allBrand.checked && bestSeller.classList[1] === 'active') {

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

                                                                    <div class="d-flex justify-content-center text-warning my-4 text-center">
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star-half-stroke"></i></div>
                                                                            <span class="text-dark fs-6 ms-2">| ${data.product[itemIndex].rating.sold} Sold</span>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (allBrand.checked && newest.classList[1] === 'active') {

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

                                                                    <div class="d-flex justify-content-center text-warning my-4 text-center">
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star-half-stroke"></i></div>
                                                                            <span class="text-dark fs-6 ms-2">| ${data.product[itemIndex].rating.sold} Sold</span>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (allBrand.checked && cheapest.classList[1] === 'active') {

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

                                                                    <div class="d-flex justify-content-center text-warning my-4 text-center">
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star"></i></div>
                                                                            <div><i class="fa-solid fa-star-half-stroke"></i></div>
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

                    const productItem = document.createElement('div');
                    productItem.innerHTML = `<div class="modal-header d-flex justify-content-end border-0">
                                                     <button type="button" class="btn-close bg-danger btn-close-danger" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body">
                                                    <div class="row">
                                                            <div class="col">
                                                                    <div class="row">
                                                                            <div class="col-12">
                                                                                    <div class="text-center mx-auto" style="width: 342px; height: 342px">
                                                                                    <img style="width: 100%; height: auto;"
                                                                                         src=${item.image.thumbnail}
                                                                                         class="rounded" alt="product">
                                                                            </div>
                                                                    </div>
                                                                    <div class="col-12 d-flex justify-content-around align-items-center">
                                                                            <img style="width: 25%"
                                                                                 src=${item.image.OtherImages[0]}
                                                                                 class="rounded" alt="sample-1">
                                                                            <img style="width: 25%"
                                                                                src=${item.image.OtherImages[1]}
                                                                                class="rounded" alt="sample-2">
                                                                            <img style="width: 25%"
                                                                                 src=${item.image.OtherImages[2]}
                                                                                 class="rounded" alt="sample-3">
                                                                    </div>
                                                            </div>
                                                    </div>
                                                    <div class="col">
                                                            <div class="row">
                                                                    <div class="col-12">
                                                                            <h3>${item.brand}</h3>
                                                                            <h1>${item.title}</h1>
                                                                            <p><span><i class="fa-solid fa-star" style="color: #febf00;"></i> 
                                                                                     <i class="fa-solid fa-star" style="color: #febf00;"></i> 
                                                                                     <i class="fa-solid fa-star" style="color: #febf00;"></i> 
                                                                                     <i class="fa-solid fa-star" style="color: #febf00;"></i> 
                                                                                     <i class="fa-solid fa-star" style="color: #febf00;"></i>
                                                                               </span>
                                                                               <span>${item.rating.rate}/5</span> (${item.rating.sold} Item Sold)
                                                                            </p>
                                                                            <h4 class="mt-3">Description</h4>
                                                                            <p>${item.description}</p>
                                                                    </div>
                                                                    <div class="col-12">
                                                                            <div class="row">
                                                                                    <div class="col-6 d-flex justify-content-center">
                                                                                            <h2>${item.price.currency} ${item.price.value}</h2>
                                                                                    </div>
                                                                                    <div class="col-6 d-flex justify-content-center">
                                                                                            <h2>Qty: <span id="item-quantity">5</span></h2>
                                                                                    </div>
                                                                                    <div class="col mt-4 d-flex justify-content-center gap-5">
                                                                                            <button style="width: 176px;" type="button" class="btn btn-warning fs-3" data-bs-dismiss="modal" id="add-to-cart" data-id=${item.id}>Add to Cart</button>
                                                                                            <button style="width: 176px;" type="button" class="btn btn-primary fs-3" id="buy-now">Buy Now</button></div>
                                                                                    </div>
                                                                            </div>
                                                                    </div>
                                                            </div>
                                                    </div>
                                              </div>`;
                    modalContent.appendChild(productItem);

                    const addToCart = document.getElementById('add-to-cart');
                    addToCart.addEventListener('click', (event) => {
                        console.log(event);
                        const itemQuantity = document.getElementById('item-quantity');
                        let a = `${event.target.dataset.id}`;
                        let b = `${itemQuantity.textContent}`;
                        console.log(a);
                        console.log(b);

                        // function cartItems(id, itemQuantity) {
                        //     this.id = id;
                        //     this.itemQuantity = itemQuantity;

                        // }

                        const cartItem = {id: a, quantity: b}
                        addCart.push(cartItem);
                        console.log(addCart);


                        

                    });
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
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
        console.log(pageName);
        fetchData('initializeFilter');
        navigationButton(pageName);

    }
}


window.addEventListener('popstate', function (e) {
    if (e.state) {
        updatePage(e.state.page);
    }
});




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