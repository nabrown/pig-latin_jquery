function pigChunk(chunk){
	var word, startPunc = '', endPunc = '';
	if(checkForPunctuation(chunk)){
		if( !chunk.charAt(0).match(/[a-zA-Z]/) ){
			startPunc = chunk.charAt(0);
			word = chunk.slice(1);
		}
		if( !chunk.charAt(chunk.length - 1).match(/[a-zA-Z]/) ){
			endPunc = chunk.charAt(chunk.length - 1)
			word = chunk.slice(0, -1)
		}
		return startPunc + pigWord(word) + endPunc;

	}else{
		return pigWord(chunk)
	}
}

function pigWord(word){
	var firstLetter = word.charAt(0),
		secondLetter = word.charAt(1),
		remainder,
		newWord = word;

	//if the first letter is alpha char
	if( firstLetter.match(/[a-zA-Z]/) ){
		//if first letter isn't a vowel
		if("aeiou".indexOf(firstLetter) === -1){
			//if second letter isn't a vowel
			if("aeiou".indexOf(secondLetter) === -1){
				remainder =  word.substring(2, word.length)
				newWord = remainder + firstLetter + secondLetter + "ay";
			}else{
				remainder =  word.substring(1, word.length)
				newWord = remainder + firstLetter + "ay";				
			}
			
		}else{
			newWord = word + "way";
		}
	}
	return newWord;

}

function pigLatinPhrase(phrase){
	var chunks = phrase.split(" "),
		newPhrase;
	for(var i = 0; i < chunks.length; i++){
		chunks[i] = pigChunk(chunks[i]);
	}
	newPhrase = chunks.join(" ");
	return newPhrase;
}

function checkForPunctuation(chunk){
	if( chunk.charAt(0).match(/[a-zA-Z0-9]/) && chunk.charAt(chunk.length - 1).match(/[a-zA-Z0-9]/) ){
		return false;
	}
	return true;
}

function countChars(string){
	return string.length;
}

function reportNumChars(string){
	var numChars = countChars(string),
		phrase = numChars + " characters in the phrase.";
	return pigLatinPhrase(phrase);

}

(function( $ ) {
 
    $.fn.piggify = function() {
 		var el = $(this),
 			input = $('#input'),
 			display = $('#display');

 		input.on('keydown',function(event){
 			// if(isWhitespaceEvent(event)){		
 				var before = input.val(),
				after = pigLatinPhrase(before);
				display.text(after);
			// }
 		})

    	el.find('button').on('click', function(){
			var before = input.val(),
				after = pigLatinPhrase(before);
			display.text(after);
			return false;
		});
	}
}( jQuery ));
