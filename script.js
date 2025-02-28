document.addEventListener("DOMContentLoaded", function () {
    const productSection = document.querySelector(".products");

    function revealOnScroll() {
        const sectionPosition = productSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (sectionPosition < screenPosition) {
            productSection.classList.add("active");
            window.removeEventListener("scroll", revealOnScroll);
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});
