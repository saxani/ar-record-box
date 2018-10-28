//Would like to get rid of this here but easier for moving records

var numOfAlbums = 5;
var record = new Array(numOfAlbums);

var nextSwipedAlbumUp = null;
var nextSwipedAlbumDown = numOfAlbums - 1;
var album = numOfAlbums - 1;
var uriKeys;

function addRecords(boxSize) {

  var recordGeometry = new THREE.BoxGeometry(boxSize/1.1, boxSize/1.1, boxSize/40);


  var recordTexture = new Array(numOfAlbums);
  var recordMaterial = new Array(numOfAlbums);
  var recordMesh = new Array(numOfAlbums);
  var boxOffset = 2.3;
  var albumCoverKeys = ['graceland', 'born', 'rumours', 'abbey', 'london'];
  uriKeys = ['spotify:album:6WgGWYw6XXQyLTsWt7tXky', 'spotify:album:0PMasrHdpaoIRuHuhHp72O', 'spotify:album:0BwWUstDMUbgq2NYONRqlu', 'spotify:album:0ETFjACtuP2ADo6LFhL6HN', 'spotify:album:6FCzvataOZh68j8OKzOt9a'];
  recordGroup = new THREE.Group();

  for (var i = 0; i < numOfAlbums; i++) {

    recordTexture[i] = new THREE.TextureLoader().load("./assets/" + albumCoverKeys[i] + "_cover.jpg");
    recordMaterial[i] = new THREE.MeshPhongMaterial({ map: recordTexture[i]});
    record[i] = new THREE.Object3D();
    record[i].position.z = -boxSize/boxOffset;
    recordMesh[i] = new THREE.Mesh(recordGeometry, recordMaterial[i]);
    record[i].add(recordMesh[i]);
    recordGroup.add(record[i]);
    targetList.push(record[i]);

    boxOffset += 0.2;
  }


  return recordGroup;

}

    function selectAlbum( event ) {

        console.log('looking for a hit');
        var selectedObject;
        var raycaster = new THREE.Raycaster();
        var touch = new THREE.Vector2();

        touch.x = ( event.changedTouches[0].pageX / window.innerWidth ) * 2 - 1;
        touch.y = - ( event.changedTouches[0].pageY / window.innerHeight ) * 2 + 1;

        console.log(touch.x, touch.y);
        raycaster.setFromCamera(touch, camera);
        var intersects = raycaster.intersectObjects(targetList, true); //array

        if (intersects.length > 0) {
          console.log('hitttt');
          console.log(album);
            selectedObject = intersects[0];

            document.getElementById('spotify-embed').innerHTML =
        '<iframe id="spotify-embed-iframe" src="https://open.spotify.com/embed?uri=' + uriKeys[album] +'" width="300" height="480" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
            document.getElementById('spotify-embed').style.visibility = 'visible';
            document.getElementById('info').innerHTML = 'Close Player';
            document.getElementById('info').addEventListener('touchstart', resetScreen, false);
        }
    }

    function resetScreen(){
      console.log('reset');
      document.getElementById('spotify-embed').style.visibility = 'hidden';
      document.getElementById('spotify-embed').innerHTML = '';
      document.getElementById('info').innerHTML = 'Swipe up and down through albums. Tap to listen.';
      document.getElementById('info').removeEventListener('click', resetScreen, false);
    }

    function nextAlbum () {
        if(nextSwipedAlbumDown) {
          nextSwipedAlbumUp = nextSwipedAlbumDown;
          record[nextSwipedAlbumDown].position.z += BOX_SIZE / 1.3;
          nextSwipedAlbumDown --;
          album --;
        }


        if(nextSwipedAlbumDown < 0) {
          album = -1;
          record[0].position.z += BOX_SIZE / 1.3;
          nextSwipedAlbumDown = null;
          nextSwipedAlbumUp = 0;
        }
    }

    function previousAlbum () {
        if(nextSwipedAlbumUp) {
          nextSwipedAlbumDown = nextSwipedAlbumUp;
          record[nextSwipedAlbumUp].position.z -= BOX_SIZE / 1.3;
          nextSwipedAlbumUp ++;
          album ++;
        }


        if(nextSwipedAlbumUp > (numOfAlbums - 1)) {
          album = numOfAlbums - 1;
          nextSwipedAlbumUp = null;
          nextSwipedAlbumDown = numOfAlbums - 1;
        }
    }
