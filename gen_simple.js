
const bcrypt = require('bcryptjs');
async function run() {
    try {
        const hash = await bcrypt.hash('123456', 10);
        console.log('HASH_RESULT:' + hash);
    } catch(e) { console.error(e); }
}
run();
