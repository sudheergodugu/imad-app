 var express = require('express');
 var morgan = require('morgan');
 var path = require('path');
 
 var app = express();
 app.use(morgan('combined'));
 
 app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  });
   app.get('/ui/index.html2', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html2'));
  });
  
  
  
  
  
  
  
  app.get('/article-one', function (req, res) {
  res.send('article two requested and served here');
 
  });
  
  
 app.get('/ui/style.css', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'style.css'));
 });
 
 app.get('/ui/madi.png', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
 });
 
 
 // Do not change port, otherwise your app won't run on IMAD servers
 // Use 8080 only for local development if you already have apache running on 80
 
 var port = 80;
 app.listen(port, function () {
   console.log(`IMAD course app listening on port ${port}!`);
 });
 
 $(document).ready(function () {
  // Initialize the PubNub API connection.
  var pubnub = PUBNUB.init({
    publish_key: 'PUBNUB PUBLISH KEY HERE',
    subscribe_key: 'PUBNUB SUBSCRIBE KEY HERE'
  });
 
  // Grab references for all of our elements.
  var messageContent = $('#messageContent'),
      sendMessageButton = $('#sendMessageButton'),
      messageList = $('#messageList');
 
  // Handles all the messages coming in from pubnub.subscribe.
  function handleMessage(message) {
    var messageEl = $("<li class='message'>"
        + "<span class='username'>" + message.username + ": </span>"
        + message.text
        + "</li>");
    messageList.append(messageEl);
    messageList.listview('refresh');
 
    // Scroll to bottom of page
    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');
  };
 
  // Compose and send a message when the user clicks our send message button.
  sendMessageButton.click(function (event) {
    var message = messageContent.val();
 
    if (message !=='') {
      pubnub.publish({
        channel: 'chat',
        message: {
          username: 'test',
          text: message
        }
      });
 
      messageContent.val("");
    }
  });
 
  // Also send a message when the user hits the enter button in the text area.
  messageContent.bind('keydown', function (event) {
    if((event.keyCode || event.charCode) !== 13) return true;
    sendMessageButton.click();
    return false;
  });
 
  // Subscribe to messages coming in from the channel.
  pubnub.subscribe({
    channel: 'chat',
    message: handleMessage
  });
});
 
 
 
 
 
 
 
 
 
 