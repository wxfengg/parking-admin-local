import JSEncrypt from 'jsencrypt'

/**
 * 统一加密明文密码方法
 * @param password 明文密码
 * @returns 返回加密后的密码
 */
export function encryptPassword(password: string) {
  const publicKey: string
    = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqHS2fdh14LGZOrmo+Iv8xnc8wexAgsWvzOxYDR7bKhJiAS2W0rEyLN/PInMlzsdE83Zl67LqdRpSui+Xmefc/0Bjm7GcWzF4pGVDnVxfuttqgnzRdaXh2XVk6CSAEBNsbTPQhHONHpNj3cH/O9jWYl2QTZdUxYXkuFI6H9isyPmzZmHmfD9ere/SizRf2k3RPG853qz2qV4SX84XSnaMSJVJYSQ1uB4A/k+itVr8pQkXgkvKbXdZSrmlPgUUxv/NvuTbFWrWe2beu3sNUmPQh3E0/iG7sz/9c2Vhqt5UbRbwxBOooyBUTcwWOO/eJYPWD1M7Ap4W9MUERuVigDyEMwIDAQAB'
  const encryptor = new JSEncrypt()
  const pemKey = `-----BEGIN PUBLIC KEY-----\n${publicKey.match(/.{1,64}/g)?.join('\n')}\n-----END PUBLIC KEY-----`
  encryptor.setPublicKey(pemKey)
  const encryptedPwd = encryptor.encrypt(password)
  if (!encryptedPwd) {
    throw new Error('密码加密失败')
  }
  return encryptedPwd
}
