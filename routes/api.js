'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // console.log(req.body);

      const {locale, text} = req.body;

      let translator = new Translator();
    
      // Check if the text area is empty
      if (text == ''){
        return res.json({error:'No text to translate'});
        
      }

      if (text == undefined) {
        return res.json({error: 'Required field(s) missing'});
      }

      // Check to see that the locales are validS
      if (locale != 'american-to-british' && 
            locale != 'british-to-american'){
        return res.json({error: 'Invalid value for locale field'});
      }

      // Logic for translating from American to British
      if (locale == 'american-to-british') {
        // translator.americanToBritish(text);
        let translation = translator.americanToBritish(text);
        // console.log(translator.stripSpan(translation));

        if (text == translator.stripSpan(translation))
          return res.json({text: text, translation: 'Everything looks good to me!'});

        return res.json({text: text, translation: translation});

      }
      // Logic for translating from British to American
      else if (locale == 'british-to-american'){
        // translator.britishToAmerican(text);
        let translation = translator.britishToAmerican(text)
        // console.log(translator.stripSpan(translation));

        if (text == translator.stripSpan(translation))
          return res.json({text: text, translation: 'Everything looks good to me!'});

        return res.json({text: text, translation: translation});
      }
      
    });
};
