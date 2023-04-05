//Page 1

fetchData('best-seller');
fetchData('new-arrival');
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

            if (event === 'best-seller') {
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
                                                            <div class="card-body p-2">
                                                                    <div>
                                                                            <p class="card-text fw-bolder fs-4 text-center">${bestSellerList[itemIndex].title}</p><span class="fs-4">${bestSellerList[itemIndex].price.currency} ${bestSellerList[itemIndex].price.value}</span><br>
                                                                            <span class="text-dark fs-6">${bestSellerList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                                
                                                                            <div class="d-flex justify-content-start text-warning my-4">
                                    
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
            } else if (event === 'new-arrival') {
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
                                                    <div class="card-body p-2">
                                                            <div>
                                                                    <p class="card-text fw-bolder fs-4 text-center">${newArrivalList[itemIndex].title}</p><span class="fs-4">${newArrivalList[itemIndex].price.currency} ${newArrivalList[itemIndex].price.value}</span><br>
                                                                    <span class="text-dark fs-6">${newArrivalList[itemIndex].stock != 0 ? 'Available' : 'Not Available'}</span>
                            
                                                                    <div class="d-flex justify-content-start text-warning my-4">
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

                    const removeItem = newArrivalList.splice(itemIndex, 1);
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
            }
        })
        .catch(error => {
            console.log(error);
        });
}








                        // CATEGORY PRODUCT SCROLLING


let scrollPosition = 0;
let scrollAmount = 200;

    const scrollCategory = document.getElementsByClassName('category-items');
    const horScroll = document.getElementsByClassName('hscroll');

    let maxScroll = -scrollCategory[0].offsetWidth + horScroll[0].offsetWidth;

    function scrollHorizontal(amt){
            scrollPosition += (amt * scrollAmount);

            if (scrollPosition > 0){
                scrollPosition = 0;
            } 
            
            // if (scrollPostion < maxScroll) {
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
        const pageName = document.getElementById('to-product-list');
        pageName.classList.remove('hide');
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