async function callChatGPT(prompt, conversationHistory = []) {
  try {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt: prompt must be a non-empty string');
    }

    // Format conversation history into ChatGPT messages
    const messages = [
      // System message to set the context
      { 
        role: 'system', 
        content: 'You are an AI assistant engaging in conversation.'
      }
    ];

    // Add conversation history
    if (Array.isArray(conversationHistory)) {
      conversationHistory.forEach(entry => {
        if (entry && typeof entry.userMessage === 'string') {
          messages.push({ role: 'user', content: entry.userMessage });
        }
        if (entry && typeof entry.aiResponse === 'string') {
          messages.push({ role: 'assistant', content: entry.aiResponse });
        }
      });
    }

    // Add current prompt
    messages.push({ role: 'user', content: prompt });

    console.log('Sending messages to API:', JSON.stringify(messages, null, 2)); // Debug log

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to get response');
    }

    const data = await response.json();
    return {
      success: true,
      data: data.response
    };
  } catch (error) {
    console.error('ChatGPT API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export default callChatGPT;