document.addEventListener("DOMContentLoaded", function () {
    // Slider trang chính
    const slides = document.querySelector(".slides");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    const totalSlides = dots.length;

    // Kiểm tra xem slides và dots có tồn tại không
    if (!slides || !dots.length) {
        console.error("Không tìm thấy slider hoặc dots!");
        return;
    }

    function showSlide(index) {
        // Đảm bảo index nằm trong phạm vi hợp lệ
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        slides.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        currentIndex = index; // Cập nhật currentIndex
    }

    // Thêm sự kiện click cho dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });

    // Tự động chuyển slide sau mỗi 3 giây
    setInterval(function () {
        showSlide(currentIndex + 1);
    }, 3000);

    // Xử lý trang chi tiết sản phẩm (nếu có)
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");
    const productPrice = params.get("price");
    const productDesc = params.get("desc");
    const productImg = params.get("img");
    const extraImages = params.get("images") ? params.get("images").split(",") : [];

    if (productName && productPrice && productDesc && productImg) {
        const titleElement = document.querySelector(".product-title");
        const priceElement = document.querySelector(".price");
        const descElement = document.querySelector(".product-desc");
        const sliderContainer = document.querySelector(".slides");
        const dotsContainer = document.querySelector(".dots");

        if (titleElement) titleElement.textContent = decodeURIComponent(productName);
        if (priceElement) priceElement.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productPrice);
        if (descElement) descElement.textContent = decodeURIComponent(productDesc);

        if (sliderContainer && dotsContainer) {
            sliderContainer.innerHTML = "";
            dotsContainer.innerHTML = "";
            const allImages = [decodeURIComponent(productImg), ...extraImages.map(img => decodeURIComponent(img))];

            allImages.forEach((imgSrc, index) => {
                const imgElement = document.createElement("img");
                imgElement.src = imgSrc;
                imgElement.classList.add("slide");
                if (index === 0) imgElement.classList.add("active");
                sliderContainer.appendChild(imgElement);

                const dot = document.createElement("span");
                dot.classList.add("dot");
                if (index === 0) dot.classList.add("active");
                dot.dataset.index = index;
                dotsContainer.appendChild(dot);
            });

            const images = document.querySelectorAll(".slide");
            const detailDots = document.querySelectorAll(".dot");
            let detailIndex = 0;

            function showDetailSlide(index) {
                if (index >= images.length) index = 0;
                if (index < 0) index = images.length - 1;
                images.forEach(img => img.classList.remove("active"));
                detailDots.forEach(dot => dot.classList.remove("active"));
                images[index].classList.add("active");
                detailDots[index].classList.add("active");
                detailIndex = index;
            }

            detailDots.forEach(dot => {
                dot.addEventListener("click", function () {
                    showDetailSlide(parseInt(this.dataset.index));
                });
            });

            setInterval(function () {
                showDetailSlide(detailIndex + 1);
            }, 3000);
        }
    }
});