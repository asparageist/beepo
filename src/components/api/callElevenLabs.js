const generateSpeech = async (text) => {

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text })
  };

  try {
    const response = await fetch('/api/text-to-speech', options);
    if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);

    const blob = await response.blob(); //binary langage object, for handling streaming multimedia

    const audioURL = URL.createObjectURL(blob);

    const audio = new Audio(audioURL);

    setTimeout(() => {
      audio.play();
    }, 3000);

  } catch (err) {
    console.error(err);
  }
};

export default generateSpeech;