window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".navbar");
    if (window.scrollY > 0) {
        navbar.style.backgroundColor = "white";
    } else {
        navbar.style.backgroundColor = "transparent";
    }
});
document.getElementById('next').onclick = function(){
  let lists = document.querySelectorAll('.item');
  document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
  let lists = document.querySelectorAll('.item');
  document.getElementById('slide').prepend(lists[lists.length - 1]);
}


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper = new Swiper(".mySwiper1", {
    spaceBetween: 30,
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  document.getElementById("linkId").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".toGiveScroll");
    toGiveScrollElement.style.height = "auto";
    toGiveScrollElement.style.transition = "all 1s";
    document.getElementById("linkId").style.display = "none";
    document.getElementById("linkIdTwo").style.display = "block";
  });
  
  document.getElementById("linkIdTwo").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".toGiveScroll");
    toGiveScrollElement.style.height = "350px";
    
    document.getElementById("linkId").style.display = "block";
    document.getElementById("linkIdTwo").style.display = "none";
  });
  document.getElementById("linkId1").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".hoiyan");
    toGiveScrollElement.style.height = "auto";
    
    document.getElementById("linkId1").style.display = "none";
    document.getElementById("linkIdTwo1").style.display = "block";
  });
  
  document.getElementById("linkIdTwo1").addEventListener("click", function(event) {
    event.preventDefault();
  
    var toGiveScrollElement = document.querySelector(".hoiyan");
    toGiveScrollElement.style.height = "350px";
    
    document.getElementById("linkId1").style.display = "block";
    document.getElementById("linkIdTwo1").style.display = "none";
  });
 
  function showburger(){
    document.getElementById("burgerbtn").style.display = "none";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("burdermenu").style.display = "block";
    const motionElement = document.querySelector(".dropDownBurger");
    
    // Add the "appear" class after a short delay
    setTimeout(function() {
      motionElement.classList.add("appear");
    }, 100);
  }
  function closeburger(){
    document.getElementById("burgerbtn").style.display = "block";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("burdermenu").style.display = "none";


    let motionElement1 = document.getElementById("burdermenu")
     // Delay the animation using setTimeout
     motionElement1.classList.remove("appear");
 
  
  }
 

  