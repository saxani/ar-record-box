//Would like to get rid of this here but easier for moving records

var nextSwipedAlbumUp;
var nextSwipedAlbumDown;
var record1, record2;

function addRecords(boxSize) {

  var recordGeometry = new THREE.BoxGeometry(boxSize/1.1, boxSize/1.1, boxSize/40);


  // Create an album - Graceland
  var record1Texture = new THREE.TextureLoader().load("./assets/graceland_cover.jpg");
  var record1Material = new THREE.MeshPhongMaterial({ map: record1Texture });
  record1 = new THREE.Object3D();
  record1.position.z = -boxSize/2.3;
  var record1Mesh = new THREE.Mesh(recordGeometry, record1Material);
  record1.add(record1Mesh);

  //Create an album - Rumors
  var record2Texture = new THREE.TextureLoader().load("./assets/born_cover.jpg");
  var record2Material = new THREE.MeshPhongMaterial({ map: record2Texture });
  record2 = new THREE.Object3D();
  record2.position.z = -boxSize/2.5;
  var record2Mesh = new THREE.Mesh(recordGeometry, record2Material);
  record2.add(record2Mesh);


  nextSwipedAlbumUp = null;
  nextSwipedAlbumDown = record2;

  recordGroup = new THREE.Group();
  recordGroup.add(record1, record2);

  return recordGroup;

  targetList.push(record1);
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
            console.log(selectedObject);

            if(selectedObject.object.parent.uuid == paulSimon) {
                alert('load paul simon');
            }
        }
    }

    function nextAlbum () {
        nextSwipedAlbumDown.position.z += BOX_SIZE / 1.2;
        nextSwipedAlbumDown = record1;
    }

    function previousAlbum () {
        nextSwipedAlbumUp.position.z =- BOX_SIZE / 1.2;
    }
