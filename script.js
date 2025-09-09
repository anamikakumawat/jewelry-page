 // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Form handling - SIMPLIFIED APPROACH
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        // Email validation
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Clear error state
        function clearError(fieldId) {
            const group = document.getElementById(fieldId + 'Group');
            if (group) {
                group.classList.remove('has-error');
            }
        }

        // Show error state
        function showError(fieldId) {
            const group = document.getElementById(fieldId + 'Group');
            if (group) {
                group.classList.add('has-error');
            }
        }

        // Validate single field
        function validateField(fieldId, validator) {
            const field = document.getElementById(fieldId);
            if (!field) return false;
            
            const value = field.value.trim();
            const isValid = validator(value);
            
            if (isValid) {
                clearError(fieldId);
            } else {
                showError(fieldId);
            }
            
            return isValid;
        }

        // Validate entire form
        function validateForm() {
            const nameValid = validateField('name', value => value.length > 0);
            const emailValid = validateField('email', value => value.length > 0 && isValidEmail(value));
            const messageValid = validateField('message', value => value.length > 0);
            
            return nameValid && emailValid && messageValid;
        }

        // Real-time validation (optional - only on input, not blur)
        document.getElementById('name').addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                clearError('name');
            }
        });

        document.getElementById('email').addEventListener('input', function() {
            const value = this.value.trim();
            if (value.length > 0 && isValidEmail(value)) {
                clearError('email');
            }
        });

        document.getElementById('message').addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                clearError('message');
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!validateForm()) {
                // Find first error field and focus it
                const firstError = document.querySelector('.form-group.has-error input, .form-group.has-error textarea');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Clear all errors
                ['name', 'email', 'message'].forEach(clearError);

                // Show success message
                successMessage.style.display = 'block';
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

            }, 2000);
        });

        // Prevent any potential issues with field visibility
        setInterval(function() {
            const fields = document.querySelectorAll('#name, #email, #message');
            fields.forEach(field => {
                if (field && (field.style.display === 'none' || field.style.visibility === 'hidden' || field.style.opacity === '0')) {
                    field.style.display = 'block';
                    field.style.visibility = 'visible';
                    field.style.opacity = '1';
                    console.log('Field visibility restored for:', field.id);
                }
            });
        }, 1000);