const projects = document.getElementsByClassName("project_container");
let activeIndex = 0;
let nextIndex;
let afterNextIndex;
let rightDisplay;
let centerDisplay;
let leftDisplay;
function projectDisplay(direction) {
    $('.all_project_container').addClass('swiped')
    if (direction === "right") {
        nextIndex = activeIndex + 1 < projects.length ? activeIndex + 1 : 0;
        afterNextIndex = nextIndex + 1 < projects.length ? nextIndex + 1 : 0;

        rightDisplay = document.querySelector(`[data-index="${activeIndex}"]`);
        centerDisplay = document.querySelector(`[data-index="${nextIndex}"]`);
        leftDisplay = document.querySelector(`[data-index="${afterNextIndex}"]`);
    } else if (direction === "left") {
        nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : projects.length - 1;
        afterNextIndex = nextIndex - 1 >= 0 ? nextIndex - 1 : projects.length - 1;

        rightDisplay = document.querySelector(`[data-index="${afterNextIndex}"]`);
        centerDisplay = document.querySelector(`[data-index="${nextIndex}"]`);
        leftDisplay = document.querySelector(`[data-index="${activeIndex}"]`);
    }

    rightDisplay.dataset.status = "after";
    centerDisplay.dataset.status = "active";
    leftDisplay.dataset.status = "before";

    $("#projectCircle").css("background-color", "rgba(" + centerDisplay.getAttribute('data-color') + " ,0.5)");

    const allProjects = document.querySelectorAll('[data-index]');
    allProjects.forEach(project => {
        if (project.dataset.index != nextIndex && project.dataset.index != afterNextIndex && project.dataset.index != activeIndex) {
            project.dataset.status = "unknown";
        }
    });

    activeIndex = nextIndex;
}

$(".arrow_button").on("click", function (){
    if ($(this).hasClass("clickable")) {
        let direction = $(this).hasClass("left") ? "left" : "right";
        $(this).animate({height: "62px", width: "62px"}, 100).animate({height: "65px", width: "65px"}, 100);
        projectDisplay(direction);

        $(".arrow_button").removeClass("clickable")
        setTimeout(function() {
            $(".arrow_button").addClass("clickable")
        }, 200);
    }
});

const projectContainers = document.querySelectorAll(".project_container");
projectContainers.forEach(project => {
    project.addEventListener("click", () => {
        if (project.dataset.status === 'after') {
            projectDisplay('left');
        }
        if (project.dataset.status === 'before') {
            projectDisplay('right');
        }
    });
});

let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;
function checkDirection() {
    let swipeDistanceX = touchstartX - touchendX;
    let swipeDistanceY = touchstartY - touchendY;
    if (swipeDistanceX > 100 && (swipeDistanceY < 100 && swipeDistanceY > -100)){
        projectDisplay("left");
    }
    if (swipeDistanceX < -100 && (swipeDistanceY < 100 && swipeDistanceY > -100)){
        projectDisplay("right");
    }
}

document.querySelector("#projects").addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
})

document.querySelector("#projects").addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    checkDirection();
})

$(document.body).on("click", ".hamburger-icon", function () {
    $(".nav").toggleClass("open");
});

$(document.body).on("click", ".nav_item", function () {
    $(".nav").toggleClass("open");
});

const navItems = document.querySelectorAll(".nav_item");
let scrolledCheck = false;
$(window).on('scroll', function() {
    if ($(document).scrollTop() > 20) {
        $('.nav').addClass("scrolled");
        scrolledCheck = true;
        $('.scroll_reminder').removeClass("show");
    }
    if ($(document).scrollTop() < 20) {
        $('.nav').removeClass("scrolled");
    }

    let scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    let scrollCenter = $(window).scrollTop() + $(window).height() / 2;
    let section2Offset = $('#section2').offset().top;
    let section3Offset = $('#section3').offset().top;
    let section4Offset = $('#section4').offset().top;


    if (scrollCenter < section2Offset - 300) {
        navItems.forEach(navItem => {
            navItem.classList.remove("active");
        });
    }
    if (scrollCenter > section2Offset - 300) {
        navItems.forEach(navItem => {
            navItem.classList.remove("active");
        });
        navItems.item(0).classList.add("active");
    }
    if (scrollCenter > section3Offset - 200) {
        navItems.forEach(navItem => {
            navItem.classList.remove("active");
        });
        navItems.item(1).classList.add("active");
    }
    if (scrollCenter > section4Offset - 300) {
        navItems.forEach(navItem => {
            navItem.classList.remove("active");
        });
        navItems.item(2).classList.add("active");
    }
    if (scrollBottom < 20) {
        navItems.forEach(navItem => {
            navItem.classList.remove("active");
        });
        navItems.item(3).classList.add("active");
    }

});

let homeTitle = "IJsbrand Schelvis";
let homeTitleElements = homeTitle.split("").map(function(c) {
    if (c === " ") {
        return '<span id="' + c + '" class="space_fix">' + c + '</span>';
    } else {
        return $('<span id="' + c + '">' + c + '</span>');
    }
});

let homeTitleDiv = $('#homeTitle');
let animationDelay = 30;
let widthTest = $('#widthTest')
$(window).on('load', function() {
    $('body').removeClass('not_loaded')
    let homeTitleHeight = widthTest.width() * 0.1117021276595745;
    document.getElementById("homeTitle").style.setProperty("--height", homeTitleHeight + 'px');
    widthTest.css("display", "none")

    homeTitleElements.forEach(function (e, i) {
        homeTitleDiv.append(e);
        setTimeout(function() {
            e.addClass("title_animation");
        }, 100 + i * animationDelay);

        if (++i === homeTitleElements.length) {
            setTimeout(function() {
                homeTitleDiv.addClass("done");
            }, 800 + i * animationDelay);
        }

        if ($(document).scrollTop() > 20) {
            $('.nav').addClass("scrolled");
        }
        else {
            $('.nav').removeClass("scrolled");
        }
    });

    setTimeout(function() {
        if (scrolledCheck === false) {
            $('.scroll_reminder').addClass("show");
        }
    }, 5000);
});

const downloadButton = document.getElementById("dwnBtn");
document.getElementById("dwnBtn").onmousemove = e => {
    const rect = downloadButton.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    downloadButton.style.setProperty("--mouse-x", `${x}px`);
    downloadButton.style.setProperty("--mouse-y", `${y}px`);
};

$(document.body).on("click", "#dwnBtn", function () {

    $("#dwnBtn").addClass("click");
    setTimeout(function() {
        $("#dwnBtn").removeClass("click");
    }, 100);
});

$('#contactForm').submit(function (e){
    $("#contactBtnContainer").addClass("post");
    setTimeout(function() {
        $("#contactBtnContainer").removeClass("post");
    }, 5000);
});

$(document.body).on("click", ".nav_item", function (){
    navItems.forEach(navItem => {
        navItem.classList.remove("active");
    });
    $(this).addClass('active');

    if ($(this).attr('id') === "navItem1") {
        $(window).scrollTo($('#section2').offset().top - ($(window).height() / 2))
    } else if ($(this).attr('id') === "navItem2") {
        $(window).scrollTo($('#section3').offset().top - ($(window).height() / 2))
    } else if ($(this).attr('id') === "navItem3") {
        $(window).scrollTo($('#section4').offset().top - ($(window).height() / 2))
    } else if ($(this).attr('id') === "navItem4") {
        $(window).scrollTo('max');
    }
});