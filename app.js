const LUISClient = require("./luis_sdk");
const Prompt = require('prompt-text')
var prompt = new Prompt({name: '',message: 'luisdemo >'});

smartAsk();

function ask() {
	prompt.ask(function (answer) {
		var response = ""

		switch (answer) {
			case "open":
				response = "sorry dave, i can't open the pod bay doors";
				break;
			case "close":
				response = "closing the doors...";
				break;
			default:
				response = "nope";
		}
		console.log(response);
		ask();
	});
}

var luis = LUISClient({
	appId: "APP_ID",
	appKey: "APP_KEY",
	verbose: true
});

function smartAsk() {
	prompt.ask(function (answer) {
		var response = ""

		luis.predict(answer, {
			onSuccess: function (intent) {
				answer = intent.topScoringIntent.intent;

				console.log("-------");
				console.log(intent)
				console.log("-------");

				switch (answer) {
					case "open":
						response = "sorry dave, i can't open the pod bay doors";
						break;
					case "close":
						response = "closing the doors...";
						break;
					default:
						response = "nope";
				}
				console.log(response);
				smartAsk();
			}, onFailure: function(e) {}
		});
	});
}

