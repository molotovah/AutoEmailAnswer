// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.content) {
    // Get the configuration options from storage
    chrome.storage.sync.get({
      apiKey: "",
      replyTemplate: "Thank you for your email. We will respond as soon as possible."
    }, function(config) {
      // Call the AI-powered reply generator API with the email content and configuration options
      generateReply(request.content, config.apiKey, config.replyTemplate, function(generatedReply) {
        // Send the generated reply back to the content script
        sendResponse({reply: generatedReply});
      });
    });
    // Return true to indicate that a response will be sent asynchronously
    return true;
  }
});

function generateReply(emailContent, apiKey, replyTemplate, callback) {
  // Call the AI-powered reply generator API with the email content and configuration options
  // Replace this placeholder function with your actual implementation of the AI-powered reply generator API
  // Make sure to handle errors and call the callback function with the generated reply
  // Example implementation:
  fetch("https://api.example.com/generate_reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiKey
    },
    body: JSON.stringify({
      emailContent: emailContent,
      replyTemplate: replyTemplate
    })
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error("API error: " + response.status + " " + response.statusText);
    }
    return response.json();
  })
  .then(function(data) {
    callback(data.reply);
  })
  .catch(function(error) {
    console.error(error);
    callback(null);
  });
}
