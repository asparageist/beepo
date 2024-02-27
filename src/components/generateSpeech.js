const generateSpeech = async (text) => {

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text })
  };

  try {
    const response = await fetch('/api/text-to-speech', options);
    if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
    console.log('here is the response', JSON.stringify(response))
    // const data = await response.json();
    const blob = await response.blob();

    const audioURL = URL.createObjectURL(blob);

    const audio = new Audio(audioURL);
    audio.play();



    // if (data.audio_url) {
    //   const audio = new Audio(data.audio_url);
    //   audio.play();
    // } else {
    //   console.log("api responded with RESPONSE:", response);
    //   console.log("api responded with DATA:", data);
    // }
  } catch (err) {
    console.error(err);
  }
};

export default generateSpeech;

