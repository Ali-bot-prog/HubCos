
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function run() {
    try {
        const hash = await bcrypt.hash('123456', 10);
        fs.writeFileSync('final_hash.txt', hash);
        console.log('SUCCESS');
    } catch (e) {
        fs.writeFileSync('error.txt', e.toString());
        console.log('ERROR');
    }
}
run();
