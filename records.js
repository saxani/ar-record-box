//Would like to get rid of this here but easier for moving records

var numOfAlbums = 5;
var record = new Array(numOfAlbums);

var nextSwipedAlbumUp = null;
var nextSwipedAlbumDown = numOfAlbums - 1;

function addRecords(boxSize) {

  var recordGeometry = new THREE.BoxGeometry(boxSize/1.1, boxSize/1.1, boxSize/40);


  var recordTexture = new Array(numOfAlbums);
  var recordMaterial = new Array(numOfAlbums);
  var recordMesh = new Array(numOfAlbums);
  var boxOffset = 2.3;
  var albumCoverKeys = ['graceland', 'born', 'rumours', 'abbey', 'london'];
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

    console.log(record[i]);
  }


  return recordGroup;


  // paulSimon = record1.uuid;
  // console.log(paulSimon);

}

    function selectAlbum( event ) {

        var selectedObject;
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(targetList, true); //array

        if (intersects.length > 0) {
            selectedObject = intersects[0];
            console.log(intersects.length);
        }
    }

    function nextAlbum () {
        if(nextSwipedAlbumDown) {
          nextSwipedAlbumUp = nextSwipedAlbumDown;
          record[nextSwipedAlbumDown].position.z += BOX_SIZE / 1.3;
        }

        nextSwipedAlbumDown --;

        if(nextSwipedAlbumDown < 0) {
          record[0].position.z += BOX_SIZE / 1.3;
          nextSwipedAlbumDown = null;
          nextSwipedAlbumUp = 0;
        }
    }

    function previousAlbum () {
        if(nextSwipedAlbumUp) {
          nextSwipedAlbumDown = nextSwipedAlbumUp;
          record[nextSwipedAlbumUp].position.z -= BOX_SIZE / 1.3;
        }

        nextSwipedAlbumUp ++;

        if(nextSwipedAlbumUp > (numOfAlbums - 1)) {
          nextSwipedAlbumUp = null;
          nextSwipedAlbumDown = numOfAlbums - 1;
        }
    }
