import bcrypt from 'bcryptjs';

async function main() {
  const hash = "$2b$10$HfqO.vSwRVtMO2aDGEsF8elGuAVOrzF.0Pdf0Cy1vUyaHAgxWIQfy";
  const pass = "123456";
  const isValid = await bcrypt.compare(pass, hash);
  console.log(`Password valid: ${isValid}`);
}

main();
