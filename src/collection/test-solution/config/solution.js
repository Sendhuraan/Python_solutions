(function() {

	var solution = {
		node: {
			lint: {
				pattern: ['*.cpp', 'math-functions/**/*.cpp', 'math-functions/**/*.h'],
				options: 'defaultLintOptions'
			},
			test: false,
			bundle: {
				entry: 'index.py',
				output: {
					file: 'index.py'
				}
			}
		},
		browser: false,
		dirs: {
			node: ['utilities'],
			browser: false,
			output: 'output',
			development: 'workstation',
			deploy: 'deploy'
		}
	};

	var publicAPI = {
		solution
	};

	module.exports = publicAPI;
	
})();
