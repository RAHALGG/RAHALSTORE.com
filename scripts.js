document.getElementById('search').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

[_{{{CITATION{{{_1{](https://github.com/nishanya/classy/tree/78bd422b7d42493f66971ebaf54dfdff9fb508bc/resources%2Fviews%2Flayouts%2Fnavbar.blade.php)[_{{{CITATION{{{_2{](https://github.com/yura136/projects/tree/e4fd42348b3bf37ecdcce7dc0fb54946435e8be8/PHP%2FmyShopMVC%2Fviews%2Fnews%2Findex.php)[_{{{CITATION{{{_3{](https://github.com/arthurdlima/king-ad-shop/tree/7263cd69d03f444d66dce650a1d393e36971748a/src%2Fcomponents%2FHeader.js)[_{{{CITATION{{{_4{](https://github.com/stwebcode/register/tree/d2462b929bc3a6567d9234d411dbd23c589a4060/header.php)[_{{{CITATION{{{_5{](https://github.com/KarlTrafi/StartUp-website/tree/69399b8b3161e5e7c6e6d30bddb9dcae1b08fd11/portofolio%2Findex.php)[_{{{CITATION{{{_6{](https://github.com/rakesh99gara/eye-v2.0/tree/b22b04e344014dacbd69cc5ced03aed6d2786691/admin_home.php)[_{{{CITATION{{{_7{](https://github.com/dnimeshika/Task_Project1/tree/ec13dc9abed66a4548374624f2b3d7163836f206/Task_Project_1%2Ffooter.php)[_{{{CITATION{{{_8{](https://github.com/soro12345/bidme/tree/3b1c6631a302ff51fc64fdd309616e92940dfaa2/navbar_template.php)