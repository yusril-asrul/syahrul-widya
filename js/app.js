
$(document).ready(function () {
    // Smooth scrolling on nav link clicks
    $('a.nav-link').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });

            // Update active state
            $('a.nav-link').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Reveal gallery items on scroll
    function reveal() {
        var reveals = document.querySelectorAll('.gallery-item, .animated-horizontal-item, .animated-vertical-item');

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                var duration = reveals[i].getAttribute('data-duration') || '2.5s';
                reveals[i].style.transition = `opacity ${duration} ease-out, transform ${duration} ease-out`;
                reveals[i].classList.add('visible');
            } else {
                reveals[i].classList.remove('visible');
            }
        }
    }

    ///ANIMATION ENTER
    const animation = () => {

        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ["#102C57", "#FFC7ED", "#FFF8DB"];

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };


    ///ANIMATION ENTER
    const animationOpen = () => {
        const colors = ["#102C57", "#FFC7ED", "#FFF8DB"];
        confetti({
            origin: { y: 1 },
            zIndex: 1057,
            colors: colors,
        });
    };


    //AUDIO
    var audio = document.getElementById('buttonSound');
    const musicIcon = document.getElementById('musicIcon');
    var isPlaying = false;
    document.getElementById('openButton').addEventListener('click', function () {

        audio.play();
        isPlaying = true;

        document.getElementById('welcomePage').classList.add('slide-up');
        animationOpen();
        setTimeout(function () {
            document.getElementById('welcomePage').style.display = 'none';
            document.getElementById('originalContent').style.display = 'block';
            setTimeout(function () {
                document.getElementById('originalContent').classList.add('fade-in');
                reveal(); // Trigger the reveal function after fade-in starts
                animation();
                window.addEventListener('scroll', reveal);
            }, 10);
        }, 500); // Match this timeout to the CSS transition duration
    });

    ///CLICK OPEN
    document.getElementById('playPauseButton').addEventListener('click', function () {

        if (isPlaying) {
            audio.pause();
            musicIcon.classList.remove('fa-circle-pause'); // Remove pause icon
            musicIcon.classList.add('fa-circle-play'); // Add play icon
        } else {
            audio.play();
            musicIcon.classList.remove('fa-circle-play'); // Remove play icon
            musicIcon.classList.add('fa-circle-pause'); // Add pause icon
        }
        isPlaying = !isPlaying; // Toggle state
    });




    // Set the countdown date (example: December 31, 2024)
    const countdownDate = new Date("June 25, 2025 08:00:00").getTime();
    const dayElement = document.getElementById("day");
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");
    const countdownFunction = setInterval(function () {
        // Get current time
        const now = new Date().getTime();
        // Calculate the distance to the countdown date
        const distance = countdownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the countdown element
        dayElement.innerHTML = days;
        hourElement.innerHTML = hours;
        minuteElement.innerHTML = minutes;
        secondElement.innerHTML = seconds;

        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);



    //COPIED
    document.querySelectorAll('.copyButton').forEach(button => {
        button.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-copy');
            const originalText = this.textContent;

            // Use the Clipboard API to copy the text
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log('Text copied to clipboard: ' + textToCopy);
                this.textContent = 'Tersalin!'; // Change button text

                // Revert button text back to original after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000); // 2000 milliseconds = 2 seconds
            }).catch(err => {
                console.error('Error copying text: ', err);
            });
        });
    });


    //GET NAME TO
    // Function to get the value of a URL parameter
    function getUrlParameter(name, defaultValue) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || defaultValue;
    }

    // Get the 'to' parameter value from the URL
    const toValue = getUrlParameter('to', 'Teman teman semua');

    // Display the value in the output div
    document.getElementById('to-visitor').innerText = toValue;

    const formNameValue = getUrlParameter('to', '');
    document.getElementById('form-name').value = formNameValue;

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
    });
    document.addEventListener('gestureend', function (e) {
        e.preventDefault();
    });


});

function animate(svg, timeout, classes) {
    setTimeout(function () {
        svg.classList.add(classes);
    }, timeout);
}

//OPEN MODAL IMG
function openModalImg(image) {
    // Get the source of the clicked image
    const src = image.src;

    // Set the source of the modal image
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;

    // Show the modal
    $('#imageModal').modal('show');
}

async function fetchData() {
    try {
        const response = await fetch('https://makaversenews.makassar.go.id/complaint/get');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function renderCards(data) {
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = ''; // Clear any existing content


    [1, 2, 1, 1, 11, 1, 1, 1, 1, 11, 1, 1, 11,].forEach(item => {
        const cardHTML = `
            <div class="card-comment border rounded-4 shadow p-3 text-dark">
                <p class="card-text mb-0" style="font-size: 1rem;">Aldi Arif Setiawan</p>
                <p class="card-text" style="font-size: 0.8rem; color: gray;">${item.name}</p>
                <p class="card-text" style="font-size: 0.6rem; color: gray;">10/07/2024</p>
            </div>
        `;
        cardList.innerHTML += cardHTML; // Append the HTML to the card list
    });
}


const firebaseConfig = {
    apiKey: "AIzaSyDt3-CDiZAIgF1QNdId7Bc8-PqRVs14x4s",
    authDomain: "invitation-7358d.firebaseapp.com",
    databaseURL: "https://invitation-7358d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "invitation-7358d",
    storageBucket: "invitation-7358d.appspot.com",
    messagingSenderId: "92644259782",
    appId: "1:92644259782:web:b5d5a111b2afbef0f064c7",
    measurementId: "G-W768S68HJ0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.database();

// Reference to your collection or node
const dbRef = db.ref("list-comment-akram");

// Listen for real-time updates
dbRef.on("value", (snapshot) => {
    const data = snapshot.val();

    const cardList = document.getElementById('card-list');
    cardList.innerHTML = ''; // Clear any existing content

    // Store data in an array
    const items = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            items.push({ name: data[key].name, comment: data[key].comment, date: data[key].date, });
        }
    }

    // Reverse the array
    items.reverse();

    items.forEach(item => {
        console.log(item);
        const cardHTML = `
            <div class="card-comment border rounded-4 shadow p-3 text-dark">
                <p class="card-text mb-0" style="font-size: 1rem;">${item.name}</p>
                <p class="card-text" style="font-size: 0.8rem; color: gray;">${item.comment}</p>
                <p class="card-text" style="font-size: 0.6rem; color: gray;">${item.date}</p>
            </div>
        `;
        cardList.innerHTML += cardHTML; // Append the HTML to the card list
    });

}, (error) => {
    console.error("Error fetching real-time data: ", error);
});

// Format date and time
function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

async function postComment() {
    event.preventDefault(); // Prevent page refresh
    const name = document.getElementById('form-name').value;
    const comment = document.getElementById('form-comment').value;
    const timestamp = formatDateTime(new Date());
    const errorMessage = document.getElementById('error-message');

    if (name === "") {
        errorMessage.textContent = "Nama tidak boleh kosong!";
        errorMessage.style.display = "block";
    } else if (comment === "") {
        errorMessage.textContent = "Ucapan tidak boleh kosong!";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none"; // Hide error message
        const timestamp = formatDateTime(new Date());

        // Post data to Firebase
        dbRef.push({ name: name, comment: comment, date: timestamp })
            .then(() => {
                console.log("Data posted successfully!");
                document.getElementById('form-comment').value = ''; // Clear input
            })
            .catch((error) => {
                console.error("Error posting data: ", error);
            });
    }

}

