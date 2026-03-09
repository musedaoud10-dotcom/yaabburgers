const tabs = document.querySelectorAll(".tab")
const categories = document.querySelectorAll(".menu-category")

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"))
categories.forEach(c=>c.classList.remove("active"))

tab.classList.add("active")

document.getElementById(tab.dataset.tab).classList.add("active")

})

})
