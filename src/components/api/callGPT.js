const callChatGPT = async (prompt, conversationHistory) => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, conversationHistory })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.message };
  } catch (error) {
    console.error('Error calling ChatGPT:', error);
    return { success: false, error: error.message };
  }
};

export default callChatGPT;