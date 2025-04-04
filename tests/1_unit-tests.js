const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    let translator = new Translator();

    test('Translate Mangoes are my favorite fruit. to British English', () => {
        
        let input = 'Mangoes are my favorite fruit.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'Mangoes are my favourite fruit.';
        assert.equal(translation, answer, 'The translation must match the answer, (favorite => favourite)');

    });

    test('Translate I ate yogurt for breakfast. to British English', () => {
        
        let input = 'I ate yogurt for breakfast.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'I ate yoghurt for breakfast.';
        assert.equal(translation, answer, 'The translation must match the answer, (yogurt => yoghurt)');

    });

    test("Translate We had a party at my friend's condo. to British English", () => {
        
        let input = "We had a party at my friend's condo.";
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = "We had a party at my friend's " +  'flat.';
        assert.equal(translation, answer, 'The translation must match the answer, (condo => flat)');

    });
    
    test('Translate Can you toss this in the trashcan for me? to British English', () => {
        
        let input = 'Can you toss this in the trashcan for me?';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'Can you toss this in the rubbishcan for me?';
        assert.equal(translation, answer, 'The translation must match the answer, (trashcan => rubbishcan)');

    });

    test('Translate The parking lot was full. to British English', () => {
        
        let input = 'The parking lot was full.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'The car park was full.';
        assert.equal(translation, answer, 'The translation must match the answer, (parking lot => car park)');

    });

    test('Translate Like a high tech Rube Goldberg machine. to British English', () => {
        
        let input = 'Like a high tech Rube Goldberg machine.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'Like a high tech Heath Robinson device.';
        assert.equal(translation, answer, 'The translation must match the answer, (Rube Goldberg machine => Heath Robinson device)');

    });

    test('Translate To play hooky means to skip class or work. to British English', () => {
        
        let input = 'To play hooky means to skip class or work.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'To bunk off means to skip class or work.';
        assert.equal(translation, answer, 'The translation must match the answer, (play hooky => bunk off)');

    });

    test('Translate No Mr. Bond, I expect you to die. to British English', () => {
        
        let input = 'No Mr. Bond, I expect you to die.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'No Mr Bond, I expect you to die.';
        assert.equal(translation, answer, 'The translation must match the answer, (Mr. => Mr)');

    });

    test('Translate Dr. Grosh will see you now. to British English', () => {
        
        let input = 'Dr. Grosh will see you now.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'Dr Grosh will see you now.';
        assert.equal(translation, answer, 'The translation must match the answer, (Dr. => Dr)');

    });

    test('Translate Lunch is at 12:15 today. to British English', () => {
        
        let input = 'Lunch is at 12:15 today.';
        let translation = translator.americanToBritish(input);
        translation = translator.stripSpan(translation);
        let answer = 'Lunch is at 12.15 today.';
        assert.equal(translation, answer, 'The translation must match the answer, (12:15 => 12.15 )');

    });

    test('Translate We watched the footie match for a while. to American English', () => {
        
        let input = 'We watched the footie match for a while.';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'We watched the soccer match for a while.';
        assert.equal(translation, answer, 'The translation must match the answer, (footie => soccer)');

    });

    test('Translate Paracetamol takes up to an hour to work. to American English', () => {
        
        let input = 'Paracetamol takes up to an hour to work.';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'Tylenol takes up to an hour to work.';
        assert.equal(translation, answer, 'The translation must match the answer, (Paracetamol => Tylenol)');

    });

    test('Translate First, caramelise the onions. to American English', () => {
        
        let input = 'First, caramelise the onions.';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'First, caramelize the onions.';
        assert.equal(translation, answer, 'The translation must match the answer, (caramelise => caramelize)');

    });

    test('Translate I spent the bank holiday at the funfair. to American English', () => {
        
        let input = 'I spent the bank holiday at the funfair.';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'I spent the public holiday at the carnival.';
        assert.equal(translation, answer, 'The translation must match the answer, (bank holiday => public holiday)');

    });

    test('Translate I had a bicky then went to the chippy. to American English', () => {
        
        let input = 'I had a bicky then went to the chippy.';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'I had a cookie then went to the fish-and-chip shop.';
        assert.equal(translation, answer, 'The translation must match the answer, (bicky => cookie)');

    });

    test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
        
        let input = "I've just got bits and bobs in my bum bag.";
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = "I've" + ' just got odds and ends in my fanny pack.';
        assert.equal(translation, answer, 'The translation must match the answer, (bits and bobs => odds and ends) (bum bag => fanny pack)');
    
    });

    test('Translate The car boot sale at Boxted Airfield was called off. to American English', () => {
       
        let input = 'The car boot sale at Boxted Airfield was called off.';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'The swap meet at Boxted Airfield was called off.';
        assert.equal(translation, answer, 'The translation must match the answer, (car boot sale => swap meet)');
    
    });

    test('Translate Have you met Mrs Kalyani? to American English', () => {
        
        let input = 'Have you met Mrs Kalyani?';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'Have you met Mrs. Kalyani?';
        assert.equal(translation, answer, 'The translation must match the answer, (Mrs => Mrs.)');

    });

    test("Translate Prof Joyner of King's College, London. to American English", () => {
        
        let input = "Prof Joyner of King's College, London.";
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'Prof.' + " Joyner of King's College, London.";
        assert.equal(translation, answer, 'The translation must match the answer, (Prof => Prof.)');

    });

    test('Translate Tea time is usually around 4 or 4.30. to American English', () => {
        
        let input = 'Tea time is usually around 4 or 4.30.';
        let translation = translator.britishToAmerican(input);
        translation = translator.stripSpan(translation);
        let answer = 'Tea time is usually around 4 or 4:30:';
        assert.equal(translation, answer, 'The translation must match the answer, (4.30 => 4:30)');

    });

    test('Highlight translation in Mangoes are my favorite fruit.', () => {
        
        let input = 'Mangoes are my favorite fruit.';
        let translation = translator.americanToBritish(input);
        let answer = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
        assert.equal(translation, answer, "'favourite' should have a span");

    });

    test('Highlight translation in I ate yogurt for breakfast.', () => {
        
        let input = 'I ate yogurt for breakfast.';
        let translation = translator.americanToBritish(input);
        let answer = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
        assert.equal(translation, answer, "'yoghurt' should have a span");

    });
    
    test('Highlight translation in We watched the footie match for a while.', () => {
        
        let input = 'We watched the footie match for a while.';
        let translation = translator.britishToAmerican(input);
        let answer = 'We watched the <span class="highlight">soccer</span> match for a while.';
        assert.equal(translation, answer, "'soccer' should have a span");

    });

    test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
        
        let input = 'Paracetamol takes up to an hour to work.';
        let translation = translator.britishToAmerican(input);
        let answer = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
        assert.equal(translation, answer, "'Tylenol' should have a span");

    });
});
