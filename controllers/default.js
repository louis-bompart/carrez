var dealChecker = require('./dealChecker');
exports.install = function() {
	F.route('/', view_index);
	// or
	// F.route('/');
	F.route('/',request_URL, ['post']);
};

function view_index() {
	var self = this;
	self.view('index', {deal: false});
}
function request_URL() {
	var self = this;
	var model = self.body;
	dealChecker.process(model.url,function (a,b) {
		self.view('index', {deal: a, price: b});
	})
}
