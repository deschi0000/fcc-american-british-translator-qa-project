const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js');
const britishToAmericanTitles = require('./british-to-american-titles.js');

class Translator {

    americanToBritish(text){
        console.log('American to British');
        
        // let textArr = text.split(/[, .]/);
        let textArr = text.split(' ');
        console.log(textArr);

        textArr = titleTranslator(textArr, americanToBritishTitles);
        
        // Check against every word
        for (let i = 0; i < textArr.length; i ++) {
            // TIME
            // Change the time format
            if (/\d{1,2}\:\d{1,2}/.test(textArr[i])){
                // console.log(textArr[i]);
                
                // Replace the symbol
                textArr[i] = textArr[i].replaceAll(':', '.');
                
                // Add the green span
                textArr[i] = addGreenSpan(textArr[i]);
                // console.log(textArr[i]);
            }
        }

        // rejoin the string and get a lowercase version to test against
        text = textArr.join(' ');
        let tempLowerText = text;
        tempLowerText = tempLowerText.toLowerCase();

        // American to British Spelling
        for (let key in americanToBritishSpelling) {
            if (tempLowerText.includes(key)){         
                text = makeTranslation(key, text, americanToBritishSpelling);
            }
        }
        // American Only Words
        for (let key in americanOnly) {
            if (tempLowerText.includes(key)){
                text = makeTranslation(key, text, americanOnly);        
            }
        }
        return text;
    }

    britishToAmerican(text){
        console.log('British to American');
        
        let textArr = text.split(' ');
        // console.log(textArr);
        
        textArr = titleTranslator(textArr, britishToAmericanTitles);

        // Check against every word
        for (let i = 0; i < textArr.length; i ++) {

            // TIME
            // Change the time format
            if (/\d{1,2}\.\d{1,2}/.test(textArr[i])){
                // console.log(textArr[i]);
                // Replace the symbol
                textArr[i] = textArr[i].replaceAll('.', ':');
                // Add the green span
                textArr[i] = '<span class="highlight">' + textArr[i] + '</span>';
                // console.log(textArr[i]);
            } 
        }
        
        // rejoin the string and get a lowercase version to test against
        text = textArr.join(' ');
        let tempLowerText = text;
        tempLowerText = tempLowerText.toLowerCase();

        // British Only words
        for (let key in britishOnly) {
            if (tempLowerText.includes(key)){ 
                if (!partOfAnotherWord(key, text))  
                    // console.log("keeeye:", key);
                    text = makeTranslation(key, text, britishOnly);
            }
        }

        // British to American words. 
        // Because we will check the values against the keys, this is the only on
        // That will iterate differently
        Object.keys(americanToBritishSpelling).find(key => {
            // Check if any value of the object is equal to the current word
            // console.log(americanToBritishSpelling[key]);
            if (tempLowerText.includes(americanToBritishSpelling[key])){
                // console.log("YES!", key);
                text = makeTranslation(key, text, americanToBritishSpelling);        
            
                // console.log(americanToBritishSpelling[key]);
                let upperCaseKey = americanToBritishSpelling[key].charAt(0).toUpperCase() + americanToBritishSpelling[key].slice(1);
                let lowerCaseKey = americanToBritishSpelling[key];
                let upperMatch = text.match(upperCaseKey);
                let lowerMatch = text.match(lowerCaseKey);

                if (upperMatch){
                    // console.log(upperMatch);
                    let translation = key;
                    let translatedWord = capitalise(translation);
                    // console.log("uppercase!:", upperMatch[0]);
                    // console.log("translation:", translatedWord);
                    translatedWord = addGreenSpan(translatedWord);
                    text = text.replaceAll(upperMatch[0], translatedWord);
                }
                
                if (lowerMatch){
                    // console.log(lowerMatch);
                    let translatedWord = key;
                    // console.log("lowercase!:", lowerMatch[0]);
                    // console.log("translation:", translatedWord);
                    translatedWord = addGreenSpan(translatedWord);
                    text = text.replaceAll(lowerMatch[0], translatedWord);
                }
            }
        });
        return text;
    }

    stripSpan(translation) {
        // We will strip the span and return just the pure translation
        // Very roundabout, but here we are
        let stripped;
        translation = translation.replaceAll('<span class="highlight">', '');
        stripped = translation.replaceAll('</span>', '');
        
        return stripped;
      }

}

function titleTranslator(arr, dict){
    for (let key in dict) {
        for (let i = 0; i < arr.length; i++){
            // console.log(key);
            let capped = key.charAt(0).toUpperCase() + key.slice(1);
            // console.log(capped);
            if (arr[i] == key){
                let translation = dict[key];
                arr[i] = addGreenSpan(translation);
            }
            if (arr[i] == capped) {
                // else just add the lowercase
                let translation = dict[key].charAt(0).toUpperCase() + dict[key].slice(1);
                arr[i] = addGreenSpan(translation);
                    
                console.log("word:", arr[i]);
            }   
            // console.log(textArr);
        }
    }
    return arr
}


function makeTranslation(key, text, translator) {
    
    let translation = translator[key];

    let wordcount = key.split(' ').length;
    // console.log(wordcount);
        
    // Make a capitalised key version to check against the original text
    let capKey = key.charAt(0).toUpperCase() + key.slice(1);
    // console.log('capkey:',capKey);

    // If it is capitalised, do this
    if (isCapitalised(capKey, text)) { 
        
        translation = capitalise(translation);
        
        // Add addGreenSpan
        translation = addGreenSpan(translation);
        return text.replaceAll(capKey, translation);
    }
    // If not just carry on as usual
    else {
        // Add addGreenSpan and replace
        translation = addGreenSpan(translation);
        // console.log(translation);
        // console.log(text.replaceAll(key, translation));
        
        // Workaround for 3+ words. Easier to force it down (ie Rube Goldberg machine)
        if (wordcount > 2){
            // This will match regardless if the second word is capitalized
            // and won't require having to force down all of the original text
            let startIndex = text.toLowerCase().search(key);
            let endIndex = startIndex + key.length;
            
            // console.log("start:",startIndex);
            // console.log("end:",endIndex);
            
            let startText = text.slice(0, startIndex);
            let endText = text.slice(endIndex, text.length);
            
            return startText + translation + endText;
            // return text.toLowerCase().replaceAll(key, translation);
        }

    return text.replaceAll(key, translation);
    }
}

function capitalise(word){
    // Capitalize the first letter of the word
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word
}

function isCapitalised(capkey, text){

    // Check if the original text has a capitalised version
    let match = text.match(capkey);

    if (match){
        return true; 
    } 
    return false;
}   

function addGreenSpan(translation)
{
    // Add greepspan
    return '<span class="highlight">' + translation + '</span>'
}

function partOfAnotherWord(key, text) {
    // This will ensure that substrings of words do not get translated
    let index = text.search(key);
    if (index < 0)
        index = 0;

    // console.log("\nword:", text.slice(index, index + key.length));
    // console.log("key:", key)
    
    // // Get the char values of the the char before and after the string
    let beforeMatchChar = text.charAt(index-1);;
    let afterMatchChar = text.charAt(index + key.length);

    // console.log(beforeMatchChar);
    // console.log(afterMatchChar);

    // console.log((/[a-zA-Z]/).test(beforeMatchChar));
    // console.log((/[a-zA-Z]/).test(afterMatchChar));
    
    // // If either one is a letter, then that match is part of a word and should bot be translated
    // console.log((/[a-zA-Z]/).test(beforeMatchChar) || (/[a-zA-Z]/).test(afterMatchChar))
    if ((/[a-zA-Z]/).test(beforeMatchChar) || (/[a-zA-Z]/).test(afterMatchChar)){
        // console.log('Part of another word!');
        return true;
    }
    // console.log('Standalone Word!');
    return false;
}

module.exports = Translator;