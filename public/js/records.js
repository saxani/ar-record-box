var record;
var numOfAlbums;
var nextSwipedAlbumUp = null;
var nextSwipedAlbumDown;
var album;
var uriKeys;

var recordGroup;
var boxSize;
var boxOffset = 2.3;
var sortOffset = 1.8;

var swipingRecord;
var swipingOriginal;

//Pretty ugly nested promises, but it works!
var addRecords = function(size){
  return new Promise(function(resolve, reject) {
    boxSize = size;
    getToken().then(
      function(token){
        getData(token).then(
          function(data){
            populateAlbums(data).then(
              function(records){
                resolve(records);
              }
            );
          }
        );
      }
    );
  });
};

function getToken(){
  return new Promise(function(resolve, reject) {
    var access_token;
    $.ajax({
      url: '/keep_token'
    }).done(function(data) {
      access_token = data.keep_token;
      resolve(access_token);
    });
  });

}

function getData(token) {
  return new Promise(function(resolve, reject) {
    $.ajax({
        url: 'https://api.spotify.com/v1/me/albums',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        success: function(response) {
          resolve(response);
        }
    });
  });
}

function populateAlbums(albumData){
  return new Promise(function(resolve, reject) {
    numOfAlbums = albumData.items.length;
    record = new Array(numOfAlbums);
    nextSwipedAlbumDown = numOfAlbums - 1;
    album = numOfAlbums - 1;

    var recordGeometry = new THREE.BoxGeometry(boxSize/1.1, boxSize/1.1, boxSize/40);

    var recordTexture = new Array(numOfAlbums);
    var recordMaterial = new Array(numOfAlbums);
    var recordMesh = new Array(numOfAlbums);
    var albumCoverKeys = new Array(numOfAlbums);
    uriKeys = new Array(numOfAlbums);
    recordGroup = new THREE.Group();



    for (var i = 0; i < numOfAlbums; i++) {

      //Get a random grey color to add depth to top of records
      var randColor = Math.floor(Math.random() * 40) + 200;
      var coolColor = new THREE.Color("rgb(" + randColor + ", " + randColor + ", " + randColor + ")");

      uriKeys[i] = albumData.items[i].album.uri;
      albumCoverKeys[i] = albumData.items[i].album.images[0].url;
      recordTexture[i] = new THREE.TextureLoader().load(albumCoverKeys[i]);
      recordMaterial[i] = [
        new THREE.MeshBasicMaterial({ color: 'white'}),
        new THREE.MeshBasicMaterial({ color: 'white' }),
        new THREE.MeshBasicMaterial({ color: coolColor }),
        new THREE.MeshBasicMaterial({ color: 'white' }),
        new THREE.MeshBasicMaterial({ map: recordTexture[i] }),
        new THREE.MeshBasicMaterial({ map: recordTexture[i] })
      ];
      record[i] = new THREE.Object3D();
      record[i].position.z = -boxSize/boxOffset;
      recordMesh[i] = new THREE.Mesh(recordGeometry, recordMaterial[i]);
      record[i].add(recordMesh[i]);
      recordGroup.add(record[i]);
      targetList.push(record[i]);

      boxOffset += 0.2;
    }

    resolve(recordGroup);
  });
}

function selectAlbum( event ) {
  var selectedObject;
  var raycaster = new THREE.Raycaster();
  var touch = new THREE.Vector2();

  touch.x = ( event.changedTouches[0].pageX / window.innerWidth ) * 2 - 1;
  touch.y = - ( event.changedTouches[0].pageY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera(touch, camera);
  var intersects = raycaster.intersectObjects(targetList, true); //array

  if (intersects.length > 0) {
    selectedObject = intersects[0];

    document.getElementById('spotify-embed').innerHTML =
      '<iframe id="spotify-embed-iframe" src="https://open.spotify.com/embed?uri=' + uriKeys[album] +'" width="300" height="480" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
    document.getElementById('spotify-embed').style.visibility = 'visible';
    document.getElementById('info').innerHTML = 'Close Player';
    document.getElementById('info').addEventListener('touchstart', resetScreen, false);
  }
}

function resetScreen(){
  document.getElementById('spotify-embed').style.visibility = 'hidden';
  document.getElementById('spotify-embed').innerHTML = '';
  document.getElementById('info').innerHTML = 'Swipe up and down through albums. Tap to listen.';
  document.getElementById('info').removeEventListener('click', resetScreen, false);
}

function nextAlbum () {
  if(nextSwipedAlbumDown) {
    swipingRecord = record[nextSwipedAlbumDown];
    swipingOriginal = swipingRecord.position.z;
    nextSwipedAlbumUp = nextSwipedAlbumDown;
    animateRecordDown(swipingRecord, swipingOriginal);
    nextSwipedAlbumDown --;
    album --;
  }

  if(nextSwipedAlbumDown < 0) {
    album = -1;
    record[0].position.z += BOX_SIZE / sortOffset;
    nextSwipedAlbumDown = null;
    nextSwipedAlbumUp = 0;
  }
}

function previousAlbum () {
  if(nextSwipedAlbumUp) {
    swipingRecord = record[nextSwipedAlbumUp];
    swipingOriginal = swipingRecord.position.z;
    nextSwipedAlbumDown = nextSwipedAlbumUp;
    animateRecordUp(swipingRecord, swipingOriginal);
    nextSwipedAlbumUp ++;
    album ++;
  }


  if(nextSwipedAlbumUp > (numOfAlbums - 1)) {
    album = numOfAlbums - 1;
    nextSwipedAlbumUp = null;
    nextSwipedAlbumDown = numOfAlbums - 1;
  }
}

function animateRecordDown(swiping, original){
  swiping.position.z += 0.04;

  if(swiping.position.z < (original + (BOX_SIZE / sortOffset))){
    requestAnimationFrame(function(){
      animateRecordDown(swiping, original);
    });
  }
}

function animateRecordUp(swiping, original){
  swiping.position.z -= 0.04;

  if(swiping.position.z > (original - (BOX_SIZE / sortOffset))){
    requestAnimationFrame(function(){
      animateRecordUp(swiping, original);
    });
  }
}
