/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */

// Mongodb example

'use strict';

function insertchatmessage(data, dbconnectorCallBackToRooms) {
  var connector = this.getConnector(),
    Chat;

  if (connector.isModelExists('Chat')) {
    Chat = connector.getModel('Chat');
  } else {
    var schema = connector.setSchema({
      chatMessage: 'string',
      roomId: 'Number',
      gravatar: 'string',
      email: 'string',
      userName: 'string'
    });
    Chat = connector.setModel('Chat', schema);
  }

  var chatMessage = new Chat({
    chatMessage: 'test',
    roomId: '1',
    gravatar: 'http://www.gravatar.com/avatar/09fab8bf1c3a9a3d15c4497a050db477?s=200&r=pg&d=404',
    email: 'elad.ny@gmail.com',
    userName: 'elad'
  });

  chatMessage.save(function (err) {
    if (err) {
      console.log('error' + err.message);
    } else {
      Chat.find(function (err, messages) {
        if (err) {
          console.log('error getting messages: ' + err.message);
        }
        dbconnectorCallBackToRooms(data, messages);
      });
    }
  });
}

module.exports.insertchatmessage = insertchatmessage;