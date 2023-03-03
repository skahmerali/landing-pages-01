$(window).scroll(function(){
    if ($(this).scrollTop() > 10) {
       $('#navbarMain').addClass('scroll');
    } else {
       $('#navbarMain').removeClass('scroll');
    }
});

  // navbar change text color   

  $(window).scroll(function(){
    if ($(this).scrollTop() > 10) {
       $('.nav-link').addClass('nav_color');
    } else {
       $('.nav-link').removeClass('nav_color');
    }
});


// Section 4 steps

class StepsComponent {
  constructor(stepsSelector, contentsSelector) {
    this.current = 1;
    this.stepsNode = document.querySelector(stepsSelector);
    this.contentsNode = document.querySelector(contentsSelector);

    this.totalSteps = this.stepsNode.children.length;

    this.stepsNode.querySelectorAll("button").forEach((step) => {
      step.addEventListener("click", (e) => {
        const targetStep = parseInt(e.target.dataset.step);

        this.contentsNode
          .querySelectorAll(".content")
          .forEach((content) => content.classList.remove("active"));
        this.stepsNode
          .querySelectorAll("button")
          .forEach((content) => content.classList.remove("active"));

        this.contentsNode
          .querySelector(`.content[data-step="${targetStep}"]`)
          .classList.add("active");
        this.stepsNode
          .querySelector(`button[data-step="${targetStep}"]`)
          .classList.add("active");

        this.stepsNode
          .querySelectorAll("div")
          .forEach((content) => content.classList.remove("active"));
        if (targetStep - 1 > 0) {
          const num = targetStep - 1;
          for (let i = 1; i <= num; i++) {
            this.stepsNode
              .querySelector(`div:nth-of-type(${i})`)
              .classList.add("active");
          }
        }
      });
    });
  }
}

new StepsComponent("#steps", "#contents");

// increment decrement button

function incrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    if(value<10){
        value++;
            document.getElementById('number').value = value;
    }
}
function decrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    if(value>1){
        value--;
            document.getElementById('number').value = value;
    }

}

// testimonial

// vars
'use strict'
var	testim = document.getElementsByClassName("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {

    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
} 

// back to top
window.onscroll = () => {
  toggleTopButton();
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTopButton() {
  if (document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20) {
    document.getElementById('back-to-up').classList.remove('d-none');
  } else {
    document.getElementById('back-to-up').classList.add('d-none');
  }
}

// slider

// range slider


(function(win, dom){
    'use strict';
  
    // Check for .rangeControl class
    var rangeControlList = dom.getElementsByClassName('custom-rangeInput');
  
    // Inits components
    var init = function(){
      
      // Loop all controls
      for (var i = 0; i < rangeControlList.length; i++) {
        
        // Apply inital
        updateController(rangeControlList[i]);
        // Update when changed
        rangeControlList[i].addEventListener('input', function() {
          updateController(this);
        });
        // Update when changed ( for older browsers )
        rangeControlList[i].addEventListener('change', function() {
          updateController(this);
        });
      }
    }
    
    // Updates components
    var update = function(){
      for (var i = 0; i < rangeControlList.length; i++) {
         updateController(rangeControlList[i]);
      }
    }

    // Update controller
    var updateController = function(obj){
      // Thumb Position
      var thumbPos = getThumbPercentage(obj);
      var thumPosPX = getThumbPosition(obj);
      if(obj.getAttribute("data-tooltip") != "false"){
        updateTooltip(obj.nextElementSibling, obj.value, thumPosPX, thumbPos);
      }else{
        obj.nextElementSibling.style.display = "none";
      }
      updateProgress(obj, '#', '#', thumbPos);
    }

    // Retun range slider pixel position according to offset
    // obj : target object
    var getThumbPosition = function(obj){
      return Math.round((obj.offsetWidth / 100) * obj.value); // Pixel
    }

    // Retun range slider percentage to thumb position
    // obj : target object
    var getThumbPercentage = function(obj){
      return Math.round(100 * obj.value/obj.getAttribute("max")); // Percentage
    }
    
    // Updated range slider tooltip
    // obj : target object
    // text : tooltip label
    // position : absolute position
    // percentage : percentage of current value
    var updateTooltip = function(obj, text, position, percentage){
      obj.innerHTML = text; // Tooltip text
      obj.style.left = position + 'px'; // Tooltip position

      // Tooltip Position
      var tooltipStartPos = 26;
      var tooltipPosFix = percentage / 1.8;
      if(percentage > 50){
        tooltipPosFix = percentage / 2.2;
      }
      obj.style.transform = 'translate(-'+ (tooltipStartPos + tooltipPosFix) +'%, 0)';
    }
    
    // Updated background progress bar of range slider
    // obj : target object
    // progressBgColor : background color
    // progressFillColor : fill color
    // percentage : percentage of current value
    var updateProgress = function(obj, progressBgColor, progressFillColor, percentage){
      var rangeBg = 'linear-gradient(to right,  '+ progressFillColor +' 0%, '+ progressFillColor +' '+ percentage +'%, '+ progressBgColor +' '+ percentage +'%, '+ progressBgColor +' 100%)';
      var cssRule = '#'+ obj.id +'::-webkit-slider-runnable-track { background : '+ rangeBg +' } ';
      cssRule += '#'+ obj.id +'::-moz-range-track { background : '+ rangeBg +' } ';
      cssRule += '#'+ obj.id +'::-ms-track { background : '+ rangeBg +' } ';
      var applyStyle = function(styleName, cssText) {
          var styleElement = dom.getElementById(styleName);
          if (styleElement) dom.getElementsByTagName('head')[0].removeChild(styleElement);
          
          styleElement = dom.createElement('style');
          styleElement.type = 'text/css';
          styleElement.id = styleName;
          styleElement.innerHTML = cssText;
          dom.getElementsByTagName('head')[0].appendChild(styleElement);
      }
      applyStyle('range_'+ obj.id, cssRule);
    }
    
  // Refresh on resize
  var fireOnceOnResize;
  win.addEventListener('resize', function () {
    fireOnceOnResize = setTimeout(update, 100);
  });
  
  // Init Component
  init();
  
}(window, document));


// Hamburger
$(function() {                       
  $(".sidebar_Btn").click(function() {  
    $(".sidebar").addClass("sidebar_active");      
  });
  $(".closer_btn").click(function() {  
    $(".sidebar").removeClass("sidebar_active");      
  });
  $(".sidebar_Btn").click(function() {  
    $(".body_overlay").addClass("overlay_active");      
  });
  $(".closer_btn").click(function() {  
    $(".body_overlay").removeClass("overlay_active");      
    
  });
  
});


  // Hamburger
  $(function() {                       
    $(".clickable").click(function() {  
      $(".form_overlay_wrapper").addClass("form_overlay_active");      
    });

    $(".form_overlay_wrapper .closer_btn").click(function() {  
      $(".form_overlay_wrapper").removeClass("form_overlay_active");      
    });
  });
