// Liminal Land Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
    
    // Only initialize particle effects on home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        initParticles();
    }
});

function initWebsite() {
    // Add smooth scrolling to navigation links
    setupNavigation();
    
    // Add parallax effect to background
    setupParallax();
    
    // Initialize background music
    setupBackgroundMusic();
    
    // Initialize custom cursor
    setupCustomCursor();
    
    // Initialize gallery if on gallery page
    if (window.location.pathname.includes('gallery.html')) {
        setupGallery();
    }
    
    // Initialize archives password modal if on archives page
    if (window.location.pathname.includes('archives.html')) {
        setupArchivesPassword();
        setupArchivesNavigation();
    }

    // Initialize booking purchase redirects if on booking page
    if (window.location.pathname.includes('booking.html')) {
        setupTicketPurchases();
    }
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
        createParticle(particlesContainer);
    }
    
    // Continuously add new particles
    setInterval(() => {
        if (particlesContainer.children.length < 40) {
            createParticle(particlesContainer);
        }
    }, 300);
}

function setupTicketPurchases() {
    const robloxUrl = 'https://www.roblox.com/games/13762435721/Asphodel-Park';
    // Select all purchase buttons that are NOT inside the Showtime ticket card
    const purchaseButtons = document.querySelectorAll('.ticket-card:not(.showtime-ticket) .purchase-button');
    if (!purchaseButtons || purchaseButtons.length === 0) return;
    purchaseButtons.forEach((button) => {
        button.addEventListener('click', () => {
            window.location.href = robloxUrl;
        });
    });
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Randomize position and timing
    const randomLeft = Math.random() * 100;
    const randomDuration = 8 + Math.random() * 12; // 8-20 seconds
    
    particle.style.left = randomLeft + '%';
    particle.style.animationDuration = randomDuration + 's';
    
    // Add slight size variation for natural ash appearance
    const size = 2 + Math.random() * 3; // 2-5px
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Add slight opacity variation
    const opacity = 0.4 + Math.random() * 0.4; // 0.4-0.8
    particle.style.background = `rgba(255, 255, 255, ${opacity})`;
    
    container.appendChild(particle);
    
    // Remove particle after animation completes using animationend event
    particle.addEventListener('animationend', () => {
        if (particle.parentNode) {
            particle.remove();
        }
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation based on link text
            const linkText = this.textContent.trim();
            handleNavigation(linkText);
        });
    });
}

function handleNavigation(linkText) {
    switch(linkText) {
        case 'Home':
            window.location.href = 'index.html';
            break;
        case 'Discovery':
            window.location.href = 'attractions.html';
            break;
        case 'Gallery':
            window.location.href = 'gallery.html';
            break;
        case 'Archives':
            window.location.href = 'archives.html';
            break;
        case 'About Asphodel Park':
            window.location.href = 'about.html';
            break;
        case 'Online Booking':
            window.location.href = 'booking.html';
            break;
        default:
            console.log(`Navigation to: ${linkText}`);
    }
}

function setupParallax() {
    // Don't apply parallax on attractions, gallery, archives, about, or booking pages
    if (
        window.location.pathname.includes('attractions.html') ||
        window.location.pathname.includes('gallery.html') ||
        window.location.pathname.includes('archives.html') ||
        window.location.pathname.includes('about.html') ||
        window.location.pathname.includes('booking.html')
    ) {
        return;
    }
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.background-image');
        
        if (background) {
            const rate = scrolled * -0.3;
            background.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function setupBackgroundMusic() {
    const audio = document.getElementById('background-music');
    if (audio) {
        // Set volume to 30% to match HTML
        audio.volume = 0.3;
        
        // Try to play immediately
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Audio started playing successfully
                console.log('Audio started playing');
            }).catch(error => {
                console.log('Audio autoplay failed:', error);
                // Add multiple interaction events to start music
                const startAudio = () => {
                    if (audio.paused) {
                        audio.play().then(() => {
                            console.log('Audio started on user interaction');
                        }).catch(err => {
                            console.log('Failed to start audio:', err);
                        });
                    }
                };
                
                // Try to start on any user interaction
                document.addEventListener('click', startAudio, { once: true });
                document.addEventListener('keydown', startAudio, { once: true });
                document.addEventListener('mousemove', startAudio, { once: true });
                document.addEventListener('touchstart', startAudio, { once: true });
            });
        }
        
        // Setup speaker control functionality
        setupSpeakerControl(audio);
    }
}

function setupSpeakerControl(audio) {
    const speakerIcon = document.getElementById('speaker-icon');
    if (speakerIcon) {
        speakerIcon.addEventListener('click', function() {
            if (audio.muted) {
                // Unmute music
                audio.muted = false;
                speakerIcon.src = 'resources/speaker_on.png';
            } else {
                // Mute music
                audio.muted = true;
                speakerIcon.src = 'resources/speaker_off.png';
            }
        });
    }
}

function setupCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show custom cursor
    cursor.style.display = 'block';
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 16 + 'px';
        cursor.style.top = e.clientY - 16 + 'px';
        
        // Check if hovering over clickable element
        const target = e.target;
        if (target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.classList.contains('nav-link') ||
            target.classList.contains('logo-image') ||
            target.classList.contains('speaker-icon') ||
            target.classList.contains('thumbnail') ||
            target.classList.contains('gallery-arrow') ||
            target.classList.contains('close-button') ||
            target.classList.contains('submit-button') ||
            target.classList.contains('archives-video') ||
            target.classList.contains('about-video') ||
            target.closest('.speaker-control') ||
            target.closest('.navigation')) {
            cursor.classList.add('pointer');
        } else {
            cursor.classList.remove('pointer');
        }
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.display = 'none';
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        cursor.style.display = 'block';
    });
}

// Remove all complex animations and effects
function showNotification(message) {
    // Disabled for minimal design
    return;
}

function addHoverEffect(element) {
    // Disabled for minimal design
    return;
}

function removeHoverEffect(element) {
    // Disabled for minimal design
    return;
}

function createMouseTrail() {
    // Disabled for minimal design
    return;
}

function setupScrollAnimations() {
    // Disabled for minimal design
    return;
}

function setupTypingEffect() {
    // Disabled for minimal design
    return;
}

function setupGallery() {
    const mainImage = document.getElementById('main-gallery-img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    
    if (!mainImage || !thumbnails.length) return;
    
    let currentIndex = 0;
    
    // Thumbnail click handlers
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateGallery();
        });
    });
    
    // Navigation arrow handlers
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            updateGallery();
            scrollToThumbnail(currentIndex);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            updateGallery();
            scrollToThumbnail(currentIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            updateGallery();
            scrollToThumbnail(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            updateGallery();
            scrollToThumbnail(currentIndex);
        }
    });
    
    function updateGallery() {
        const activeThumbnail = thumbnails[currentIndex];
        const newSrc = activeThumbnail.getAttribute('data-src');
        
        // Fade out current image
        mainImage.style.opacity = '0';
        
        // Wait for fade out, then change image and fade in
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.alt = activeThumbnail.alt;
            
            // Fade in new image
            mainImage.style.opacity = '1';
        }, 250);
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        activeThumbnail.classList.add('active');
    }
    
    function scrollToThumbnail(index) {
        const thumbnailContainer = document.querySelector('.gallery-thumbnails');
        const targetThumbnail = thumbnails[index];
        
        if (thumbnailContainer && targetThumbnail) {
            const containerWidth = thumbnailContainer.offsetWidth;
            const thumbnailWidth = targetThumbnail.offsetWidth;
            const gap = 16; // 1rem gap between thumbnails
            
            // Calculate scroll position to center the thumbnail
            const scrollLeft = targetThumbnail.offsetLeft - (containerWidth / 2) + (thumbnailWidth / 2);
            
            thumbnailContainer.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }
}

function setupArchivesPassword() {
    const modal = document.getElementById('password-modal');
    const closeButton = document.getElementById('close-modal');
    const submitButton = document.getElementById('submit-password');
    const passwordInput = document.getElementById('password-input');
    
    if (!modal || !closeButton || !submitButton || !passwordInput) return;
    
    // Store the previous page URL
    const previousPage = document.referrer || 'index.html';
    
    // Close button handler - return to previous page
    closeButton.addEventListener('click', () => {
        window.location.href = previousPage;
    });
    
    // Submit button handler
    submitButton.addEventListener('click', () => {
        const password = passwordInput.value;
        const errorMessage = document.getElementById('error-message');
        
        // Check if password is correct (you can change this logic)
        if (password === 'rabbit') {
            modal.style.display = 'none';
            // Reveal protected archives content and show page 1
            const protectedWrapper = document.getElementById('archives-protected');
            if (protectedWrapper) protectedWrapper.style.display = 'block';
            const archivesPage = document.querySelector('#page-1');
            if (archivesPage) archivesPage.style.display = 'block';
        } else {
            // Show error state
            passwordInput.classList.add('error');
            errorMessage.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    // Enter key handler
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitButton.click();
        }
    });
    
    // Clear error state when user starts typing
    passwordInput.addEventListener('input', () => {
        passwordInput.classList.remove('error');
        errorMessage.style.display = 'none';
    });
    
    // Focus on password input when modal opens
    passwordInput.focus();
}

function setupArchivesNavigation() {
    // Get all navigation elements (there are now two sets - one on each page)
    const prevButtons = document.querySelectorAll('#archives-prev');
    const nextButtons = document.querySelectorAll('#archives-next');
    const currentPageSpans = document.querySelectorAll('#current-page');
    const totalPagesSpans = document.querySelectorAll('#total-pages');
    
    if (prevButtons.length === 0 || nextButtons.length === 0 || currentPageSpans.length === 0 || totalPagesSpans.length === 0) return;
    
    let currentPage = 1;
    const totalPages = 5; // Now 5 pages
    
    // Update page counter
    function updatePageCounter() {
        currentPageSpans.forEach(span => {
            span.textContent = currentPage;
        });
        totalPagesSpans.forEach(span => {
            span.textContent = totalPages;
        });
    }
    
    // Navigation handlers
    prevButtons.forEach(prevButton => {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePageCounter();
                showPage(currentPage);
            }
        });
    });
    
    nextButtons.forEach(nextButton => {
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePageCounter();
                showPage(currentPage);
            }
        });
    });
    
    // Initialize page counter
    updatePageCounter();
    
    // Disable/enable buttons based on current page
    function updateButtonStates() {
        prevButtons.forEach(prevButton => {
            prevButton.disabled = currentPage === 1;
            
            // Visual feedback for disabled state
            if (prevButton.disabled) {
                prevButton.style.opacity = '0.5';
                prevButton.style.cursor = 'not-allowed';
            } else {
                prevButton.style.opacity = '1';
                prevButton.style.cursor = 'pointer';
            }
        });
        
        nextButtons.forEach(nextButton => {
            nextButton.disabled = currentPage === totalPages;
            
            // Visual feedback for disabled state
            if (nextButton.disabled) {
                nextButton.style.opacity = '0.5';
                nextButton.style.cursor = 'not-allowed';
            } else {
                nextButton.style.opacity = '1';
                nextButton.style.cursor = 'pointer';
            }
        });
    }
    
    // Update button states initially
    updateButtonStates();
    
    // Update button states when page changes
    prevButtons.forEach(prevButton => {
        prevButton.addEventListener('click', updateButtonStates);
    });
    nextButtons.forEach(nextButton => {
        nextButton.addEventListener('click', updateButtonStates);
    });
    
    // Function to show specific page
    function showPage(pageNumber) {
        // Hide all pages
        const allPages = document.querySelectorAll('.archives-page');
        allPages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Show the selected page
        const selectedPage = document.getElementById(`page-${pageNumber}`);
        if (selectedPage) {
            selectedPage.style.display = 'block';
        }
    }
    
    // Initialize by showing page 1
    showPage(1);

    // Secret link to reveal hidden page 6 without changing page counter
    const secretLink = document.getElementById('secret-archives-link');
    if (secretLink) {
        secretLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Hide all pages
            document.querySelectorAll('.archives-page').forEach(page => {
                page.style.display = 'none';
            });
            // Show secret page 6
            const secretPage = document.getElementById('page-6');
            if (secretPage) {
                secretPage.style.display = 'block';
            }
        });
    }
}

function setupFaceImageClick() {
    // Get all face images on the current page
    const faceImages = document.querySelectorAll('.face-image');
    if (faceImages.length === 0) return;
    
    faceImages.forEach(faceImage => {
        faceImage.addEventListener('click', function() {
            const pageType = this.getAttribute('data-page');
            
            // Check if we're on Discovery, Gallery, or About pages
            if (pageType === 'discovery' || pageType === 'gallery' || pageType === 'about') {
                // Track which pages have been clicked
                let clickedPages = JSON.parse(sessionStorage.getItem('clickedPages') || '[]');
                if (!clickedPages.includes(pageType)) {
                    clickedPages.push(pageType);
                    sessionStorage.setItem('clickedPages', JSON.stringify(clickedPages));
                }
                
                // Check if all three pages have been clicked
                if (clickedPages.length >= 3) {
                    // Hide all faces immediately when puzzle is complete
                    const allFaces = document.querySelectorAll('.face-image');
                    allFaces.forEach(face => {
                        face.style.display = 'none';
                    });
                    
                    // Change bottom title text immediately when puzzle is complete
                    const bottomTitle = document.querySelector('.bottom-title');
                    if (bottomTitle) {
                        bottomTitle.textContent = 'A place to free your soul!';
                    }
                    
                    // Only play help.wav audio when puzzle is complete
                    const helpAudio = new Audio('resources/help.wav');
                    helpAudio.volume = 0.5;
                    helpAudio.play().then(() => {
                        // Wait for audio to finish, then redirect to homepage
                        helpAudio.addEventListener('ended', () => {
                            window.location.href = 'index.html';
                        });
                    }).catch(e => {
                        console.log('Audio play failed:', e);
                        // If audio fails, still redirect to homepage
                        window.location.href = 'index.html';
                    });
                    
                    sessionStorage.setItem('rabbitPuzzleSolved', 'true');
                    sessionStorage.setItem('allFacesClicked', 'true');
                }
            }
        });
    });
}

// Function to change homepage logo to rabbit when puzzle is complete
function changeLogoToRabbit() {
    // Check if puzzle was solved
    if (sessionStorage.getItem('rabbitPuzzleSolved') === 'true') {
        const logoImage = document.querySelector('.logo-image');
        if (logoImage) {
            logoImage.src = 'resources/rabbit.png';
            logoImage.alt = 'Rabbit Logo';
        }
    }
}

// Check if we should change logo to rabbit when homepage loads
// This will work for both automatic redirects and manual navigation
if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Check immediately when homepage loads
        changeLogoToRabbit();
        
        // Also check on page visibility change (for manual navigation)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && sessionStorage.getItem('rabbitPuzzleSolved') === 'true') {
                changeLogoToRabbit();
            }
        });
    });
}

// Function to update bottom title text based on puzzle completion
function updateBottomTitle() {
    const bottomTitle = document.querySelector('.bottom-title');
    if (bottomTitle && sessionStorage.getItem('allFacesClicked') === 'true') {
        bottomTitle.textContent = 'A place to free your soul!';
    }
}

// Function to hide faces after puzzle is complete
function hideFacesAfterPuzzle() {
    const faceImages = document.querySelectorAll('.face-image');
    if (sessionStorage.getItem('allFacesClicked') === 'true') {
        faceImages.forEach(face => {
            face.style.display = 'none';
        });
    }
}

// Update bottom title on all pages that have it
document.addEventListener('DOMContentLoaded', updateBottomTitle);

// Hide faces after puzzle is complete on all pages
document.addEventListener('DOMContentLoaded', hideFacesAfterPuzzle);

// Setup face image click functionality on all pages
document.addEventListener('DOMContentLoaded', setupFaceImageClick);

// Warning page functionality
function setupWarningPage() {
    const closeButton = document.getElementById('close-warning');
    const acceptButton = document.getElementById('accept-warning');
    const declineButton = document.getElementById('decline-warning');
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            window.location.href = 'booking.html';
        });
    }
    
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Here you could add logic for processing the purchase
            alert('Thank you for accepting the terms. Your Showtime Ticket purchase will be processed.');
            window.location.href = 'https://www.roblox.com/games/13762435721/Asphodel-Park';
        });
    }
    
    if (declineButton) {
        declineButton.addEventListener('click', () => {
            // Check if user has already declined once
            const hasDeclinedOnce = sessionStorage.getItem('hasDeclinedWarning');
            
            if (hasDeclinedOnce === 'true') {
                // Second decline - just close warning and return to booking
                window.location.href = 'booking.html';
            } else {
                // First decline - show scary experience
                sessionStorage.setItem('hasDeclinedWarning', 'true');
                
                // Hide the warning modal
                const warningModal = document.querySelector('.warning-modal');
                if (warningModal) {
                    warningModal.style.display = 'none';
                }
                
                // Create and show him.png image
                const himImage = document.createElement('img');
                himImage.src = 'resources/him.png';
                himImage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1000;
                    max-width: 80%;
                    max-height: 80%;
                    object-fit: contain;
                    pointer-events: none;
                `;
                document.body.appendChild(himImage);
                
                // Create invisible overlay to prevent dragging and right-clicking
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1001;
                    background: transparent;
                `;
                
                // Prevent context menu (right-click)
                overlay.addEventListener('contextmenu', (e) => e.preventDefault());
                
                // Prevent dragging
                overlay.addEventListener('dragstart', (e) => e.preventDefault());
                
                document.body.appendChild(overlay);
                
                // Play him.wav at 30% volume
                const himAudio = new Audio('resources/him.wav');
                himAudio.volume = 0.3;
                
                himAudio.play().then(() => {
                    // When audio finishes, remove the image and redirect to homepage
                    himAudio.addEventListener('ended', () => {
                        himImage.remove();
                        overlay.remove();
                        window.location.href = 'index.html';
                    });
                }).catch(e => {
                    console.log('Audio play failed:', e);
                    // If audio fails, still remove image and redirect to homepage
                    himImage.remove();
                    overlay.remove();
                    window.location.href = 'index.html';
                });
            }
        });
    }
}

// Ticket purchase functionality for all tickets
function setupTicketPurchases() {
    const purchaseButtons = document.querySelectorAll('.purchase-button');
    
    purchaseButtons.forEach(button => {
        // Remove any existing event listeners to prevent duplicates
        button.removeEventListener('click', handleTicketPurchase);
        button.addEventListener('click', handleTicketPurchase);
    });
}

// Separate function to handle ticket purchase clicks
function handleTicketPurchase() {
    // Check if this is the Showtime Ticket (which goes to warning page)
    const isShowtimeTicket = this.closest('.showtime-ticket');
    
    if (isShowtimeTicket) {
        // Showtime Ticket goes to warning page (no alert)
        window.location.href = 'warning.html';
    } else {
        // All other tickets show processing message and redirect to Roblox
        alert('Your ticket purchase will be processed.');
        // Small delay to ensure message is seen before redirect
        setTimeout(() => {
            window.location.href = 'https://www.roblox.com/games/13762435721/Asphodel-Park';
        }, 100);
    }
}

// Initialize ticket purchases if on booking page
if (window.location.pathname.includes('booking.html')) {
    document.addEventListener('DOMContentLoaded', setupTicketPurchases);
}

// Initialize warning page if on warning page
if (window.location.pathname.includes('warning.html')) {
    document.addEventListener('DOMContentLoaded', setupWarningPage);
}
