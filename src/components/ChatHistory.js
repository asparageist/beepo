import React from 'react';
import { useApp } from '../context/AppContext';

function ChatHistory({ className }) {
  const { conversationHistory, error, clearHistory } = useApp();

  return (
    <div className={`chat-history ${className}`}>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Error: {error}
        </div>
      )}
      <button 
        onClick={clearHistory}
        style={{
          marginBottom: '10px',
          padding: '5px 10px',
          borderRadius: '3px'
        }}
      >
        Clear History
      </button>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {conversationHistory.map(entry => (
          <div key={entry.id} style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold' }}>You: {entry.userMessage}</div>
            <div>Wizard: {entry.aiResponse}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatHistory; 