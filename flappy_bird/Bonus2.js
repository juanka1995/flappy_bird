class Bonus2 extends THREE.Object3D {
  constructor(mesh) {
    super();
    this.mesh = mesh.clone();
    this.add(this.mesh);
  }

  changeMesh(new_mesh){
    this.remove(this.mesh);
    this.mesh = mesh.clone();
    this.add(this.mesh);
  }

}

