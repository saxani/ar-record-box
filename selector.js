function swipedetect(){

  console.log('looking of for swipes');

   var touchsurface = document,
   swipedir,
   startY,
   distY,
   threshold = 50, //required min distance traveled to be considered swipe
   restraint = 100, // maximum distance allowed at the same time in perpendicular direction
   allowedTime = 300, // maximum time allowed to travel that distance
   elapsedTime,
   startTime;


   function mouseStarted(e) {
       startY = e.clientY;
   }

   function mouseEnded(e) {
       var endY  = e.clientY;

       if (endY > startY) {
           console.log('swipe down');
           nextAlbum();
       } else if (endY < startY) {
           console.log('swipe up');
           previousAlbum();
       } else {
           console.log('click');
           selectAlbum(e);
       }
   }

   touchsurface.addEventListener('mousedown', mouseStarted);
   touchsurface.addEventListener('mouseup', mouseEnded);

   touchsurface.addEventListener('touchstart', function(e){
       var touchobj = e.changedTouches[0]
       swipedir = 'none'
       dist = 0
       startY = touchobj.pageY
       startTime = new Date().getTime() // record time when finger first makes contact with surface
       e.preventDefault()
   }, false);

   touchsurface.addEventListener('touchmove', function(e){
       e.preventDefault() // prevent scrolling when inside DIV
   }, false);

   touchsurface.addEventListener('touchend', function(e){
       var touchobj = e.changedTouches[0];// get horizontal dist traveled by finger while in contact with surface
       distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
       elapsedTime = new Date().getTime() - startTime // get time elapsed
       console.log(distY);
       if (elapsedTime <= allowedTime){ // first condition for awipe met
           if (Math.abs(distY) >= threshold){ // 2nd condition for vertical swipe met
             console.log('in here');
               swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
           }
       }
       if(swipedir == 'up') {
          console.log('up');
           previousAlbum();
       } else if (swipedir == 'down') {
           console.log('down');
           nextAlbum();
       } else {
          console.log('tap');
           selectAlbum(e);
       }

       e.preventDefault()
   }, false);
}
