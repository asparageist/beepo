const getImageUrl = (imageState) => {
  switch (imageState) {
    case 'listening':
      return 'squirrelListening.jpg';
    case 'thinking':
      return 'squirrelThinking.jpg';
    case 'speaking':
      return 'squirrelSpeaking.jpg';
    case 'waiting':
      return 'squirrelWaiting.jpg';
  }
};

export default getImageUrl;