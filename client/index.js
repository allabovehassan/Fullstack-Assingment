
document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const category = document.getElementById("category").value;
  const model = document.getElementById("model").value;
  const serialNumber = document.getElementById("serialNumber").value;
  const invoiceDate = document.getElementById("invoiceDate").value;
  const uploadFile = document.getElementById("uploadFile").files[0];

  if (!category || !model || !serialNumber || !invoiceDate) {
    alert("Please fill in all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append("category", category);
  formData.append("model", model);
  formData.append("serialNumber", serialNumber);
  formData.append("invoiceDate", invoiceDate);
  formData.append("uploadFile", uploadFile);

  fetch("/api/register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Product registered successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const dropZone = document.getElementById("dropZone");
const uploadFileInput = document.getElementById("uploadFile");

dropZone.addEventListener("click", () => {
  uploadFileInput.click();
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragover");
  const files = event.dataTransfer.files;
  uploadFileInput.files = files;

  if (files.length > 0) {
    dropZone.textContent = files[0].name;
  } else {
    dropZone.textContent = "Drag files here or click to browse";
  }
});
