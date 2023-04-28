// Listen for the click event on the "Generate Reply" button
document.getElementById("generate-reply-button").addEventListener("click", function() {

  // Get the email content
  var emailContent = document.querySelector("div[class^='allowTextSelection']>div").innerText;

  // Open the reply field
  document.querySelector("span[aria-label='Reply']>button").click();

  // Send a message to the background script with the email content
  chrome.runtime.sendMessage({content: emailContent}, function(response) {
    // Callback function that is called when the background script sends a response
    if (chrome.runtime.lastError) {
      // Handle error if the background script is not running
      console.error(chrome.runtime.lastError);
      return;
    }

    if (response && response.reply) {
      // Copy the generated reply to the clipboard
      navigator.clipboard.writeText(response.reply)
        .then(function() {
          // Show success message to the user
          var successMessage = document.createElement("div");
          successMessage.innerText = "AI-generated reply copied to clipboard!";
          successMessage.style.color = "green";
          successMessage.style.fontWeight = "bold";
          document.querySelector("div[class^='EditableTextField']").appendChild(successMessage);
        })
        .catch(function(error) {
          // Handle error if clipboard write fails
          console.error(error);
        });
    }
  });
});
