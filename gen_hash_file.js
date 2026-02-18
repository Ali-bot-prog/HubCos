
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function generateHash() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    fs.writeFileSync('hash_output.txt', hash);
    console.log('Hash written to file');
}

generateHash();
