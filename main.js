let scrollPosition = 0;
let scrollAmount = 200;

    const scrollCategory = document.getElementsByClassName('category-items');
    const horScroll = document.getElementsByClassName('hscroll');

    let maxScroll = -scrollCategory[0].offsetWidth + horScroll[0].offsetWidth;

    function scrollHorizontal(amt){
            scrollPosition += (amt * scrollAmount);

            // if (scrollPosition > 0){
            //     scrollPosition = 0;
            // }
            
            // if (scrollPostion < maxScroll) {
            //     scrollPosition = maxScroll;
            // }


            scrollCategory[0].style.left = scrollPosition + 'px';
    }




        