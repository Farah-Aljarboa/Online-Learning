// Function to toggle category and display topics when clicked
function toggleTopics(id) {
    var topics = document.getElementById(id);
    if (topics.style.display === "block") {
        topics.style.display = "none";
    } else {
        topics.style.display = "block";
    }
}

// Function to toggle course menu sidebar height when lock icon is clicked
function toggleLock() {
    var sidebar = document.getElementById('sidebar');
    var lockIcon = document.getElementById('lockIcon');

    if (sidebar.classList.contains('locked')) {
        sidebar.classList.remove('locked');
        lockIcon.textContent = '🔓';
        sidebar.style.overflowY = 'hidden';
        sidebar.style.maxHeight = 'fit-content'; 
    } else {
        sidebar.classList.add('locked');
        lockIcon.textContent = '🔒';
        sidebar.style.overflowY = 'auto';
        sidebar.style.maxHeight = '250px'; 
    }
}

// Function to show the topic containing video
function showVideo(videoSrc) {
    const videoElement = document.getElementById('courseVideo');
    const quizContainer = document.getElementById('quizContainer');
    const mapContainer = document.getElementById('mapContainer');

    videoElement.style.display = 'block';
    quizContainer.style.display = 'none';
    mapContainer.style.display = 'none';

    videoElement.src = videoSrc;
    videoElement.play();

    const continueBtn = document.querySelector('.continue-btn');
    if (videoSrc === 'Videos/vid14.mp4') {
        continueBtn.style.display = 'none';
    } else {
        continueBtn.style.display = 'block';
    }
}

// Function to show the the topic containing map 
function showMap(mapSrc) {
    const videoElement = document.getElementById('courseVideo');
    const quizContainer = document.getElementById('quizContainer');
    const mapContainer = document.getElementById('mapContainer');

    videoElement.style.display = 'none';
    quizContainer.style.display = 'none';
    mapContainer.style.display = 'block';

    document.getElementById('mapImg').src = mapSrc; 
    videoElement.pause();
}

// Function to show the desired pins on the map 
function showLocation(locationType) {
    const allPins = document.querySelectorAll('.pin');
    allPins.forEach(pin => pin.style.display = 'none');

    if (locationType === 'kids' || locationType === 'all') {
        document.querySelectorAll('.kids-loc1, .kids-loc2').forEach(pin => pin.style.display = 'flex');
    }
    if (locationType === 'expert' || locationType === 'all') {
        document.querySelectorAll('.expert-loc1, .expert-loc2, .expert-loc3').forEach(pin => pin.style.display = 'flex');
    }
} 

// Function to show the the topic containing quiz
function showQuiz(quizId) {
    const video = document.getElementById('courseVideo');
    const quizContainer = document.getElementById('quizContainer');
    const mapContainer = document.getElementById('mapContainer');

    video.style.display = 'none';
    mapContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    video.pause();

    const quizzes = {
        quiz1: {
            title: "Quiz 1",
            question: "What does HTML stand for?",
            options: {
                A: "Hyper Text Markup Language",
                B: "Home Tool Markup Language",
                C: "Hyperlinks and Text Markup Language",
                D: "Hyperlinking Text Marking Language"
            },
            correct: "A"
        },
        quiz2: {
            title: "Quiz 2",
            question: "The correct sequence of HTML tags for starting a webpage is:",
            options: {
                A: "Head, Title, HTML, body",
                B: "HTML, Body, Title, Head",
                C: "HTML, Head, Title, Body",
                D: "HTML, Head, Title, Body"
            },
            correct: "D"
        },
        quiz3: {
            title: "Quiz 3",
            question: "What does CSS stand for?",
            options: {
                A: "Color and style sheets",
                B: "Cascading style sheets",
                C: "Creative style sheets",
                D: "None of the above"
            },
            correct: "B"
        },
        quiz4: {
            title: "Quiz 4",
            question: "The property in CSS used to change the background color of an element is:",
            options: {
                A: "bgcolor",
                B: "color",
                C: "background-color",
                D: "None of the above"
            },
            correct: "C"
        },
        quiz5: {
            title: "Quiz 5",
            question: "Which one of the following is the correct way for calling the JavaScript code?",
            options: {
                A: "Preprocessor",
                B: "Triggering Event",
                C: "RMI",
                D: "Function/Method"
            },
            correct: "D"
        },
    };

    const quiz = quizzes[quizId];
    document.getElementById('quizTitle').innerText = quiz.title;

    const quizQuestion = document.querySelector('.quiz-question p');
    quizQuestion.innerText = quiz.question;

    const options = document.querySelectorAll('.quiz-question label');
    let i = 0;
    for (const option in quiz.options) {
        options[i].innerHTML = `<input type="radio" name="option" value="${option}"> ${quiz.options[option]}`;
        i++;
    }

    document.getElementById('quizForm').dataset.correctAnswer = quiz.correct;
}

// Function to submit the quiz
function submitQuiz() {
    const quizForm = document.getElementById('quizForm');
    const selectedOption = quizForm.querySelector('input[name="option"]:checked');
    const correctAnswer = quizForm.dataset.correctAnswer;


    if (selectedOption && selectedOption.value === correctAnswer) {
        showAlert("✅ Correct Answer! ");
    } else if(selectedOption && selectedOption.value !== correctAnswer ){
        showAlert("❌ Incorrect, please try again.");
    }
    else{
        showAlert("⚠️ Please choose an option !");
    }
}

// Function to show alert about the quiz's answer
function showAlert(message) {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    const customAlert = document.getElementById('customAlert');
    customAlert.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}
function closeAlert() {
    const customAlert = document.getElementById('customAlert');
    customAlert.classList.remove('active');
    document.body.style.overflow = 'auto'; 
}

// Function to move to the next topic
function continueToNext() {
    const topics = document.querySelectorAll('.topics a');
    let currentIndex = -1;

    for (let i = 0; i < topics.length; i++) {
        if (topics[i].classList.contains('clicked-topic')) {
            currentIndex = i;
            break;
        }
    }

    if (currentIndex !== -1 && currentIndex < topics.length - 1) {
        topics[currentIndex].classList.remove('clicked-topic');
        topics[currentIndex + 1].classList.add('clicked-topic');
        const nextTopic = topics[currentIndex + 1];
        if(nextTopic && nextTopic.innerText.includes('Quiz'))
            {
            showQuiz(nextTopic.getAttribute('onclick').match(/quiz\d+/i))
            }
        else if(nextTopic && nextTopic.innerText.includes('Locations'))
        {
            showMap(nextTopic.getAttribute('onclick').match(/'(.*?)'/)[1]);
        }
        else
        {
            showVideo(nextTopic.getAttribute('onclick').match(/'(.*?)'/)[1]);
        }

    }
}

// Event listeners for topic clicks to highlight and show content
document.querySelectorAll('.topics a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.topics a').forEach(link => link.classList.remove('clicked-topic'));
        this.classList.add('clicked-topic');
    });
});




