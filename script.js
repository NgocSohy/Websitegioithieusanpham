document.addEventListener("DOMContentLoaded", function () {
    // Lấy thông tin từ URL
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");
    const productPrice = params.get("price");
    const productDesc = params.get("desc");
    const productImg = params.get("img"); // Ảnh chính
    const extraImages = params.get("images") ? params.get("images").split(",") : []; // Ảnh phụ

    // Hiển thị thông tin sản phẩm
    if (productName && productPrice && productDesc && productImg) {
        document.querySelector(".product-title").textContent = decodeURIComponent(productName);
        document.querySelector(".price").textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productPrice);
        document.querySelector(".product-desc").textContent = decodeURIComponent(productDesc);
        
        // Cập nhật ảnh vào slider
        const slides = document.querySelectorAll(".slide");
        slides[0].src = decodeURIComponent(productImg); // Ảnh chính
        extraImages.forEach((img, index) => {
            if (slides[index + 1]) slides[index + 1].src = decodeURIComponent(img);
        });
    }

    // Slider ảnh
    let currentIndex = 0;
    const images = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");

    // Tạo dots
    images.forEach((_, index) => {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        images.forEach(img => img.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        images[index].classList.add("active");
        dots[index].classList.add("active");
    }

    // Tự động chuyển ảnh
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
    }, 3000);

    // Sự kiện khi click vào dot
    dots.forEach(dot => {
        dot.addEventListener("click", function () {
            currentIndex = parseInt(this.dataset.index);
            showSlide(currentIndex);
        });
    });
});
