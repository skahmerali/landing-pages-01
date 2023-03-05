const closeMenuBar = document.getElementById("close");
closeMenuBar.style.display = "none";

const openMenu = () => {
  const closeMenuBar = document.getElementById("close");
  closeMenuBar.style.display = "block";
  const menu = document.getElementById("menu");
  menu.classList.add("active");
  const bars = document.getElementById("bars");
  bars.style.display = "none";
};
const closeMenu = () => {
  const menu = document.getElementById("menu");
  const bars = document.getElementById("bars");
  const closeMenuBar = document.getElementById("close");
  closeMenuBar.style.display = "none";
  menu.classList.remove("active");
  bars.style.display = "block";
};

function displayFormFreeProposal() {
  const form = document.getElementById("form_wrapper");
  form.classList.add("form_overlay_active");
}

function closeForm() {
  const form = document.getElementById("form_wrapper");
  form.classList.remove("form_overlay_active");
}


var data = {
  "name": name,
  "company": company,
  "phone": phone,
  "email": email,
  "website": website,
  "budget": budget,
  "details": details
 }


        // range slider
        (function (win, dom) {
          'use strict';
      
          // Check for .rangeControl class
          var rangeControlList = dom.getElementsByClassName('custom-rangeInput');
      
          // Inits components
          var init = function () {
      
            // Loop all controls
            for (var i = 0; i < rangeControlList.length; i++) {
      
              // Apply inital
              updateController(rangeControlList[i]);
              // Update when changed
              rangeControlList[i].addEventListener('input', function () {
                updateController(this);
              });
              // Update when changed ( for older browsers )
              rangeControlList[i].addEventListener('change', function () {
                updateController(this);
              });
            }
          }
      
          // Updates components
          var update = function () {
            for (var i = 0; i < rangeControlList.length; i++) {
              updateController(rangeControlList[i]);
            }
          }
      
          // Update controller
          var updateController = function (obj) {
            // Thumb Position
            var thumbPos = getThumbPercentage(obj);
            var thumPosPX = getThumbPosition(obj);
            if (obj.getAttribute("data-tooltip") != "false") {
              updateTooltip(obj.nextElementSibling, obj.value, thumPosPX, thumbPos);
            } else {
              obj.nextElementSibling.style.display = "none";
            }
            updateProgress(obj, '#', '#', thumbPos);
          }
      
          // Retun range slider pixel position according to offset
          // obj : target object
          var getThumbPosition = function (obj) {
            return Math.round((obj.offsetWidth / 100) * obj.value); // Pixel
          }
      
          // Retun range slider percentage to thumb position
          // obj : target object
          var getThumbPercentage = function (obj) {
            return Math.round(100 * obj.value / obj.getAttribute("max")); // Percentage
          }
      
          // Updated range slider tooltip
          // obj : target object
          // text : tooltip label
          // position : absolute position
          // percentage : percentage of current value
          var updateTooltip = function (obj, text, position, percentage) {
            obj.innerHTML = text; // Tooltip text
            obj.style.left = position + 'px'; // Tooltip position
      
            // Tooltip Position
            var tooltipStartPos = 26;
            var tooltipPosFix = percentage / 1.8;
            if (percentage > 50) {
              tooltipPosFix = percentage / 2.2;
            }
            obj.style.transform = 'translate(-' + (tooltipStartPos + tooltipPosFix) + '%, 0)';
          }
      
          // Updated background progress bar of range slider
          // obj : target object
          // progressBgColor : background color
          // progressFillColor : fill color
          // percentage : percentage of current value
          var updateProgress = function (obj, progressBgColor, progressFillColor, percentage) {
            var rangeBg = 'linear-gradient(to right,  ' + progressFillColor + ' 0%, ' + progressFillColor + ' ' + percentage + '%, ' + progressBgColor + ' ' + percentage + '%, ' + progressBgColor + ' 100%)';
            var cssRule = '#' + obj.id + '::-webkit-slider-runnable-track { background : ' + rangeBg + ' } ';
            cssRule += '#' + obj.id + '::-moz-range-track { background : ' + rangeBg + ' } ';
            cssRule += '#' + obj.id + '::-ms-track { background : ' + rangeBg + ' } ';
            var applyStyle = function (styleName, cssText) {
              var styleElement = dom.getElementById(styleName);
              if (styleElement) dom.getElementsByTagName('head')[0].removeChild(styleElement);
      
              styleElement = dom.createElement('style');
              styleElement.type = 'text/css';
              styleElement.id = styleName;
              styleElement.innerHTML = cssText;
              dom.getElementsByTagName('head')[0].appendChild(styleElement);
            }
            applyStyle('range_' + obj.id, cssRule);
          }
      
          // Refresh on resize
          var fireOnceOnResize;
          win.addEventListener('resize', function () {
            fireOnceOnResize = setTimeout(update, 100);
          });
      
          // Init Component
          init();
      
        }(window, document));
      
      
        // Update turnaround time/working days
        function updateTurnaroundTime() {
      
          is_urgent = $('#urgent').is(':checked');
      
          if (is_urgent) {
            $('.turnaround_time').html("1 Business Days");
          } else {
            $('.turnaround_time').html("3 Business Days");
          }
      
        }
      
        // Send calculator detail to email
        function updatePrice() {
      
          var num_of_pages = parseInt($('#num_pages').val());
          var initial_cost = 11.96;
          var is_urgent = 0;
          var total_cost = initial_cost;
          let discount = 0;
      
          is_urgent = $('#urgent').is(':checked');
          total_cost = num_of_pages * initial_cost;
      
          if (is_urgent == true) {
            total_cost = (total_cost * 2);
          }
      
          $('#total_cost').text(total_cost.toFixed(2));
        }
      
        // Send calculator detail to email
        function sendMail() {
      
          $("span.error, .alert").remove();
          $("span, input").removeClass("is-invalid");
      
          var num_of_post = parseInt($('#num_post').val());
          var is_urgent = $('#urgent').is(':checked');
          var total_cost = $('#total_cost').text();
      
          var data = {
            "num_of_posts": num_of_post,
            "is_urgent": is_urgent,
            "total_cost": total_cost
          }
      
          $.ajax({
      
            type: "POST",
            dataType: 'json',
            url: "../php/mail.php",
            data: data,
      
            success: function (response) {
              if (response.status == true) {
                $('#custom-plan-box').after('<div class="alert alert-success">We received your message, our team will contact you soon.</div>')
              } else {
                $('#custom-plan-box').after('<div class="alert alert-danger">Something went wrong, please contact to support</div>')
              }
            },
      
            error: function () {
              $('#custom-plan-box').after('<div class="alert alert-danger">Something went wrong, please contact to support</div>')
            }
      
          });
      
      
      
        }
      
        // submit contact form F
        $(document).on('click', '#submitForm', function (e) {
      
          e.preventDefault();
      
          $("span.error, .alert").remove();
          $("span, input").removeClass("is-invalid");
      
          var name = $(this).closest('form').find('#name').val();
          var contact = $(this).closest('form').find('#contact').val();
          var company = $(this).closest('form').find('#company').val();
          var phone = $(this).closest('form').find('#phone').val();
          var email = $(this).closest('form').find('#email').val();
          var website = $(this).closest('form').find('#website').val();
          var budget = $(this).closest('form').find('#budget').val();
          var details = $(this).closest('form').find('#details').val();
          var flag = true;
      
      
          if (name == null || name == '') {
            $(this).closest('form').find('#fullname').addClass('is-invalid');
            flag = false;
          }
      
          if (phone == null || phone == '') {
            $(this).closest('form').find('#phone').addClass('is-invalid');
            flag = false;
          }
      
          if (email == null || email == '') {
            $(this).closest('form').find('#email').addClass('is-invalid');
            flag = false;
          }
      
          if (flag) {
      
            var form_btn = $(this);    
            var data = {
              "name": name,
              "company": company,
              "phone": phone,
              "email": email,
              "website": website,
              "budget": budget,
              "details": details
            }
      
            $.ajax({
      
              type: "POST",
              dataType: 'json',
              url: "../php/contact.php",
              data: data,
      
              success: function (response) {
                if (response.status == true) {
                    
                  $('input[name="name"]').val('');
                  $('input[name="phone"]').val('');
                  $('input[name="email"]').val('');
                  $('input[name="company"]').val('');
                  $('input[name="website"]').val('');
                  $('input[name="budget"]').val('');
                  $('textarea[name="details"]').val('');
                    
                  // form_btn.closest('.form-wrapper').after('<div class="alert alert-success">We received your message, our team will contact you soon.</div>')
                } else {
                  // form_btn.closest('.form-wrapper').after('<div class="alert alert-danger">Something went wrong, please contact to support</div>')
                }
              },
      
              error: function () {
                form_btn.closest('.form-wrapper').after('<div class="alert alert-danger">Something went wrong, please contact to support</div>')
              }
      
            });
            
          form_btn.closest('.form-wrapper').after('<div class="alert alert-success">We received your message, our team will contact you soon.</div>')
          setTimeout(function() { $(".form_overlay_wrapper").removeClass("form_overlay_active"); }, 2000);
      
      
          }
      
        });
      
        // form-overlay
        $(function () {
          $(".clickable").click(function () {
            $(".form_overlay_wrapper").addClass("form_overlay_active");
          });
      
          $(".form_overlay_wrapper .closer_btn").click(function () {
            $(".form_overlay_wrapper").removeClass("form_overlay_active");
          });
        });
        
        
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
      