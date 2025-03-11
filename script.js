
// Carousel functionality
let currentSlide = 0;
const carouselContainer = document.querySelector('.carousel-container');

function updateCarousel() {
    const slide = pastEvents[currentSlide];
    carouselContainer.innerHTML = `
        <div class="carousel-slide">
            <img src="${slide.image}" alt="${slide.title}">
            <div class="slide-content">
                <h3>${slide.title}</h3>
                <p>${slide.date}</p>
            </div>
        </div>
    `;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % pastEvents.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + pastEvents.length) % pastEvents.length;
    updateCarousel();
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Modal functionality
const modal = document.getElementById('consultationModal');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('email');
    const inputPhone = document.getElementById('phone');
    const inputEventType = document.getElementById('eventType');
    const inputDate = document.getElementById('eventDate');
    const inputTextArea = document.getElementById('message');
    
    
    // Listen for form submit
    document.getElementById('consultationForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const postData = {
            name: inputName.value,
            email: inputEmail.value,
            phonenumber: inputPhone.value,
            eventtype: inputEventType.value,
            date: inputDate.value,
            message: inputTextArea.value,
        };
        

        async function submitEvent() {
            try {
                const response = await fetch("http://localhost:4000/events", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) {
                    throw new Error('HTTP error! status: ' + response.status);
                }

                const newData = await response.json();
                console.log('Success:', newData);

                // Show success message to the user
                alert("Consultation request submitted successfully!");
                
                // Reset form and close modal
                document.getElementById('consultationForm').reset();
                closeModal();
            } catch (error) {
                console.error('Error:', error);
                alert("There was an error submitting your consultation request. Please try again.");
            }
        }

        submitEvent();
    });

    // Initialize carousel
    updateCarousel();
});
