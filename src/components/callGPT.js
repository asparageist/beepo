async function callChatGPT(prompt) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default callChatGPT;
