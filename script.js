const API_URL = "https://ai-chat-backend-itoi.onrender.com/";

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.content) {
      displayContent(data.content);
    } else {
      alert(data.error || "Failed to process the file.");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("An error occurred while uploading the file.");
  }
}

function displayContent(content) {
  const chatContainer = document.getElementById("chatContainer");
  const contentMessage = document.createElement("div");
  contentMessage.className = "chat-message";
  contentMessage.innerText = content;
  chatContainer.appendChild(contentMessage);
}

async function askAI() {
  const questionInput = document.getElementById("questionInput");
  const question = questionInput.value.trim();

  if (!question) {
    alert("Please enter a question.");
    return;
  }

  const content = document.querySelector(".chat-message")?.innerText || "";
  if (!content) {
    alert("Please upload and process a document first.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, question }),
    });

    const data = await response.json();
    const chatContainer = document.getElementById("chatContainer");

    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user-message";
    userMessage.innerText = question;
    chatContainer.appendChild(userMessage);

    const aiMessage = document.createElement("div");
    aiMessage.className = "chat-message ai-message";
    aiMessage.innerText = data.answer || "No response from AI.";
    chatContainer.appendChild(aiMessage);
  } catch (error) {
    console.error("Error asking AI:", error);
    alert("An error occurred while asking the AI.");
  }

  questionInput.value = "";
}
