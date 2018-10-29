function swipedetect(){

   var touchsurface = document,
   swipedir,
   startY,
   distY,
   threshold = 50, //required min distance traveled to be considered swipe
   restraint = 100, // maximum distance allowed at the same time in perpendicular direction
   allowedTime = 300, // maximum time allowed to travel that distance
   elapsedTime,
   startTime;

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
       if (elapsedTime <= allowedTime){ // first condition for awipe met
           if (Math.abs(distY) >= threshold){ // 2nd condition for vertical swipe met
               swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
           }
       }
       if(swipedir == 'up') {
           previousAlbum();
       } else if (swipedir == 'down') {
           nextAlbum();
       } else {
           selectAlbum(e);
       }

       e.preventDefault()
   }, false);
}
