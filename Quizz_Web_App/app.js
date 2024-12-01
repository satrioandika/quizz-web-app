var questions = [
    {
        question: ". Siapa penemu bola lampu?",
        option1: "Nikola Tesla",
        option2: "Albert Einstein",
        option3: "Thomas Alva Edison",
        option4: "Alexander Graham Bell",
        answer: "Thomas Alva Edison",
    },
    {
        question: ". Apa ibu kota dari negara Indonesia?",
        option1: "Jakarta",
        option2: "Surabaya",
        option3: "Bandung",
        option4: "Yogyakarta",
        answer: "Jakarta",
    },
    {
        question: ". Apa nama planet yang terkenal dengan cincin yang mengelilinginya?",
        option1: "Bumi",
        option2: "Jupiter",
        option3: "Mars",
        option4: "Saturnus",
        answer: "Saturnus",
    },
    {
        question: ". Siapa presiden pertama Republik Indonesia?",
        option1: "Soekarno",
        option2: "Soeharto",
        option3: "BJ Habibie",
        option4: "Megawati Soekarnoputri",
        answer: "Soekarno",
    },
    {
        question: ". Apa nama dari logam mulia yang sering digunakan sebagai perhiasan dan berwarna kuning?",
        option1: "Perak",
        option2: "Platina",
        option3: "Besi",
        option4: "Emas",
        answer: "Emas",
    },
    {
        question: ". Satuan untuk mengukur kuat arus listrik adalah?",
        option1: "Volt",
        option2: "Ampere",
        option3: "Ohm",
        option4: "Watt",
        answer: "Ampere",
    },
    {
        question: ". Apa simbol kimia untuk air?",
        option1: "CO2",
        option2: "O2",
        option3: "H2O",
        option4: "NaCl",
        answer: "H2O",
    },
    {
        question: ". Di manakah letak piramida terkenal Giza?",
        option1: "India",
        option2: "Tiongkok",
        option3: "Mesir",
        option4: "Peru",
        answer: "Mesir",
    },
    {
        question: ". Apa nama samudra terbesar di dunia?",
        option1: "Samudra Atlantik",
        option2: "Samudra Hindia",
        option3: "Samudra Pasifik",
        option4: "Samudra Arktik",
        answer: "Samudra Pasifik",
    },
    {
        question: ". Siapa penulis novel 'Harry Potter'?",
        option1: "J.K. Rowling",
        option2: "Stephen King",
        option3: "Agatha Christie",
        option4: "Mark Twain",
        answer: "J.K. Rowling",
    },
];

var startBtn = document.querySelector(".startBtn");
var login_form = document.querySelector(".login_form");
var emailPass = document.querySelector(".emailPass");
var hideBtn = document.querySelector(".hideBtn");
var userEmail = document.getElementById("uEmail");
var userPass = document.getElementById("uPass");
var infoBox = document.querySelector(".info_box");
var quizStart = document.querySelector(".quiz_container");
var resultbox = document.querySelector(".result_box");
var scoreText = document.querySelector(".score_text");
var inputs = document.querySelector(".inputs");
var links = document.querySelector(".links");
var progressbar = document.getElementById("progressBar");
var form = document.getElementById("form");
var countDown = document.getElementById("timer");
var index = 0; // Question Counting
var score = 0; // User Correct Question Score
var counter; // counter of timer
var timeValue = 15; // timer value

// Registration Form
var singUpName = document.getElementById("sName");
var singUpEmail = document.getElementById("sEmail");
var singUpPass = document.getElementById("sPass");

function submitForm(){
    event.preventDefault();
    var registerUser = {
        name: singUpName.value,
        email: singUpEmail.value,
        password: singUpPass.value,
    }

    console.log("registerUser",registerUser)

    localStorage.setItem("registerUser", JSON.stringify(registerUser));
    window.location.href = "./index.html"
}

// get data user to localStorage
var getUserData = localStorage.getItem("registerUser");
getUserData = JSON.parse(getUserData);

// login form
var getEmail = getUserData.email;
var getPass = getUserData.password;

function loginForm(){
    var user = localStorage.getItem("user");
    if(user){
        const Toast = Swal.mixin({
            toast:true,
            position:"top",
            showConfirmButton:true,
        })
        Toast.fire({
            title:"<h2>Selamat datang!</h2> Silahkan daftarkan akun anda"
        })
    }else{
        if (userEmail.value == getEmail && userPass.value == getPass) {
            infoBox.style.display = "block";
            login_form.style.display = "none";
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Berhasil Masuk",
            });
        }else{
            const Toast = Swal.mixin({
                toast:true,
                position:"top",
                showConfirmButton:false,
                timer:1000,
            })
            Toast.fire({
                icon:"warning",
                title:"<h2>Invalid email or password</h2>"
            })
        }
    }
}

// quit quiz
function quit(){
    location.reload();
}

// masuk quiz
function enterQuiz(){
    infoBox.style.display = "none"
    startBtn.style.display = "block"
}

// tampilkan pertanyaan
function renderQuestions() {
    var question = document.getElementById("qustionsContainer");
    var options = document.getElementsByName("options");
    var qustionNo = document.getElementById("qustionNo");
    clearInterval(counter);
    startTimer(timeValue);

    // Menambahkan logika untuk menghitung skor
    if (questions[index - 1]) {
        for (var i = 0; i < options.length; i++) {
            if (options[i].checked) {
                if (options[i].value === questions[index - 1].answer) {
                    score += 10; // Setiap jawaban benar akan menambah 10 poin
                }
            }
        }
    }

    var percetage = score;
    window.addEventListener("blur", () => {
        clearInterval(counter);
        resultbox.style.display = "flex";
        quizStart.style.display = "none";

        if (score === 0) {
            scoreText.innerHTML = `
            <span style="text-align: center; margin: 5px 0; font-size: 22px;">
            Anda dilarang untuk keluar dari aplikasi kuis, anda didiskualifikasi 🖐️ <span>
            `;
        } else {
            var progressbar = document.querySelector(".progressBar");
            if (progressbar) {
                progressbar.innerHTML = `
                <p>${percetage}%</p>
                `;
            }
            scoreText.innerHTML = `
            <span>Score: <p>${score}</p> out of <p>100</p><span>
            `;
        }
    });

    if (!questions[index]) {
        clearInterval(counter);
        resultbox.style.display = "flex";
        quizStart.style.display = "none";
    
        scoreText.innerHTML = `
        <span>Score: <p>${score}</p> out of <p>100</p><span>
        `;
    
        var circularProgress = document.querySelector(".circular-progress"),
        progressValue = document.querySelector(".progress-value");

    var progressStartValue = 0; // Memulai dari 0
    var progressEndValue = score; // Sesuaikan dengan nilai score
    var speed = 25;

    // Jika score adalah 0, langsung set persentase ke 0% dan hentikan progres
    if (progressEndValue === 0) {
        progressValue.textContent = `0%`;
        circularProgress.style.background = `conic-gradient(#ededed 0deg, #ededed 0deg)`;
    } else {
        var progress = setInterval(() => {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(var(--primaryColor) ${
                progressStartValue * 3.6
            }deg, #ededed 0deg)`;

            if (progressStartValue >= progressEndValue) { // Pastikan kondisi >= agar berhenti tepat di nilai score
                clearInterval(progress);
            }
        }, speed);
    }

        return;
    }

    var number = index + 1;
    var questionValue = questions[index];
    question.innerHTML = `
        <div id="qustions">
            <span>${number}</span>
            <p>${questionValue.question}</p>
        </div>
        <div class="options_list">
            <label for="options1" class="options"><input type="checkbox" id="options1" name="options" value="${questionValue.option1}">${questionValue.option1}<span class="checkmark"></span></label>
            <label for="options2" class="options"><input type="checkbox" id="options2" name="options" value="${questionValue.option2}">${questionValue.option2}<span class="checkmark"></span></label>
            <label for="options3" class="options"><input type="checkbox" id="options3" name="options" value="${questionValue.option3}">${questionValue.option3}<span class="checkmark"></span></label>
            <label for="options4" class="options"><input type="checkbox" id="options4" name="options" value="${questionValue.option4}">${questionValue.option4}<span class="checkmark"></span></label>
        </div>
    `;

    index++;
    qustionNo.innerHTML = index;
}

// timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        countDown.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            renderQuestions();
        }
    }
}

// start kuis
function startQuiz(){
    quizStart.style.display = "block";
    startBtn.style.display = "none";
    renderQuestions();

    // set page full screen when start quiz
    document.documentElement.requestFullscreen();
}