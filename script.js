document.addEventListener("DOMContentLoaded", function () {
    const productSection = document.querySelector(".products");

    function revealOnScroll() {
        const sectionPosition = productSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2; // Hiển thị sớm hơn chút để mượt hơn

        if (sectionPosition < screenPosition) {
            productSection.classList.add("active");
            window.removeEventListener("scroll", revealOnScroll); // Gỡ sự kiện sau khi kích hoạt để tránh lặp lại
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Kiểm tra ngay nếu section đã trong tầm nhìn
});
