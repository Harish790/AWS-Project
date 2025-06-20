

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const folder = document.getElementById("folderSelect").value;
  const status = document.getElementById("status");
  const spinner = document.getElementById("spinner");

  if (!fileInput.files.length) {
    status.textContent = "❌ Please select a file.";
    status.style.color = "red";
    return;
  }

  const file = fileInput.files[0];

  if (file.size > 10 * 1024 * 1024) {
    status.textContent = "❌ File too large. Max allowed size is 10 MB.";
    status.style.color = "red";
    return;
  }

  status.textContent = "";
  spinner.style.display = "inline-block";

  try {
    const res = await fetch(`https://wr0kqspi29.execute-api.us-east-2.amazonaws.com/generatePresignedURL?filename=${encodeURIComponent(file.name)}&folder=${encodeURIComponent(folder)}`);
    const data = await res.json();

    const uploadRes = await fetch(data.url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type
      }
    });

    spinner.style.display = "none";

    if (uploadRes.ok) {
      status.textContent = "✅ Uploaded to '" + folder + "' folder!";
      status.style.color = "green";
    } else {
      status.textContent = "❌ Upload failed.";
      status.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    spinner.style.display = "none";
    status.textContent = "❌ Upload error. See console.";
    status.style.color = "red";
  }
}
