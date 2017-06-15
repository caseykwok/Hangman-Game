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

var allSolutions = ["aladdin", "thelionking", "frozen", "mulan", "beautyandthebeast", "cinderella", "thelittlemermaid", "tangled", "up", "findingdory", "findingnemo", "despicableme", "moana", "liloandstitch", "zootopia", "toystory", "monstersinc"];
var audioImageFact = {
	up: ["<iframe width='100%' height='300' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/117267971&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>", "url('assets/images/picture_1.jpg')", "There are 10,286 balloons attached to the house in Up."], 
	findingDory: ["<iframe width='100%' height='300' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/154004102&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>", "url('assets/images/picture_2.jpg')", "A character from Inside Out also makes an appearance in Finding Dory."], 
	theLionKing: ["<iframe width='100%' height='300' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/20830844&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>", "url('assets/images/picture_3.jpg')", "Pumbaa was the first character to fart in a Disney movie."], 
	despicableMe: ["<iframe width='100%' height='300' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/99800401&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>", "url('assets/images/picture_4.jpg')", "The average Minion stands at 105cm in height."], 
	moana: ["<iframe width='100%' height='300' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/314001417&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>", "url('assets/images/picture_5.jpg')", "Flounder from The Little Mermaid and Olaf from Frozen both appear in the film Moana."]
}
var wins = 0;

function reset() {
	lives = 12; 
	allUserGuesses = [];
	solution = allSolutions[Math.floor(Math.random() * allSolutions.length)];
	console.log(solution)
	solutionCharacters = solution.split("");
	currentWord = Array(solution.length).fill("_");
	theme = Object.values(audioImageFact)[Math.floor(Math.random() * Object.keys(audioImageFact).length)]
	document.getElementById("current_word").innerHTML = currentWord.join(" ");
	document.getElementById("remaining_guesses").innerHTML = lives;
	document.getElementById("guesses").innerHTML = allUserGuesses.join(", ");
	document.getElementById("audio").innerHTML = theme[0];
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
