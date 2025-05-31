   function findPerfectSquares(start, end) {
       const perfectSquares = [];
       for (let i = Math.ceil(Math.sqrt(start)); i * i <= end; i++) {
           perfectSquares.push(i * i);
       }
       return perfectSquares;
   }
