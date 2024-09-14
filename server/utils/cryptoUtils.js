const CryptoJS = require('crypto-js');

// Make sure your encryption key is exactly 32 bytes for AES-256
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes (256 bits) for AES-256
const IV_LENGTH = 16; // For AES, this is always 16 bytes

const encryptData = (text) => {
    try {
        // Generate a random initialization vector (IV)
        const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);

        // Encrypt the data
        const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Hex.parse(ENCRYPTION_KEY), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        // Return the IV and encrypted text as Base64 strings
        return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    } catch (error) {
        console.log('Error in encryption: ', error);
        const newError = new Error('Failed to encrypt data!');
        newError.code = 400;
        throw newError;
    }
};

module.exports = { encryptData };
