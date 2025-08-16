// Tyler Moxley Real Estate v3 - Contact Form JavaScript

// === FORM HANDLING === 
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForms();
    initializeFormValidation();
    initializePhoneFormatting();
});

function initializeContactForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validate form
    if (!validateForm(form)) {
        showNotification('Please correct the errors and try again.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Success response
        showNotification('Thank you! Tyler will contact you within 2 hours.', 'success');
        
        // Reset form
        form.reset();
        clearFormValidation(form);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Optional: Track form submission
        trackFormSubmission(data);
        
    }, 2000);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('.form-input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    // Clear previous validation
    clearInputValidation(input);
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // Apply validation styles and messages
    if (!isValid) {
        input.classList.add('error');
        showInputMessage(input, message, 'error');
    } else if (value) {
        input.classList.add('success');
    }
    
    return isValid;
}

function clearInputValidation(input) {
    input.classList.remove('error', 'success');
    const existingMessage = input.parentNode.querySelector('.input-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function clearFormValidation(form) {
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => clearInputValidation(input));
}

function showInputMessage(input, message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `input-message ${type}`;
    messageEl.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${message}`;
    input.parentNode.appendChild(messageEl);
}

// === PHONE NUMBER FORMATTING === 
function initializePhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            
            e.target.value = value;
        });
    });
}

// === REAL-TIME VALIDATION === 
function initializeFormValidation() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                validateInput(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearInputValidation(this);
            }
        });
    });
}

// === FORM ENHANCEMENTS === 
function scheduleShowing(propertyId) {
    const modal = createShowingModal(propertyId);
    document.body.appendChild(modal);
    modal.classList.add('active');
}

function createShowingModal(propertyId) {
    const modal = document.createElement('div');
    modal.className = 'modal showing-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Schedule Property Showing</h3>
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <form class="showing-form">
                    <input type="hidden" name="property_id" value="${propertyId}">
                    
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" class="form-input" placeholder="First Name" required>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-input" placeholder="Last Name" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <input type="email" class="form-input" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" class="form-input" placeholder="Phone">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <input type="date" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <select class="form-input" required>
                                <option value="">Preferred Time</option>
                                <option value="morning">Morning (9 AM - 12 PM)</option>
                                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                                <option value="evening">Evening (5 PM - 7 PM)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <textarea class="form-input" placeholder="Any specific questions or requests?" rows="3"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-full">SCHEDULE SHOWING</button>
                </form>
            </div>
        </div>
    `;
    
    // Handle showing form submission
    const showingForm = modal.querySelector('.showing-form');
    showingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SCHEDULING...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Showing scheduled! Tyler will confirm the appointment within 2 hours.', 'success');
            closeModal(modal.querySelector('.modal-close'));
        }, 1500);
    });
    
    return modal;
}

function closeModal(closeBtn) {
    const modal = closeBtn.closest('.modal');
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

// === QUICK CONTACT ACTIONS === 
function quickCall() {
    window.location.href = 'tel:925-518-1083';
    trackEvent('contact', 'phone', 'quick_call');
}

function quickEmail() {
    window.location.href = 'mailto:tyler@tylermoxley.com?subject=Real Estate Inquiry';
    trackEvent('contact', 'email', 'quick_email');
}

function requestConsultation() {
    const modal = createConsultationModal();
    document.body.appendChild(modal);
    modal.classList.add('active');
}

function createConsultationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal consultation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Request Free Consultation</h3>
                <button class="modal-close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                <p>Schedule a complimentary consultation to discuss your real estate goals.</p>
                
                <form class="consultation-form">
                    <div class="form-group">
                        <input type="text" class="form-input" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-input" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-input" placeholder="Phone Number" required>
                    </div>
                    <div class="form-group">
                        <select class="form-input" required>
                            <option value="">Consultation Type</option>
                            <option value="buying">Buying Consultation</option>
                            <option value="selling">Selling Consultation</option>
                            <option value="market">Market Analysis</option>
                            <option value="investment">Investment Strategy</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="form-input">
                            <option value="">Preferred Contact Method</option>
                            <option value="phone">Phone Call</option>
                            <option value="video">Video Call</option>
                            <option value="in-person">In-Person Meeting</option>
                            <option value="email">Email Discussion</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-full">REQUEST CONSULTATION</button>
                </form>
            </div>
        </div>
    `;
    
    // Handle consultation form
    const consultationForm = modal.querySelector('.consultation-form');
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SUBMITTING...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Consultation requested! Tyler will contact you within 4 hours to schedule.', 'success');
                closeModal(modal.querySelector('.modal-close'));
            }, 1500);
        }
    });
    
    return modal;
}

// === PROPERTY INTERACTIONS === 
function scheduleShowing(propertyId) {
    const modal = createShowingModal(propertyId);
    document.body.appendChild(modal);
    modal.classList.add('active');
    trackEvent('property', 'schedule_showing', `property_${propertyId}`);
}

function requestAnalysis(propertyId) {
    showNotification('Investment analysis request sent! Tyler will prepare a detailed report within 24 hours.', 'success');
    trackEvent('property', 'request_analysis', `property_${propertyId}`);
}

function viewSimilar(propertyId) {
    // In a real implementation, this would redirect to similar properties
    showNotification('Finding similar properties... This feature will redirect to matching listings.', 'info');
    trackEvent('property', 'view_similar', `property_${propertyId}`);
}

// === ANALYTICS TRACKING === 
function trackEvent(category, action, label) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

function trackFormSubmission(formData) {
    trackEvent('form', 'submit', formData.interest || 'general_inquiry');
}

// === NOTIFICATIONS === 
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle', 
        info: 'info-circle',
        warning: 'exclamation-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icons[type] || 'info-circle'}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="hideNotification(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            hideNotification(notification.querySelector('.notification-close'));
        }
    }, 5000);
}

function hideNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// === FORM ENHANCEMENTS === 
function initializeFormEnhancements() {
    // Auto-expand textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
            if (this.value.trim()) {
                this.parentNode.classList.add('filled');
            } else {
                this.parentNode.classList.remove('filled');
            }
        });
    });
}

// === PROPERTY INQUIRY SHORTCUTS === 
function inquireAboutProperty(propertyId, address) {
    const subject = `Inquiry about ${address}`;
    const body = `Hi Tyler,\n\nI'm interested in learning more about the property at ${address}. Please contact me to discuss details and schedule a showing.\n\nThank you!`;
    
    window.location.href = `mailto:tyler@tylermoxley.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    trackEvent('property', 'email_inquiry', `property_${propertyId}`);
}

function callAboutProperty(propertyId, address) {
    if (confirm(`Call Tyler about ${address}?`)) {
        window.location.href = 'tel:925-518-1083';
        trackEvent('property', 'phone_inquiry', `property_${propertyId}`);
    }
}

// === INITIALIZE ON LOAD === 
document.addEventListener('DOMContentLoaded', function() {
    initializeFormEnhancements();
    
    // Set minimum date for showing scheduling to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.min = today;
    });
});