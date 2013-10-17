/*******************************************************************************
* Copyright (c) 2013 itemis AG (http://www.itemis.de).
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*******************************************************************************/

/*
	This is an example websocket server which uses the JS-stub as generated
	by Franca's WebsocketJSStubGenerator. 

	The server is implemented in JavaScript and is based on node.js and
	the websocket.io library.
*/

// create websocket stub for SimpleUI interface and listen to port 9000.
var SimpleUIStub = require('./gen/org/example/SimpleUIStub');
var stub = new SimpleUIStub();
stub.init(9000);

var timerID = null;

// the callback after a client has connected
stub.onConnected = function () {
	if (timerID == null) {
		timerID = setInterval(function() {
			var rand = Math.floor(Math.random()*100);
			stub.updateVelocity({velocity: rand});
		}, 1000);
	}
}

// the generic callback after last client has disconnected
stub.onAllDisconnected = function () {
	clearInterval(timerID);
	timerID = null;
}

// the callback for calls to SimpleUI.setMode
stub.setMode = function (mode) {
	var d = "";
	switch (mode) {
		case 0: d = "Bay Radio FM"; break;
		case 1: d = "Destination?"; break;
		case 2: d = "Enter number!"; break;
		case 3: d = "Your settings"; break;
	}

	return { display: d };
}

