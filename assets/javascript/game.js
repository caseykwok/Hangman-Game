function greetings() {
	var userName = prompt("What's your name?");
	if (userName === "") {
		alert("Please enter your name.");
		greetings()
	} else {
		alert("Hello, " + userName + "! Let's see how many Disney movies you know. Good luck!");
	}
}

greetings()

var allSolutions = ["aladdin", "the lion king", "frozen", "mulan", "beauty and the beast", "cinderella", "the little mermaid", "tangled", "up", "finding dory", "finding nemo", "despicable me", "moana", "lilo and stitch", "zootopia", "toy story", "monsters inc"];
var audioImageFact = {
	up: ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/117267971&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false", "url('assets/images/picture_1.jpg')", "There are 10,286 balloons attached to the house in Up."], 
	findingDory: ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/154004102&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false", "url('assets/images/picture_2.jpg')", "A character from Inside Out also makes an appearance in Finding Dory."], 
	theLionKing: ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/20830844&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false", "url('assets/images/picture_3.jpg')", "Pumbaa was the first character to fart in a Disney movie."], 
	despicableMe: ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/99800401&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false", "url('assets/images/picture_4.jpg')", "The average Minion stands at 105cm in height."], 
	moana: ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/314001417&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false", "url('assets/images/picture_5.jpg')", "Flounder from The Little Mermaid and Olaf from Frozen both appear in the film Moana."]
}
// need audioImageFactValues because Object.values() does not work in Safari
var audioImageFactValues = Object.keys(audioImageFact).map(function(key) {
		return audioImageFact[key];
	})
var wins = 0;

function reset() {
	lives = 12; 
	allUserGuesses = [];
	solution = allSolutions[Math.floor(Math.random() * allSolutions.length)];
	console.log(solution)
	solutionCharacters = solution.split("");
	currentWord = Array(solution.length).fill("_");
	// theme = Object.values(audioImageFact)[Math.floor(Math.random() * Object.keys(audioImageFact).length)];
	theme = audioImageFactValues[Math.floor(Math.random() * Object.keys(audioImageFact).length)];
	document.getElementById("current_word").innerHTML = currentWord.join(" ");
	document.getElementById("remaining_guesses").innerHTML = lives;
	document.getElementById("guesses").innerHTML = allUserGuesses.join(", ");
	// document.getElementById("audio").innerHTML = theme[0];
	document.getElementById("myiFrame").setAttribute('src', theme[0]); 
	document.getElementById("background_image").style.backgroundImage = theme[1];
	document.getElementById("fun_fact").innerHTML = theme[2];
}

reset()

function updateScreen() {
	document.getElementById("wins").innerHTML = wins;
	document.getElementById("current_word").innerHTML = currentWord.join(" ");
	document.getElementById("remaining_guesses").innerHTML = lives;
	document.getElementById("guesses").innerHTML = allUserGuesses.join(", ");
}

document.onkeyup = function(event) {
	var userGuess = event.key;
	// console.log(userGuess)
	if (allUserGuesses.indexOf(userGuess) === -1) {
		if (solutionCharacters.indexOf(userGuess) != -1) {
			for (var i = 0; i < solutionCharacters.length; i++) {
				// console.log(i)
				if (userGuess === solutionCharacters[i]) {
					currentWord.fill(userGuess, i, i + 1);
					console.log(currentWord.join(" "));
					if (currentWord.join("") === solution) {
						wins++;
						setTimeout(function() { alert("Congratulations, you got it right! The answer is " + solution + ". Keep going!");
						reset(); }, 500);
					}
				}
			}
		} else {
			allUserGuesses.push(userGuess);
			lives--;
			if (lives === 0) {
				setTimeout(function() { alert("Aw, bummer! You ran out of guesses. It's okay, keep trying!");
				reset(); }, 500);
			}
		}
	}
	updateScreen();
}
