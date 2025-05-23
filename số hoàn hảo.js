   function findPerfectNumbers(limit) {
       const perfectNumbers = [];
       for (let num = 1; num <= limit; num++) {
           let sum = 0;
           for (let i = 1; i < num; i++) {
               if (num % i === 0) {
                   sum += i;
               }
           }
           if (sum === num) {
               perfectNumbers.push(num);
           }
       }
       return perfectNumbers;
   }
