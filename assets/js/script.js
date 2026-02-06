const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {
    const query = searchBox.value.toLowerCase();
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        const text = section.innerText.toLowerCase();
        section.style.display = text.includes(query) ? "block" : "none";
    });
});
