const questions = [ // Soruların içerdiği const yapısı
    {
        question: "Which is the most popular football club in the world?",  
        answers: [
            { text: "Milan", correct: false },
            { text: "Barcelona", correct: false },
            { text: "Manchester City", correct: false },
            { text: "Real Madrid", correct: true},
        ]
    },
    {
        question: "Which city is crowder than other cities?",
        answers: [
            { text: "İstanbul", correct: false },
            { text: "New York", correct: true },
            { text: "Tokyo", correct: false },
            { text: "Berlin", correct: false},
        ]
    },
    {
        question: "Who is the richest human in the world?",
        answers: [
            { text: "Bernard Arnault", correct: true },
            { text: "Elon Musk", correct: false },
            { text: "Ali Koç", correct: false },
            { text: "Donald Trump", correct: false},
        ]
    },
    {
        question: "Who is the most scored in NBA?",
        answers: [
            { text: "Kareem Abdul-Jabbar", correct: false },
            { text: "Michael Jordan", correct: false },
            { text: "Kobe Bryant", correct: false },
            { text: "Lebron James", correct: true},
        ]
    },

]

const questionElement = document.getElementById("question"); //Html sayfasındaki soruyu alacağımız id
const answerButtons = document.getElementById("answer-buttons"); // Cevapların id'sini alacağımız yer
const nextButton = document.getElementById("next-btn"); // Geçiş butonunun id'sini aldığımız yer

let currentQuestionIndex = 0; // Index 0'dan başlayacak
let score = 0; // Başlangıç skoru

function startQuiz() {   // Quiz başlangıç fonksiyonunu oluşturuyoruz
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"; // innerHTML sayesinde bir elementin içindeki HTML'leri değiştirebilirim.
    showQuestion();

}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; // Mevcut sorunun indexini alıyor
    let questionNo = currentQuestionIndex + 1; // Indexe göre alacağı için index 0 olursa soru numarası 1 olur
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => { // Döngü aracılığıyla answer'i alıyor
        const button = document.createElement("button");
        button.innerHTML = answer.text; // HTML'e answer'ı ekliyor
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}  


function resetState() {
    nextButton.style.display = "none"; // Normal html sayfasındaki textlerin görünmemesini sağlıyoruz
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // ilk örneği siliyoruz
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target; // kullanıcının tıkladığına yönelir
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Eğer doğruysa ekle
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => { // children öğeleri diziye dönüştürdük
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // eğer data doğru ise ekledik
        }
        button.disabled = true; // buton görünmez oldu
    });
    nextButton.style.display = "block"; // bir sonraki düğmeyi ekliyoruz
}

function showScore() {  // Puan gösteren fonksiyon
    resetState(); // sürekli puanı sıfırlamış için 
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    if (0 <score < questions.length) { // koşullu sonuçları ekrana yazdıran if yapısı
        questionElement.innerHTML = `You answered ${score} questions correctly!You should work a little more..`;
    }else if(score == 0){
        questionElement.innerHTML = `Your score is ${score} :()`;
    }else {
        questionElement.innerHTML = `You are amazing!`;
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}



function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) { // eğer soru sayısından az ise index soruyu göster
        showQuestion();
    } else {
        showScore(); // Değil ise scoru göster
    }
}



nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();