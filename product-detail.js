let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

// Đảm bảo chỉ ảnh đầu tiên hiển thị khi trang tải lên
slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? "block" : "none";
    slide.style.opacity = index === 0 ? "1" : "0";
});

function changeSlide(index) {
    slides[currentIndex].style.opacity = "0";
    
    setTimeout(() => {
        slides[currentIndex].style.display = "none";
        slides[index].style.display = "block";
        slides[index].style.opacity = "0";
        
        setTimeout(() => {
            slides[index].style.opacity = "1";
        }, 100);
        
        dots[currentIndex].classList.remove("active");
        dots[index].classList.add("active");
        currentIndex = index;
    }, 300);
}

// Tự động chuyển slide mỗi 5 giây
setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
}, 5000);

// Bắt sự kiện click vào nút chọn hình
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => changeSlide(index));
});
