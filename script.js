let net;

const imageUpload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');
const predictionText = document.getElementById('prediction');

async function loadModel() {
  predictionText.innerText = "Loading model...";
  net = await mobilenet.load();
  predictionText.innerText = "Model loaded! Upload an image.";
}

imageUpload.addEventListener('change', async function () {
  const file = imageUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);

  preview.onload = async function () {
    const result = await net.classify(preview);
    predictionText.innerText = `Prediction: ${result[0].className} (${(result[0].probability * 100).toFixed(2)}%)`;
  };
});

loadModel();