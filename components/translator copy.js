const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    
    americanToBritish(text){
        console.log('American to British');
        
        // let textArr = text.split(/[, .]/);
        let textArr = text.split(' ');
        console.log(textArr);
        
        // Check against every word
        for (let i = 0; i < textArr.length; i ++) {
            
            let word;
            let punctuation;
            
            const punctuationList = [',','.','?','!'];
            // Seperate anything other than a word (, . ? !)
            if (!punctuationList.includes(textArr[i].charAt(textArr[i].length-1))){
                
                // If it doesn't contain a punctuation, it doesn't need to be split
                word = textArr[i];
            }
            else {
                // console.log('Needs to be split:', textArr[i]);
                // console.log(textArr[i].charAt(textArr[i].length-1));
                
                // TITLES
                // Check to see the Titles, is the word in the object? (they are all lowercase)
                if (americanToBritishTitles.hasOwnProperty(textArr[i].toLowerCase())){
                    // get the British translation from the object
                    
                    // Get the translation with the proper dict/object
                    textArr[i] = useDict(textArr[i], americanToBritishTitles)                    

                    // Add the green span
                    textArr[i] = '<span class="highlight">' + textArr[i] + '</span>';
                    // console.log(textArr[i]);
                }
                else {
                    
                    word = textArr[i].slice(0, -1);
                    punctuation = textArr[i].charAt(textArr[i].length-1); 

                    // Punctuation may be undefined for now, 
                    // Check the word against the translation object
                    console.log('-------------------------------------------');
        
                    console.log('Word:', word);
                    if (punctuation) {
                        console.log('Punctuation', punctuation);
                    }
                    // console.log('Punctuation', punctuation);
                    
                    // Check to see if there are any translations
                    if (americanToBritishSpelling.hasOwnProperty(word.toLowerCase()))
                        textArr[i] = useDict(word, americanToBritishSpelling);
                    
                    // Add the green span
                    textArr[i] = '<span class="highlight">' + textArr[i] + '</span>';

                    // If there was punctuation, add it back
                    if (punctuation){
                        textArr[i] = textArr[i] + punctuation;
                    }
                    
                }
            }

            // TIME
            // Change the time format
            if (/\d{1,2}\:\d{1,2}/.test(textArr[i])){
                // console.log(textArr[i]);
                
                // Replace the symbol
                textArr[i] = textArr[i].replace(':', '.');
                
                // Add the green span
                textArr[i] = '<span class="highlight">' + textArr[i] + '</span>';
                // console.log(textArr[i]);
            }
        }
        // console.log(textArr);
        // console.log(americanToBritishTitles.hasOwnProperty('prof.'));
        
        return textArr.join(' ');
            
    }

    britishToAmerican(text){
        console.log('British to American')
        
        let textArr = text.split(' ');
        console.log(textArr);

        // Check against every word
        for (let i = 0; i < textArr.length; i ++) {

            // TIME
            // Change the time format
            if (/\d{1,2}\.\d{1,2}/.test(textArr[i])){
                // console.log(textArr[i]);
                // Replace the symbol
                textArr[i] = textArr[i].replace('.', ':');
                // Add the green span
                textArr[i] = '<span class="highlight">' + textArr[i] + '</span>';
                // console.log(textArr[i]);

            }
            // TITLES
            // Get the reverse for the titles for the british to the american
            Object.keys(americanToBritishTitles).find(key => {
                // console.log(key);
                // Check if any value of the object is equal to the current word
                if (americanToBritishTitles[key] == textArr[i].toLowerCase()){
                    // Check if the word is capitalised and if so, capitalise it
                    if (isCapitalised(textArr[i])){
                    // if (textArr[i].charAt(0).toUpperCase() == textArr[i].charAt(0)){
                        textArr[i] = capitalise(key);
                        // textArr[i] = key.charAt(0).toUpperCase() + key.slice(1);
                        console.log('British Translation:', textArr[i]);
                    }
                    // Else take the key in all its lowercase glory
                    else {
                        textArr[i] = key;
                    }
                    // Add the green span
                    textArr[i] = '<span class="highlight">' + textArr[i] + '</span>';

                }
            });
        }

        return textArr.join(' ');

    }
}


function useDict(word, dictionary){
    
    let temp = dictionary[word.toLowerCase()];
    
    // check to see if original word is capitalised
    if (isCapitalised(word)){
        
        // if so, capitalize the american temp and resave the new word
        word = temp.charAt(0).toUpperCase() + temp.slice(1);
    }
    else {
        word = temp;
    }
    return word;
}

function capitalise(word){
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word
}

function isCapitalised(word){
    if (word.charAt(0) == word.charAt(0).toUpperCase())
        return true
    return false
}   


module.exports = Translator;