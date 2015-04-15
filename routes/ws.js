var url = require('url');
var crypto = require('crypto');

var TOKEN = 'oYHD3dCTE6ApO4e1NXaTxj1-eNgLe7jQIwSH04DvR6XkoQEdNtKLN0jMMgWDjMbUhrFMRUOu55vU7tPB2y3muu0NIZEjxqD08fr_zH_tpyM';

/* GET users listing. */
exports.getService = function(req, res, next){
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
	var shaResult = shasum.digest('hex');


	if (shaResult == signature) {
		res.send(echostr);
	}else{
		res.send('not weixin server');
	}
}