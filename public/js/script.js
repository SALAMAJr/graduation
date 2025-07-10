document.addEventListener('DOMContentLoaded', function() {
    // تنشيط القائمة المتنقلة للهواتف
    // const mobileMenuButton = document.createElement('button');
    // mobileMenuButton.className = 'mobile-menu-button';
    // mobileMenuButton.innerHTML = '☰';
    
    // const nav = document.querySelector('nav');
    // nav.prepend(mobileMenuButton);

    // mobileMenuButton.addEventListener('click', function() {
    //     const navLinks = document.querySelector('.nav-links');
    //     navLinks.classList.toggle('active');
    // });

    // تأثير التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // التحقق من صحة نموذج الاشتراك
    const subscribeForms = document.querySelectorAll('input[type="email"]');
    subscribeForms.forEach(form => {
        form.addEventListener('blur', function() {
            if (!this.value.includes('@')) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // إضافة تأثير عند التمرير
    // window.addEventListener('scroll', function() {
    //     const scrollPosition = window.scrollY;
    //     const header = document.querySelector('header');
        
        // if (scrollPosition > 100) {
        //     header.style.opacity = '0.9';
        // } else {
        //     header.style.opacity = '1';
        // }
    });
// });
// how-it-works
document.addEventListener('DOMContentLoaded', function() {
    // Animation for step cards
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = `all 0.5s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, 100);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter form validation
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (!this.value.includes('@')) {
                this.style.border = '2px solid red';
            } else {
                this.style.border = 'none';
            }
        });
    }

    // Button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
});

//contact
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Image placeholder functionality
    // const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    // This is where you would replace placeholders with actual images
    // function loadImages() {
        // Example: Replace placeholders with actual images
        // document.getElementById('image1').style.backgroundImage = "url('path/to/your/image.jpg')";
        // document.getElementById('image1').textContent = "";
    // }
    
    // Call loadImages when you're ready to add your actual images
    // loadImages();
});