const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
const check1 = bcrypt.compareSync(myPlaintextPassword, hash); // true
const check2 = bcrypt.compareSync(someOtherPlaintextPassword, hash); // false

console.log(check1);
console.log(check2);