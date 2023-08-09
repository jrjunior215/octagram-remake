function ShowEllipsis() {
    let popup = document.getElementById('popup');
    popup.classList.add("open_menu");
}

window.onclick = function (event) {
    let popup = document.getElementById('popup');

    if (!event.target.matches('.ellipsis')) {
        popup.classList.remove("open_menu");
    }

}