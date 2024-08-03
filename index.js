let currentStream;

async function getStream() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: { facingMode: { exact: "environment" } } // Request the back camera
  };

  try {
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    document.getElementById('video').srcObject = currentStream;
  } catch (err) {
    console.error("Error accessing camera: ", err);
    alert("Unable to access the back camera. Please check camera permissions and try again.");
  }
}

async function init() {
  await getStream(); // Attempt to start with the back camera
}

init();


