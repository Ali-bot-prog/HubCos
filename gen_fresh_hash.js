
const fs = require('fs');

async function run() {
    const hash = await bcrypt.hash('123456', 10);
    fs.writeFileSync('fresh_hash.txt', hash);
    console.log('Done');
}
run();
