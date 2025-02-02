import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Helper function to ensure text ends with punctuation
const ensurePunctuation = (text) => {
  const punctuationMarks = ['.', '!', '?', ';'];
  return punctuationMarks.some(mark => text.trim().endsWith(mark)) 
    ? text.trim() 
    : `${text.trim()}.`;
};

export function AppProvider({ children }) {
  // Store raw values without forced punctuation
  const [personality, setPersonalityRaw] = useState('a busy and frustrated wizard who is bored and annoyed by the user');
  const [restrictions, setRestrictionsRaw] = useState('Keep responses brief and terse. Use swear words and sarcasm. If there are repeated questions, lose your temper.');

  // Wrap the setters to ensure punctuation
  const setPersonality = (value) => {
    setPersonalityRaw(ensurePunctuation(value));
  };

  const setRestrictions = (value) => {
    setRestrictionsRaw(ensurePunctuation(value));
  };

  // Ensure initial values have punctuation
  useEffect(() => {
    setPersonality(personality);
    setRestrictions(restrictions);
  }, []);
  
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  // Load conversation history from localStorage on startup
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setConversationHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save conversation history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
  }, [conversationHistory]);

  const addToHistory = (userMessage, aiResponse) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      userMessage,
      aiResponse
    };
    setConversationHistory(prev => [...prev, newEntry]);
  };

  const clearHistory = () => {
    setConversationHistory([]);
    localStorage.removeItem('chatHistory');
  };

  const value = {
    response,
    setResponse,
    isLoading,
    setIsLoading,
    error,
    setError,
    personality: ensurePunctuation(personality),
    setPersonality,
    restrictions: ensurePunctuation(restrictions),
    setRestrictions,
    conversationHistory,
    addToHistory,
    clearHistory
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 