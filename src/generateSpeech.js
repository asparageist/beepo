const generateSpeech = async (text) => {

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ 
      model_id: "eleven_monolingual_v1",
      text: text,
      new_name: "valentino",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true
      }
     }) 
  };

  try {
    const response = await fetch('/api/text-to-speech', options);
    const data = await response.json();
    console.log(response.body); // start here!

    // if (data.audio_url) {
    //   const audio = new Audio(data.audio_url);
    //   audio.play();
     if (response.audio_url) {
      const audio = new Audio(response.audio_url);
      audio.play();

    } else {
      // console.log("NOPE. API denied.");
      // console.log(data);
      console.log("api responded with:", response);
    }
  } catch (err) {
    console.error(err);
  }
};

export default generateSpeech;