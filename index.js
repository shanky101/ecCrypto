var crypto = require("crypto");
var eccrypto = require("eccrypto");

//A new random 32 byte private key
var privateKey = crypto.randomBytes(32);

//Corresponding uncompressed 65 byte public key
var publicKey = eccrypto.getPublic(privateKey);

var str = "Message to sign";
//Hash message to sign

var msg = crypto.createHash("sha256").update(str).digest();

eccrypto.sign(privateKey, msg).then(function(sig){
    console.log("Signature in DER format:", sig);
    eccrypto.verify(publicKey, msg, sig).then(function() {
        console.log("Signature is OK");
    }).catch(function() {
        console.log("Signature is BAD");
    });
});
