var express = require('express');
var url = require('url');
var crypto = require('crypto');

var router = express.Router();

var TOKEN = 'VwiIlpSn7_espo3l2N0C_fbykdjwrWL6Y7N76x1kkF0Lk1X3EGnPuwJDQqxeu58O2-QpmAjh39I9p4BM859Ku2WDPHJQ3h4llbJbXVBqN3E';

/* GET users listing. */
router.get('/', function(req, res, next) {
	var reqObj = url.parse(req.url, true);
	var params = reqObj['query'];
	var signature = params['signature'];
	var timestamp = params['timestamp'];
	var nonce = params['nonce'];
	var echostr = params['echostr'];
	var tmpArr = [TOKEN, timestamp, nonce];

	tmpArr.sort();
	var tmpStr = tmpArr.join('');
	var shasum = crypto.createHash('sha1');
	shasum.update(tmpStr);
	var shaResult = shasum.degest('hex');

	if (shaResult == signature) {
		res.send(echostr);
	}else{
		res.send('not weixin server');
	}
});

module.exports = router;