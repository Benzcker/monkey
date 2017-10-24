const input = document.getElementById('input');
const outputDOM = document.getElementById('output');
const curWordOutput = document.getElementById('curWord');
const count = document.getElementById('count');
const lettPerSecDOM = document.getElementById('lettersPerSec');

let word;

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

let lettPerSec;

let msSpeed;

input.focus();
input.select();

input.addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    if (e.keyCode == 13) {
    	sendInput(); 
    }
}, false);

lettPerSecDOM.addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    if (e.keyCode == 13) {
    	sendInput(); 
    }
}, false);

function sendInput(){

	// do{
	// 	lettPerSec = prompt("How many letters do you want the monkey to type each second? (max. 1000)");
	// } while (lettPerSec == null || isNaN(lettPerSec) || lettPerSec < 1 || lettPerSec > 1000);

	lettPerSec = parseInt(lettPerSecDOM.value);
	if (lettPerSec == null || isNaN(lettPerSec) || lettPerSec < 1 || lettPerSec > 1000){
		return;
	}

	msSpeed = Math.round(1000/lettPerSec);

	word = input.value.toLowerCase();
	input.value = null;
	outputDOM.innerHTML = null;
	lettPerSecDOM.value = null;
	curWordOutput.innerHTML = word;

	generate();
}

function generate(){
	var nextLetter = randomLetter();

	outputDOM.innerHTML += nextLetter; 
	outputDOM.scrollTop = outputDOM.scrollHeight;

	count.innerHTML = outputDOM.innerHTML.length;

	if ( checkWord() ) {
		outputDOM.innerHTML = outputDOM.innerHTML.slice(0,outputDOM.innerHTML.length - word.length) + "<b>" + outputDOM.innerHTML.slice(outputDOM.innerHTML.length - word.length, outputDOM.innerHTML.length) + "</b>";
		setTimeout(	function(){ 
			alert("Found " + word + "! It took " + outputDOM.innerHTML.length + " letters! Theoretically it should have taken " + Math.pow(26,word.length) + ". That makes a difference of " + Math.abs(Math.pow(26,word.length) - outputDOM.innerHTML.length) + "."); //+ " or " + outputDOM.innerHTML.length / Math.round(Math.abs(Math.pow(26,word.length)))*100 + "%."); 
		},50);
	} else {
		setTimeout(function(){
			generate();
		},msSpeed);
	}
}

function randomLetter(){
	return alphabet[Math.round(Math.random() * (alphabet.length-1))];
}

function checkWord(){
	var found = true;
	for (var i = 0; i < word.length; i++) {
		if(	outputDOM.innerHTML.charAt(outputDOM.innerHTML.length - (i + 1)) != word.charAt(word.length - (i + 1))){
			found = false;
			break;
		}
	}
	return found;
}