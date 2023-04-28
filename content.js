// Listen for the click event on the "Generate Reply" button
document.getElementById("generate-reply-button").addEventListener("click", function() {

  // Get the email content
  var emailContent = document.querySelector("div[class^='allowTextSelection']>div").innerText;

  // Open the reply field
  document.querySelector("span[aria-label='Reply']>button").click();

  // Send a message to the background script with the email content
  chrome.runtime.sendMessage({content: emailContent}, function(response) {
    // Callback function that is called when the background script sends a response
    if (response && response.reply) {
      // Copy the generated reply to the clipboard
      navigator.clipboard.writeText(response.reply);
    }
  });
});
