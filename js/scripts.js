$(document).ready(function(){
    $( function() {
        $( "#accordion" ).accordion({
            collapsible: true
        });
    } );

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        navText: [ '', ' ' ],

        responsive:{
            0:{
                items:1
            },
            
            616:{
                items:3
            },
            
            1000:{
                items:5
            }
        }
    });
});
console.clear();

const nav = document.querySelector("nav");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".link")];
const menuBtn = document.querySelector(".menu-btn");
const subMenuBtn = document.querySelector(".sub-menu-btn");

function createHoverEl() {
    let hoverEl = document.createElement("div");
    hoverEl.className = "hover-el";
    hoverEl.style.setProperty("--y", "0px");
    hoverEl.style.setProperty("--mousex", "0px");
    hoverEl.style.setProperty("--mousey", "0px");
    navLinksContainer.appendChild(hoverEl);
}
createHoverEl();

navLinks.forEach((link, index) => {
    let hoverEl = navLinksContainer.querySelector(".hover-el");
    link.style.setProperty("--delay", `${index * 50}ms`);
    link.addEventListener("mousemove", function(e) {
        hoverEl.style.setProperty("--y", `${index * 60}px`);
        hoverEl.style.setProperty("opacity", "1");
        hoverEl.style.setProperty("--mousex", `${e.pageX - hoverEl.offsetLeft}px`);
        hoverEl.style.setProperty("--mousey", `${e.pageY - hoverEl.offsetTop}px`);
    });
    navLinksContainer.addEventListener("mouseout", function() {
        hoverEl.style.setProperty("opacity", "0");
    });
    link.addEventListener("click", function() {
        let hoverEl = navLinksContainer.querySelector(".hover-el");
        hoverEl.style.opacity = '0';
        toggleSubmenu(link);
    });
});

menuBtn.addEventListener("click", function() {
    nav.classList.toggle("nav-open");
    menuBtn.classList.toggle("close");
});
subMenuBtn.addEventListener("click", function() {
    nav.classList.toggle("sub-menu-open");
    removeSubmenu();
});

function toggleSubmenu(el) {
    let subMenu = nav.querySelector(".sub-menu");
    if (el.children[1]) {
        createSubmenu(el);
    } else if (nav.contains(subMenu)) {
        removeSubmenu();
    } else {
        return;
    }
}

function createSubmenu(el) {
    let subMenuContainer = document.createElement("div");
    subMenuContainer.className = "sub-menu";
    let subMenuItem = el.children[1].cloneNode(true);
    let subMenuItemList = [...subMenuItem.children];
    subMenuItemList.forEach((item, index) => {
        item.classList.add("off-menu");
        item.style.setProperty("--delay", `${index * 40}ms`);
    });
    nav.classList.toggle("sub-menu-open");
    nav.appendChild(subMenuContainer);
    subMenuContainer.appendChild(subMenuItem);
    setTimeout(function() {
        subMenuItemList.forEach(item => {
            item.classList.remove("off-menu");
            item.classList.add("on-menu");
        });
    }, 200);
}
function removeSubmenu() {
    let subMenu = nav.querySelector(".sub-menu");
    let subMenuItemList = [...subMenu.children[0].children];
    if (nav.contains(subMenu)) {
        subMenuItemList.forEach(item => {
            item.classList.add("off-menu");
            item.classList.remove("on-menu");
        });
        setTimeout(function() {
            nav.removeChild(subMenu);
        }, 500);
    }
}


    //script about hide/ header
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 500);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}