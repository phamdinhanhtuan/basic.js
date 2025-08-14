   function findPrimesInRange(start, end) {
       const isPrime = (num) => {
           if (num <= 1) return false;
           for (let i = 2; i <= Math.sqrt(num); i++) {
               if (num % i === 0) return false;
           }
           return true;
       };

       const primes = [];
       for (let i = start; i <= end; i++) {
           if (isPrime(i)) {
               primes.push(i);
           }
       }
       return primes;
   }
