CONSOLE = (function() {
	this.historyCount = 0;
	this.consoleHistory = [];

	this.clearHistory = function() {
		self.historyCount = 0;
		self.consoleHistory = [];
		$('.console-history').html(JSON.stringify([], undefined, 0));
	};

	this.set = function(elements) {
		var newObject = {};
		elements.forEach(function(el) {
			newObject[el.key] = el.value;
		});
		newObject.state = self.state;
		self.historyCount++;
		var history = {};
		history[self.historyCount] = newObject;
		self.consoleHistory.push(history);
		$('.console-json').html(JSON.stringify(newObject, undefined, 2));
		$('.console-history').html(JSON.stringify(self.consoleHistory, undefined, 2));
	};

	this.changeAction = function(action, element) {
		var action = [{ key: 'action', value: action }];
		if (element) action.push(element);
		self.set(action);
	};

	return this;
})();
