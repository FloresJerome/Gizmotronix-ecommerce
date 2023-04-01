
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