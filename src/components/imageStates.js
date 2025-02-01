const getImageUrl = (state) => {
  const images = {
    waiting: '/wizWait.png',
    listening: '/wizListen.png',
    thinking: '/wizThink.png',
    speaking: '/wizSpeak.png',
    error: '/wizDead.png'
  };

  return images[state] || images.waiting;
};

export default getImageUrl;