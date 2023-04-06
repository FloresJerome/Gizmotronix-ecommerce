//Page 1

fetchData('best-seller');
fetchData('new-arrival')

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

                    const removeItem = newArrivalList.splice(itemIndex, 1);
                }
            }
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

    window.history.replaceState({ page: 'homepage'}, 'homepage', '#homepage');

    function nextContent(pageName) {
        const pages = document.getElementsByClassName('page');
        for (let p of pages) {
            p.classList.add('hidden');
        }

        const currentPage = document.getElementById(pageName);
        currentPage.classList.remove('hide');
    }

    function navigate(pageName) {
        windows.history.pushState({page: pageName}, pageName, `#${pageName}`);

        nextContent(pageName);
    }



    window.history.replaceState({ page: 'homepage' }, 'homepage', '#homepage');

   
    function updateContent(pageName) {
      
        const pages = document.getElementsByClassName('page');
        for (let p of pages) {
            p.classList.add('hide');
        }

        const currentPage = document.getElementById(pageName);
        currentPage.classList.remove('hide');

    }


    function navigate(pageName) {

        window.history.pushState({ page: pageName }, pageName, `#${pageName}`);

        updateContent(pageName);
    }

    window.addEventListener('popstate', function(e) {
        if (e.state) {
            updateContent(e.state.page);
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