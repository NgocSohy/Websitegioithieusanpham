let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

// Tạo dots tự động
slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => changeSlide(index));
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");
dots[0].classList.add("active");

// Hàm đổi slide
function changeSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentIndex = index;
}

// Tự động chuyển slide mỗi 5 giây
setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
}, 5000);

// Hỗ trợ vuốt trên di động
let touchStartX = 0;
document.querySelector(".slider-container").addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

document.querySelector(".slider-container").addEventListener("touchend", (e) => {
    let touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX - 50) changeSlide((currentIndex + 1) % slides.length);
    if (touchEndX > touchStartX + 50) changeSlide((currentIndex - 1 + slides.length) % slides.length);
});
