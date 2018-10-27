function boxSetup (boxSize) {
        var boxGroup;

        var side1, side2, side3, side4, side5;
        var side = new THREE.BoxGeometry(boxSize/20, boxSize, boxSize);
        var bottom = new THREE.BoxGeometry(boxSize, boxSize/20, boxSize);
        var back = new THREE.BoxGeometry(boxSize, boxSize, boxSize/20);

        // Create a mesh for the woodBox
        var woodBoxTexture = new THREE.TextureLoader().load("./assets/wood-surface.jpg");
        var woodBoxMaterial = new THREE.MeshPhongMaterial({ map: woodBoxTexture, shininess: 0 });

        // Create left side for the woodBox.
        side1 = new THREE.Object3D();
        side1.position.x = -boxSize/2.1;
        var woodBoxMesh = new THREE.Mesh(side, woodBoxMaterial);
        side1.add(woodBoxMesh);

        // Create right side for the woodBox.
        side2 = new THREE.Object3D();
        side2.position.x = boxSize/2.1;
        var woodBoxMesh = new THREE.Mesh(side, woodBoxMaterial);
        side2.add(woodBoxMesh);

        // Create bottom for the woodBox.
        side3 = new THREE.Object3D();
        side3.position.y = -boxSize/2.1;
        var woodBoxMesh = new THREE.Mesh(bottom, woodBoxMaterial);
        side3.add(woodBoxMesh);

        // Create back for the woodBox.
        side4 = new THREE.Object3D();
        side4.position.z = -boxSize/2.1;
        var woodBoxMesh = new THREE.Mesh(back, woodBoxMaterial);
        side4.add(woodBoxMesh);

        // Create front for the woodBox.
        side5 = new THREE.Object3D();
        side5.position.z = boxSize/2.1;
        var woodBoxMesh = new THREE.Mesh(back, woodBoxMaterial);
        side5.add(woodBoxMesh);

        boxGroup = new THREE.Group();
        boxGroup.add(side1, side2, side3, side4, side5);
        boxGroup.position.set(10000, 10000, 10000);
        scene.add(boxGroup);

        return boxGroup;
    }
