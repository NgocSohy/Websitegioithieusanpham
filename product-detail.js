document.addEventListener("DOMContentLoaded", () => {
    // Xử lý slider ảnh (hiện tại chỉ có 1 ảnh mỗi sản phẩm, nhưng sẵn sàng cho nhiều ảnh)
    const products = document.querySelectorAll(".product");
    
    products.forEach(product => {
        const slides = product.querySelectorAll(".slide");
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            slides[index].classList.add("active");
            currentIndex = index;
        }

        // Hiển thị slide đầu tiên
        if (slides.length > 0) {
            showSlide(0);
        }

        // Hỗ trợ vuốt trên mobile (nếu thêm nhiều ảnh sau này)
        const sliderContainer = product.querySelector(".slider-container");
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].clientX;
        });

        sliderContainer.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchStartX - touchEndX > 50 && currentIndex < slides.length - 1) {
                showSlide(currentIndex + 1);
            } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
                showSlide(currentIndex - 1);
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Hiện tại không cần slider vì mỗi sản phẩm chỉ có 1 ảnh
    // Nếu muốn thêm slider sau này, có thể mở rộng từ đây
    
    // Thêm hiệu ứng hành động khi nhấp vào ảnh
    const images = document.querySelectorAll(".product-image");
    
    images.forEach(image => {
        image.addEventListener("click", () => {
            image.classList.add("pulse");
            setTimeout(() => {
                image.classList.remove("pulse");
            }, 300); // Thời gian pulse animation
        });
    });
});