// Navbar Fixed
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector('#to-top')

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex')
    } else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden')
    }
}

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function(){
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// Klik di luar hamburger
window.addEventListener('click', function (e) {
    if(e.target != hamburger && e.target != navMenu){
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

// Darkmode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function() {
    if(darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    }
});

// Pindahkan toggle sesuai mode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkToggle.checked = true;
} else {
    darkToggle.checked = false;
}

// Submisi Contact Form ke Spreadsheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbze4_2F6v0OljKAslYwKCwkQQGegiLFuRimEEgnvJy2cdb4lQqsxkmuE6lxgMLNBQzRpQ/exec'
        const form = document.forms['contact-form']
        const btnKirim = document.querySelector('.btn-kirim');
        const btnLoading = document.querySelector('.btn-loading');
        const successAlert = document.querySelector('#success-alert');
        const failedAlert = document.querySelector('#failed-alert');
        const closeSuccess = document.querySelector('.close-success');
        const closeFailed = document.querySelector('.close-failed');

        form.addEventListener('submit', e => {
            e.preventDefault();
            // ketika submit diklik
            // tampilkan loading, hilangkan kirim
            btnLoading.classList.toggle('hidden');
            btnKirim.classList.toggle('hidden');
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    // tampilkan kirim, hilangkan loading
                    btnLoading.classList.toggle('hidden');
                    btnKirim.classList.toggle('hidden');
                    // tampilkan alert
                    successAlert.classList.remove('hidden');
                    successAlert.classList.add('flex');
                    // Close alert
                    closeSuccess.addEventListener('click', function(){
                        successAlert.classList.remove('flex');
                        successAlert.classList.add('hidden');
                    })
                    // Reset form
                    form.reset();
                    console.log('Success!', response)
                })
                .catch(error => {
                    // tampilkan kirim, hilangkan loading
                    btnLoading.classList.toggle('hidden');
                    btnKirim.classList.toggle('hidden');
                    // tampilkan alert
                    failedAlert.classList.remove('hidden');
                    failedAlert.classList.add('flex');
                    // Close alert
                    closeFailed.addEventListener('click', function(){
                        failedAlert.classList.remove('flex');
                        failedAlert.classList.add('hidden');
                    })
                    console.error('Error!', error.message)
                })
        })