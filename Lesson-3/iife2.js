(function() {
    var count = 5;
    
    function countdown() {
      if (count >= 1) {
        console.log(count);
        count--;
      } else {
        clearInterval(interval);
      }
    }
    
    var interval = setInterval(countdown, 1000);
  })();