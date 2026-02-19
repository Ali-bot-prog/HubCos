
const bcrypt = require('bcryptjs');
const fs = require('fs');

async function check() {
    const hash = "$2b$10$0iqpP8vFJiRjfZeQ76RZOe7zOYN2EVGLu/nniqZetTNk7kKH2hZI2";
    const pass = "123456";
    const match = await bcrypt.compare(pass, hash);
    console.log("MATCH_RESULT: " + match);
}

check();
