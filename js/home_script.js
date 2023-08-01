function ShowEllipsis() {
    let ellipsis_popups = document.getElementById('ellipsis_popups');
    ellipsis_popups.classList.toggle("open_menu");
}

window.onclick = function (event) {
    let ellipsis_popups = document.getElementById('ellipsis_popups');

    if (!event.target.matches('.drop_menu')) {
        ellipsis_popups.classList.remove("open_menu");
    }
}