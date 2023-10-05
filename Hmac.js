import crypto from "crypto";

class Hmac {
  static createRandomKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  static createHmac(key, move) {
    return crypto.createHmac('sha256', key).update(move).digest('hex');
  }
}

export default Hmac;
