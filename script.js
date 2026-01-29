// Your phone number - UPDATE THIS WITH YOUR ACTUAL PHONE NUMBER
const YOUR_PHONE_NUMBER = '2703086921'; // Replace with your phone number (format: 1234567890 for US)

// Get modal elements
const modal = document.getElementById('requestModal');
const closeBtn = document.querySelector('.close');
const cocktailNameSpan = document.getElementById('cocktailName');
const sendTextBtn = document.getElementById('sendTextBtn');

let selectedCocktail = '';
let selectedCard = null;

// Add click event to all cocktail cards
document.querySelectorAll('.cocktail-card').forEach(card => {
    card.addEventListener('click', function() {
        selectedCocktail = this.getAttribute('data-cocktail');
        selectedCard = this;
        cocktailNameSpan.textContent = selectedCocktail;
        modal.style.display = 'block';
        
        // Prevent body scroll on mobile when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        modal.querySelector('.modal-content').classList.add('modal-enter');
    });
});

// Close modal when X is clicked
closeBtn.addEventListener('click', function() {
    closeModal();
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Send text message
sendTextBtn.addEventListener('click', function() {
    // Extract ingredients
    const ingredientsList = selectedCard.querySelectorAll('.cocktail-content ul li');
    let ingredients = '';
    ingredientsList.forEach(item => {
        ingredients += `- ${item.textContent}\n`;
    });
    
    // Extract instructions
    const instructionsList = selectedCard.querySelectorAll('.cocktail-content ol li');
    let instructions = '';
    instructionsList.forEach((item, index) => {
        instructions += `${index + 1}. ${item.textContent}\n`;
    });
    
    // Get website URL (or use a placeholder if local)
    const websiteURL = window.location.href;
    
    // Format message in 3 sections
    const message = `Hey! Can you make me a ${selectedCocktail}? 🍸

INGREDIENTS:
${ingredients}
INSTRUCTIONS:
${instructions}
View the full collection: ${websiteURL}`;
    
    const smsLink = `sms:${YOUR_PHONE_NUMBER}${getSeparator()}body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
    closeModal();
});

// Function to close modal with animation
function closeModal() {
    modal.querySelector('.modal-content').classList.remove('modal-enter');
    
    // Re-enable body scroll
    document.body.style.overflow = '';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Get the correct separator for SMS URL (different for iOS and Android)
function getSeparator() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return iOS ? '&' : '?';
}

// Add keyboard support (ESC to close)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});
