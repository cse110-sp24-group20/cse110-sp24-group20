var addBtn = document.querySelector(".add_button");
var modal = document.getElementsByClassName("modal")[0];
var closeBtn = document.getElementsByClassName("close")[0];

addBtn.addEventListener("click", () => {
    modal.style.display = "block";
})

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});