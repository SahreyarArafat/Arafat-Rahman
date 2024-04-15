// ========================
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var moveLeftElements = document.querySelectorAll(
      ".moveLeft_scroll-element"
    );

    moveLeftElements.forEach(function (leftElement) {
      if (isElementInViewport(leftElement)) {
        leftElement.classList.add("scrolled");
      }
    });
  });

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.left <= window.innerWidth / 2 && rect.right >= window.innerWidth / 2
    );
  }
});

// the code below for the fixed navbar

const nav = document.querySelector(".navbar");
const menu_wrapper = document.querySelector(".menu_wrapper");
const checkBox = document.getElementById("checkBox");
const nav_btns = document.querySelectorAll(".nav_btn");

window.addEventListener("wheel", (event) => {
  // Check if the wheel event is a scroll up
  if (event.deltaY > 0) {
    // Scroll up logic here
    nav.style.top = "-84px";
    // nav.style.opacity = "0";
    // nav.style.display = "none";
    // nav.style.visibility = "hidden";
  } else {
    nav.style.top = "0px";
    // nav.style.display = "block";

    // nav.style.opacity = "1";
    // nav.style.visibility = "visible";
  }

  // console.log(event.deltaY);
});

checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    document.body.style.overflow = "hidden";
    // --------------
    window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        nav.style.top = "0px";
      }
    });
  } else {
    document.body.style.overflow = "auto";

    // --------------
    window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        nav.style.top = "-84px";
      }
    });
  }
});

menu_wrapper.addEventListener("click", () => {
  checkBox.checked = false;
  document.body.style.overflow = "auto";

  // --------------
  window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
      nav.style.top = "-84px";
    }
  });
});

nav_btns.forEach((nav_btn) => {
  nav_btn.addEventListener("click", () => {
    checkBox.checked = false;
    document.body.style.overflow = "auto";

    // --------------
    window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        nav.style.top = "-84px";
      }
    });
  });
});

/* The code below was written only for the COUNTER SECTION'S NUMBER COUNTING ANIMATION */
// Function to start the counting animation
function startCounting(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 1000; // Animation duration in milliseconds
  const fps = 60; // Frames per second

  let currentCount = 0;
  const step = target / (duration / (1000 / fps));

  const interval = setInterval(() => {
    currentCount += step;
    if (currentCount >= target) {
      clearInterval(interval);
      currentCount = target;
    }
    element.textContent = Math.floor(currentCount);
  }, 1000 / fps);
}

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle scroll event
function handleScroll() {
  var number_box_container = document.querySelector(".number_box_container");
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    if (isInViewport(number) && !number.classList.contains("counted")) {
      startCounting(number);
      number.classList.add("counted");

      number_box_container.classList.add("scrolled");
    }
  });
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

// Initial check on page load
handleScroll();

/* The code below was written only for the PROJECT SECTION TO SHOW EACH PROJECT INDIVIDUALLY */

let projectLinks = document.querySelectorAll(".project-link");
let projects = document.querySelectorAll(".project");
let projectsContainer = document.querySelector(".projects-container");
var projectLink = false;

projects.forEach((project) => {
  projectLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const filter = this.textContent.trim();
      const projectData = project.getAttribute("data-val").split(" / ");
      projectLink = true;
      if (projectData.includes(filter)) {
        setTimeout(() => {
          project.style.display = "flex";
        }, 400);

        project.classList.add("project-unclicked-anim-js");
        projectsContainer.classList.remove("projects_container_height");

        setTimeout(() => {
          project.classList.remove("project-unclicked-anim-js");
          project.classList.add("project-clicked-anim-js");
        }, 500);
      } else {
        project.classList.add("project-unclicked-anim-js");
        setTimeout(() => {
          project.style.display = "none";
        }, 400);
      }
    });
  });
});

document
  .querySelector(".show-all-projects")
  .addEventListener("click", function () {
    if (projectLink == true) {
      projects.forEach((project) => {
        setTimeout(() => {
          project.style.display = "flex";
        }, 400);
        projectsContainer.classList.add("projects_container_height");
        project.classList.add("project-unclicked-anim-js");
        setTimeout(() => {
          project.classList.remove("project-clicked-anim-js");
          project.classList.remove("project-unclicked-anim-js");
        }, 500);
      });
    }
    projectLink = false;
  });

// ---------------------------------------------------------
/* The code below was written only for the NAV & PROJECT SECTION'S SELECTED ITEM IDENTIFY */

$(document).on("click", ".menu-items li", function () {
  $(this).addClass("active-link").siblings().removeClass("active-link");
});

$(document).on("click", ".project-link-container ul li", function () {
  $(this).addClass("active-link").siblings().removeClass("active-link");
});
// ================================
// the code below for the Contact form transporter ....

const contactForm = document.getElementById("contactForm"); // Make sure this matches your form's ID
const massage_submit_btn_text = document.querySelector(
  ".massage_submit_btn_text"
);
const massage_submit_btn_img = document.querySelector(
  ".massage_submit_btn_img"
);

function resetSubmitButton() {
  massage_submit_btn_text.innerText = "Send Message";
  massage_submit_btn_img.src = "./images/9.email_icon_100.png";
}

// Attach event listeners to reset button text on input field changes
Array.from(contactForm.elements).forEach((element) => {
  element.addEventListener("input", resetSubmitButton);
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission by the browser

  if (contactForm.checkValidity()) {
    submitForm(); // Only call submitForm if the form is valid
  } else {
    contactForm.reportValidity(); // This will show the validation messages to the user
  }
});

async function submitForm() {
  massage_submit_btn_text.innerHTML = "Sending Message";
  massage_submit_btn_img.src = "./images/16.sending_message.gif";

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  // ===Nodemailer Values
  const mail_from = "My Portfolio"; //add the address which will show in mail
  const mail_to = "arafat4in@gmail.com"; //add the recever
  const mail_subject = "New Form Submission"; //add the mail subject

  try {
    const response = await fetch(
      "https://contact-form-data-transporter.onrender.com/submit-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          mail_from,
          mail_to,
          mail_subject,
        }),
      }
    );

    if (response.ok) {
      massage_submit_btn_text.innerHTML = "Message Delivered";
      massage_submit_btn_img.src = "./images/17.message_received.png";

      // alert("Form submitted successfully");
      contactForm.reset();
    } else {
      massage_submit_btn_text.innerHTML = "Error Occurred!";
      massage_submit_btn_img.src = "./images/18.message_error.png";
      // alert("Error submitting form");
    }
  } catch (error) {
    massage_submit_btn_text.innerHTML = "Error Occurred!";
    massage_submit_btn_img.src = "./images/18.message_error.png";

    setTimeout(() => {
      massage_submit_btn_img.src = "./images/19.resend_mail.png";
      massage_submit_btn_text.innerHTML = "Please Resend";
      contactForm.reset();
    }, 3000);

    // console.error("Error:", error);
    // alert("Error submitting form");
  }
}

const submit_btn = document.querySelector("#submit_btn");

submit_btn.addEventListener("click", function () {
  if ((massage_submit_btn_text.innerHTML = "Sent Successfully")) {
    resetSubmitButton();
  }
});
