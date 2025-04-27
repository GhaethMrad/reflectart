const toggle = Array.from(document.querySelectorAll(".toggle-menu"));
const menu = Array.from(document.querySelectorAll(".menu"));
const toggleAside = document.querySelector(".toggle-aside");
const aside = Array.from(document.querySelectorAll(".aside"));
const xmark = document.querySelector(".fa-xmark");

toggleAside.addEventListener("click", () => {
    aside.forEach((ele) => {
        ele.classList.add("show");
    })
})

xmark.addEventListener("click", () => {
    aside.forEach((ele) => {
        ele.classList.remove("show");
    })
})

toggle.forEach((ele, index) => {
    ele.addEventListener("click", () => {
        toggle.forEach((ele) => {
            ele.classList.remove("active")
        })
        ele.classList.add("active")
        menu[index].classList.toggle("active")
    })
})