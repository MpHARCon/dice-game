// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэнэ
var activePlayer = 0;

// Тоглогчдийн цуглуулсан оноог хадгалах хувьсагч
var scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore = 0;

// Шоны аль талаараа буусныг хадгалах хувьсагч, 1-6 гэсэн энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
// Прогамм эхлэх бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1 - 6 ын хооронд санамсаргүй нэг тоо гаргаж авна
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Шооны зургыг вэб дээр гаргаж ирнэ
  diceDom.style.display = "block";

  // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ
  diceDom.src = "dice-" + diceNumber + ".png";

  // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
  if (diceNumber !== 1) {
    // 1 - ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    switchToNextPlayer();
  }
});

// Hold товч эвент листенэр
document.querySelector(".btn-hold").addEventListener("click", function () {
  // Уг тоглогчийн цуглуулсан ээлжийн оноог глобаль оноон дээр нэмж өгнө.

  scores[activePlayer] = scores[activePlayer] + roundScore;

  // Дэлгэц дээр оноог нь өөрчилнө
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // Уг тоглогчийг хожсон эсэхийг (оноо нь 100 - аас их эсэх) шалгах
  if (scores[activePlayer] >= 10) {
    // Ялагч гэсэн текстийг нэрийнх нь оронд гаргана.
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Тоглогчийн ээлжийг солино.
    switchToNextPlayer();
  }
});

/// Энэ функц нь тоглогчийг дараагийн ээлж лүү шилжүүлнэ
function switchToNextPlayer() {
  // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
  // Энэ тоглогчийн цуглуулсан оноог 0 болгоно
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // Хэрэв идэвхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийг 1 болго
  // Үгүй бол идэвхтэй тоглогчийг 0 болго
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгох
  diceDom.style.display = "none";
}
