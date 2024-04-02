import Encrypt from 'encryptlong';

// 加密公钥
const publicKey =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7r6geWheWmwz9+WSAT5eUs6uUkYyO9hXjrdE6s4LcwXOOSIRt/SLaqKPWHyf1rDCFexBWAqg1EgSPZDRUePoK2Svp1o1gvmp/uTx4lLpruT6pN/VsU9hoEotVKwHXMflBZ3L1v9o2zyHoXbUkGNVxFZH3DCwDYamAbylaG9+GQwIDAQAB';

// 加密私钥
const privateKey =
    'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALuvqB5aF5abDP35ZIBPl5Szq5SRjI72FeOt0TqzgtzBc45IhG39Itqoo9YfJ/WsMIV7EFYCqDUSBI9kNFR4+grZK+nWjWC+an+5PHiUumu5Pqk39WxT2GgSi1UrAdcx+UFncvW/2jbPIehdtSQY1XEVkfcMLANhqYBvKVob34ZDAgMBAAECgYEAq51Jdz9ftDlgXtZsfBrK+pBzAm03/fysNTxZRXig3uQQmnhahwvgk9mBvadNbYkd8N9/J3ZUgfpQqyCv7NGVp0P3ViBhS6wuiiNYfo2FiUl6tB5RS8GQxEBxdMCihXX+A0fnMgyBU1hAeN9KIKdHAq2fJ/LYT/QBFNsRYnwK9AECQQD3SU2eZ/f/SnCRiBPc6zyciuux/LaIsh2nC5TtMsV1/xq6dpUF/X1om+nJ8VhcxuAqZT9qIi5wZ22XKd6fLhBDAkEAwky3ysSkyrfy86kOUzzDBqiZxDv34dCKHEEqSyqP+5KO2m3up/t1Kl/VAvgs1wB7QcKqpWQMhRYi+WU/bNRSAQJADv+kNJJryVEziLAvPDwMXhZS+2WvkJT1FXevXb+xmFmTvnGI0mcwnxKt2HDKAj6RxCCF+yL9nBW54OxKM29wzwJBAKFCvTQMe11IyNrUT/BjuNX47w5AW17PDyGeMDUMkU3R+MBvhylieX7+5LM/OTAE1UfiAnGclQuMMODe2IJBwgECQQCup25s+Ru0UjxY12cad5j21S47frzk7jOAnyxFrJmqcA97Xm8P86+wXXTEjJ3WQGiopSAh8vcm4BmA8I0oZd3s';
/**
 * @method decryptAccount()  解密账号
 * @param {String} account 账号
 * @param {String} password 密码
 * @returns {Object}
 */
export const decryptAccount = account => {
    const decrypt = new Encrypt();
    decrypt.setPrivateKey(privateKey);
    let user = decrypt.decryptLong(account);
    return user;
};

/**
 * @method decryptPwd()  解密账号
 * @param {String} account 账号
 * @param {String} password 密码
 * @returns {Object}
 */
export const decryptPwd = password => {
    const decrypt = new Encrypt();
    decrypt.setPrivateKey(privateKey);
    let pwd = decrypt.decryptLong(password);
    return pwd;
};

/**
 * @method encryption()  加密账号
 * @param {String} account 账号
 * @param {String} password 密码
 * @returns {Object}
 */
export const encryptionAccount = account => {
    const encryptor = new Encrypt();
    encryptor.setPublicKey(publicKey);
    let user = encryptor.encryptLong(account);
    return user;
};

/**
 * @method encryption()  加密密码
 * @param {String} password 密码
 * @returns {Object}
 */
export const encryptionPwd = password => {
    const encryptor = new Encrypt();
    encryptor.setPublicKey(publicKey);
    let pwd = encryptor.encryptLong(password);
    return pwd;
};
