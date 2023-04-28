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
