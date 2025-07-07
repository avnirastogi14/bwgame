import React from 'react';
import './HintModal.css';

function HintModal({ male, female, genre, onClose }) {
  return (
    <div className="hint-modal-overlay" onClick={onClose}>
      <div className="hint-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="hint-modal-header">
          <h2>🎭 Need a Hint?</h2>
          <button className="hint-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="hint-modal-body">
          <div className="hint-item">
            <div className="hint-label">
              <span className="hint-icon">👨‍🎭</span>
              <span>Male Lead</span>
            </div>
            <div className="hint-value">{male}</div>
          </div>

          <div className="hint-item">
            <div className="hint-label">
              <span className="hint-icon">👩‍🎭</span>
              <span>Female Lead</span>
            </div>
            <div className="hint-value">{female}</div>
          </div>

          <div className="hint-item">
            <div className="hint-label">
              <span className="hint-icon">🎬</span>
              <span>Genre</span>
            </div>
            <div className="hint-value genre-tag">{genre}</div>
          </div>
        </div>

        <div className="hint-modal-footer">
          <button className="hint-confirm-btn" onClick={onClose}>
            Got It! 🎯
          </button>
        </div>
      </div>
    </div>
  );
}

export default HintModal;
