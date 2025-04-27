import bcrypt from "bcryptjs";

const plainPassword = "g123123123g";
let storedHash;

bcrypt.hash(plainPassword, 10)
.then((hash) => {
    storedHash = hash;
    console.log("Hash generated:", hash);
})
  .catch((error) => {
    console.error("Error hashing:", error.message);
});