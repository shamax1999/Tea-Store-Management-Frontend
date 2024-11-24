let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon','bx-sun');
        document.body.classList.add('active');
    }else{
        darkmode.classList.replace('bx-sun','bx-moon');
        document.body.classList.remove('active');
    }
}


const sr = ScrollReveal ({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    reset: true
});


sr.reveal(`.home-text, .home-img,
            .about-img, .about-text,
            .box, .s-box,
            .btn, .connect-text,
            .contact-box`, {
    interval: 200
})


    document.addEventListener('DOMContentLoaded', function() {
        const toggleButton = document.getElementById('toggle-contact-form');
        const contactForm = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');
        
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            contactForm.classList.toggle('active'); 
        });

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            setTimeout(() => {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.classList.remove('error');
                
                contactForm.reset();
            }, 500); 
        });
    });



