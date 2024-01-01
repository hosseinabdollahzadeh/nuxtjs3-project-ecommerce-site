<template>
  <section class="food_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          منو محصولات
        </h2>
      </div>

      <ul class="filters_menu">
        <li class="active">برگر</li>
        <li>پیتزا</li>
        <li>پیش غذا و سالاد</li>
      </ul>

      <div class="filters_content">
        <div class="row grid">
          <div class="col-sm-6 col-lg-4">
            <div class="box">
              <div>
                <div class="img-box">
                  <img src="./images/b1.jpg" alt="">
                </div>
                <div class="detail-box">
                  <h5>
                    لورم ایپسوم متن
                  </h5>
                  <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                    گرافیک است.
                  </p>
                  <div class="options">
                    <h6>
                      <del>45,000</del>
                      34,000
                      <span>تومان</span>
                    </h6>
                    <a href="">
                      <i class="bi bi-cart-fill text-white fs-5"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <a href="">
          مشاهده بیشتر
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const {public: {apiBaseUrl}} = useRuntimeConfig();
const {data, error} = await useFetch(`${apiBaseUrl}/products/products-tabs`);

console.log(data.value);
</script>