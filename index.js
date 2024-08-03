let currentStream;
let currentDeviceId;
let devices = [];

async function getDevices() {
  devices = await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter(device => device.kind === 'videoinput');
  
  const select = document.getElementById('camera-select');
  select.innerHTML = '';
  
  devices.forEach((device, index) => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = `${device.label || `Camera ${index + 1}`} (ID: ${device.deviceId})`;
    select.appendChild(option);
  });
}

async function getStream(deviceId) {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  const constraints = deviceId ? {
    video: { deviceId: { exact: deviceId } }
  } : {
    video: { facingMode: { exact: "environment" } } // Request the back camera
  };

  try {
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    document.getElementById('video').srcObject = currentStream;
    currentDeviceId = deviceId;
  } catch (err) {
    console.error("Error accessing camera: ", err);
  }
}

document.getElementById('switch-camera').addEventListener('click', async () => {
  const select = document.getElementById('camera-select');
  const selectedDeviceId = select.value;
  await getStream(selectedDeviceId);
});

async function init() {
  await getDevices();
  await getStream();  // Attempt to start with the back camera
}

init();

