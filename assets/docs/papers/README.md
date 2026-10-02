# Protected submission manuscripts

These manuscripts are published as encrypted `.pdf.enc` files. The reading
pages use the visitor's password to decrypt the selected manuscript in memory,
then display it with PDF.js and offer a temporary Blob URL for downloading.
The website does not store the password or a decryption key.

The `PPR1` binary format contains:

- Bytes 0–3: ASCII `PPR1`.
- Bytes 4–19: a random 16-byte PBKDF2 salt.
- Bytes 20–31: a random 12-byte AES-GCM IV.
- Bytes 32–47: the 16-byte AES-GCM authentication tag.
- Bytes 48 onward: ciphertext.

Key derivation uses PBKDF2-HMAC-SHA256 with 600,000 iterations and a 256-bit
AES-GCM key. Each file has its own random salt and IV. Do not commit plaintext
submission PDFs, passwords, or derived keys to the repository.

Removing a previously published plaintext file from the current branch does
not remove that file from earlier Git commits or existing downloaded copies.
