const FullName = "Bin";
const age = 19;
const isStudent = "True";
const today = new Date();
const currentYear = today.getFullYear();
console.log(`
Ten:${FullName},
Nam:${age},
SV:${isStudent}`);
const caculateBirth = currentYear - age;
console.log("Nam hien tai:", currentYear);
console.log("Nam sinh:", caculateBirth);
