import React from 'react';
import './HelpModal.css';

function HelpModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Game Rules</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <ul>
            <li>Guess the Bollywood movie title by choosing letters and numbers.</li>
            <li>All vowels (A, E, I, O, U) are revealed for you at the start.</li>
            <li>For every incorrect guess, one letter from the word "BOLLYWOOD" will be struck out.</li>
            <li>You lose the round if all 10 letters of "BOLLYWOOD" are gone.</li>
            <li>After 5 wrong guesses, a hint will automatically appear.</li>
            <li>Win the round by guessing all the consonants and numbers in the title.</li>
            <li>You won't be penalized for any vowel you enter.</li>
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-confirm-btn" onClick={onClose}>
            Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;