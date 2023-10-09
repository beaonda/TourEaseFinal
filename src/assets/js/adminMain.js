// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//
document.addEventListener('DOMContentLoaded', function() {
  var viewButtons = document.querySelectorAll('.viewButton');
  var popups = document.querySelectorAll('.popup');
  var closeButtons = document.querySelectorAll('.close');

  viewButtons.forEach(function(viewButton, index) {
      viewButton.addEventListener('click', function() {
          popups[index].style.display = 'block';
          document.body.style.overflow = 'hidden';
      });

      closeButtons[index].addEventListener('click', function() {
          popups[index].style.display = 'none';
          document.body.style.overflow = 'auto';
      });
  });
});
