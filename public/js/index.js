window.fbAsyncInit = function() {
	var self = this;

	this.token = false;

	this.state = {
		appId: '1975205799389726',
		autoLogAppEvents: true,
		xfbml: true,
		version: 'v2.10',
		scope: 'email'
	};

	/**
	 * Checks if facebook response is ok
	 */
	this.connected = function(response) {
		if (response && response.status && response.status === 'connected') {
			self.token = response.authResponse.accessToken;
			$('.khem-uri-btn').prop('disabled', false);
			$('.khem-uri').prop('disabled', false);
			return true;
		}
		return false;
	};

	/**
	 * Init form listeners
	 */
	this.initForm = function() {
		$('.clear-btn').click(function(ev) {
			ev.preventDefault();
			CONSOLE.clearHistory();
		});
		$('.khem-uri-btn').click(function(ev) {
			ev.preventDefault();
			var domain = $('.khem-uri').val();
			if (domain) {
				var url = domain + 'auth/facebook';
				CONSOLE.changeAction('khemlabs_login', { key: 'url', value: url });
				$.post(
					{
						type: 'POST',
						url: url,
						data: {
							access_token: self.token
						}
					},
					function(response) {
						CONSOLE.changeAction('khemlabs_login_response', { key: 'response', value: response });
					}
				).fail(function(response) {
					var status = response.status;
					var head = response.getAllResponseHeaders();
					var statusText = response.statusText;
					CONSOLE.changeAction('khemlabs_login_error', {
						key: 'response',
						value: {
							status: status,
							head: head,
							statusText: statusText
						}
					});
				});
			}
		});
		$('.khem-uri-btn').prop('disabled', true);
		$('.khem-uri').prop('disabled', true);
	};

	/**
	 * Facebook login
	 */
	this.initLoginButton = function() {
		$('.login-btn').click(function(ev) {
			var scope = $('.facebook-scope').val();
			self.state.scope = scope;
			FB.login(
				function(response) {
					CONSOLE.changeAction('facebook_login_response', { key: 'response', value: response });
					self.connected(response);
				},
				{ scope: self.state.scope }
			);
		});
	};

	/**
	 * Init
	 */
	this.init = function() {
		self.initForm();
		self.initLoginButton();
		FB.init({
			appId: self.state.appId,
			autoLogAppEvents: self.state.autoLogAppEvents,
			xfbml: self.state.xfbml,
			version: self.state.version
		});
		FB.AppEvents.logPageView();
	};

	this.init();
};
