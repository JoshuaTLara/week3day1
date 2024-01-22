import './style.css';
import getRandomWord from './src/randomWord.js';
import  setSharkImage  from './src/sharkImage.js';
import { setupWord } from './src/word.js';
import { isLetterInWord } from './src/word.js';
import { revealLetterInWord} from './src/word.js';
import setupGuesses from './src/guess.js';



document.querySelector('#app').innerHTML = `
  <section id="shark-img"></section>

  <section id="game-status"></section>

  <section id="word-container"></section>

  <section id="letter-buttons"></section>
`;

const initSharkwords = () => {
  let numWrong = 0;
  const word = getRandomWord();
  setSharkImage(document.querySelector('#shark-img'), numWrong)
  // for debugging:
  setupWord(document.querySelector('#word-container'), word);
  console.log(`[INFO] Correct word is: ${word}`);

  const handleGuess = (guessEvent, letter) => {
    // Disable button after click
    const button = guessEvent.target;
    button.setAttribute('disabled', true);
    const sharkImgEl = document.querySelector('#shark-img');
  
    // Handle correct/incorrect guess
    if (isLetterInWord(letter)) {
      revealLetterInWord(letter);
    } else {
      numWrong += 1;
      setSharkImage(sharkImgEl, numWrong);
    }
    const isWordComplete = Array.from(document.querySelectorAll('.letter-box')).every(
      (el) => el.innerText !== '',
    );
   
   if (isWordComplete || numWrong === 5) {
    document.querySelectorAll('button').forEach((btn) => {
      btn.disabled = true
    }) 
   }
  
    gameStatusEl.innerText = guessedWord === word ? 'You Win!' : 'You Lose!';

  };
  setupGuesses(document.querySelector('#letter-buttons'), handleGuess);

};

initSharkwords();





