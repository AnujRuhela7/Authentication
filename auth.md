### Level 1 Authentication

## Using username & Password

# Just checking the username in the db, and if it exist check the password

# If the password matches, redirect tp secrets page, else if it doesn't redirect to login page, stating that "Password is incorrect"

### Level 2 Authentication

# Encrypt the password

# Caesar Cipher is one of the earliest method to encryot a message

## Ceaser Cipher is a very weak method for encryption

# Just shift the letters or number by some n position forward or backward

# mongoose-encryption package is used here to encrypt the password

# This package can be used to encrypt and auhenticate

# it uses AES-256-CBC encryption algorithm

# userSchema.plugin(encrypt, { secret: secret, encryptrdFields: ["password"] });

# with the encryptedFields we can specify the custom fields which we only want to encrypt

# the documents are encrypted on saving

# and decrypted when we call find

## Level 3 Hashing
