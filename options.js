// Load the configuration options from storage and populate the form fields
chrome.storage.sync.get({
  apiKey: "",
  replyTemplate: "Thank you for your email. We will respond as soon as possible."
}, function(config) {
  document.getElementById("api-key").value = config.apiKey;
  document.getElementById("reply-template").value = config.replyTemplate;
});

// Save the configuration options to storage when the save button is clicked
document.getElementById("save-button").addEventListener("click", function() {
  var apiKey = document.getElementById("api-key").value;
  var replyTemplate = document.getElementById("reply-template").value;
  chrome.storage.sync.set({
    apiKey: apiKey,
    replyTemplate: replyTemplate
  }, function() {
    // Show success message to the user
    var successMessage = document.createElement("div");
    successMessage.innerText = "Configuration options saved!";
