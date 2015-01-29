exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
        'specs/*.specs.js'
	],
	multiCapabilities: [
    /*{browserName: 'firefox'},*/ {browserName: 'chrome'}
    ],
    params: {
    	login : {
    		user : 'gauge',
    		passwork : '123'
    	}
    }
};