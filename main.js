//Page 1

fetchData('best-seller-home');
fetchData('new-arrival-home');
fetchData('shop-dropdown');

function fetchData(event) {
    return fetch('https://raw.githubusercontent.com/FloresJerome/Gizmotronix-ecommerce/main/product-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response error');
            }
            return response.json();
        })
        .then(data => {

            if (event === 'best-seller-home') {
                for (let x = 1; x < 8; x++) {
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
                    productContainer.innerHTML = `<div class="card">
                                                            <div class="inner"><a href="#"><img class="card-img-top" src="${bestSellerList[itemIndex].image[0]}"></a></div>
                                                            <div class="card-body p-2 text-center">
                                                                    <div>
                                                                            <p class="card-text fw-bolder text-center">${bestSellerList[itemIndex].title}</p>
                                                                            
                                                                                <span class="fs-4">${bestSellerList[itemIndex].price.currency} ${bestSellerList[itemIndex].price.value}</span><br>
                                                                                <span class="text-dark fs-6">${bestSellerList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                                    
                                                                                <div class="d-flex justify-content-center text-warning my-4">
                                        
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

                    const removeItem = bestSellerList.splice(itemIndex, 1);

                }
            } else if (event === 'new-arrival-home') {
                for (let y = 1; y < 8; y++) {
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
                    productContainer.innerHTML = `<div class="card">
                                                    <div class="inner"><a href="#"><img class="card-img-top" src="${newArrivalList[itemIndex].image[0]}"></a></div>
                                                    <div class="card-body p-2 text-center">
                                                            <div>
                                                                    <p class="card-text fw-bolder text-center">${newArrivalList[itemIndex].title}</p>
                                                                    <span class="fs-4">${newArrivalList[itemIndex].price.currency} ${newArrivalList[itemIndex].price.value}</span><br>
                                                                    <span class="text-dark fs-6">${newArrivalList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                            
                                                                    <div class="d-flex justify-content-center text-warning my-4">
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
                        list.innerHTML = `<a class="dropdown-item" onclick="nextContent(${item.brand})">${item.brand}</a>`;
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
            } else if (event === 'all-product') {

                //Clear All Fields Product List
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

                const allBrands = document.getElementById('all-brand')
                allBrands.checked = true;
                const ASUS = document.getElementById('ASUS')
                ASUS.checked = true;
                const Acer = document.getElementById('Acer')
                Acer.checked = true;

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
                    productContainer.className = 'col-3';
                    productContainer.innerHTML = `<div class="card border-2" style="width: 18rem;" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${data.product[itemIndex].id}>
                                                        <img src=${data.product[itemIndex].image[0]} class="card-img-top product-img" alt=${data.product[itemIndex].title} style="width: 100%;">
                                                        <div class="card-body border-top border-2">
                                                            <p class="card-text d-flex justify-content-between">${data.product[itemIndex].title}</p>
                                                            <p class="card-text d-flex justify-content-between px-4"><span>${data.product[itemIndex].price.currency} ${data.product[itemIndex].price.value}</span>Available</p>
                                                            <p class="card-text d-flex justify-content-between px-4"><span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>${data.product[itemIndex].rating.sold}Sold</p>
                                                        </div>
                                                    </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (event === 'best-seller') {

                //Clear product list
                const productList = document.getElementById('product-list');
                productList.innerHTML = '';

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
                    productContainer.className = 'col-3';
                    productContainer.innerHTML = `<div class="card border-2" style="width: 18rem;" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${data.product[itemIndex].id}>
                                                    <img src=${data.product[itemIndex].image[0]} class="card-img-top product-img" alt=${data.product[itemIndex].title} style="width: 100%;">
                                                    <div class="card-body border-top border-2">
                                                        <p class="card-text d-flex justify-content-center">${data.product[itemIndex].title}</p>
                                                        <p class="card-text d-flex justify-content-between px-4"><span>${data.product[itemIndex].price.currency} ${data.product[itemIndex].price.value}</span>Available</p>
                                                        <p class="card-text d-flex justify-content-between px-4"><span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>${data.product[itemIndex].rating.sold}Sold</p>
                                                    </div>
                                                </div>`;
                    productList.appendChild(productContainer);

                    data.product.splice(itemIndex, 1);
                }
            } else if (event === 'new-arrival') {

                    //Clear product list
                    const productList = document.getElementById('product-list');
                    productList.innerHTML = '';

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
                            productContainer.className = 'col-3';
                            productContainer.innerHTML = `<div class="card border-2" style="width: 18rem;" type="button" data-bs-toggle="modal" data-bs-target="#myModal" id=${data.product[itemIndex].id}>
                                                        <img src=${data.product[itemIndex].image[0]} class="card-img-top product-img" alt=${data.product[itemIndex].title} style="width: 100%;">
                                                        <div class="card-body border-top border-2">
                                                            <p class="card-text d-flex justify-content-center">${data.product[itemIndex].title}</p>
                                                            <p class="card-text d-flex justify-content-between px-4"><span>${data.product[itemIndex].price.currency} ${data.product[itemIndex].price.value}</span>Available</p>
                                                            <p class="card-text d-flex justify-content-between px-4"><span><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>${data.product[itemIndex].rating.sold}Sold</p>
                                                        </div>
                                                    </div>`;
                            productList.appendChild(productContainer);

                            data.product.splice(itemIndex, 1);
            }}
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
        fetchData(pageName);

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