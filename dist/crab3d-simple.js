// Simple 3D Crab - Standalone version
(function() {
  console.log('🦀 Starting 3D Crab initialization...');
  
  // Wait for Three.js
  function waitForThree(callback) {
    if (typeof THREE !== 'undefined') {
      callback();
    } else {
      console.log('⏳ Waiting for Three.js...');
      setTimeout(() => waitForThree(callback), 100);
    }
  }
  
  // Wait for GLTFLoader
  function waitForLoader(callback) {
    if (typeof GLTFLoader !== 'undefined') {
      callback();
    } else {
      console.log('⏳ Waiting for GLTFLoader...');
      setTimeout(() => waitForLoader(callback), 100);
    }
  }
  
  function initCrab() {
    const container = document.getElementById('crab3d-container');
    if (!container) {
      console.error('❌ Container not found!');
      return;
    }
    console.log('✅ Container found');
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = null;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, 200/200, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    console.log('✅ Renderer created');
    
    // Lighting
    const light1 = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
    light2.position.set(5, 5, 5);
    scene.add(light2);
    
    // Create placeholder crab immediately
    let crab = null;
    function createPlaceholder() {
      console.log('🦀 Creating placeholder crab...');
      const group = new THREE.Group();
      
      // Large visible body
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(1, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xff6b35 })
      );
      group.add(body);
      
      // Claws
      const claw1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.6, 1.2),
        new THREE.MeshStandardMaterial({ color: 0xff4500 })
      );
      claw1.position.set(-1.2, 0, 0);
      group.add(claw1);
      
      const claw2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.6, 1.2),
        new THREE.MeshStandardMaterial({ color: 0xff4500 })
      );
      claw2.position.set(1.2, 0, 0);
      group.add(claw2);
      
      // Legs
      for (let i = 0; i < 6; i++) {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8),
          new THREE.MeshStandardMaterial({ color: 0xff6b35 })
        );
        const angle = (i / 6) * Math.PI * 2;
        leg.position.set(Math.cos(angle) * 1.2, -0.6, Math.sin(angle) * 1.2);
        leg.rotation.x = Math.PI / 4;
        group.add(leg);
      }
      
      crab = group;
      scene.add(crab);
      console.log('✅ Placeholder crab created and added to scene');
    }
    
    // Create placeholder immediately
    createPlaceholder();
    
    // Try to load real model
    if (typeof GLTFLoader !== 'undefined') {
      console.log('🦀 Attempting to load model...');
      const loader = new GLTFLoader();
      loader.load(
        'models/little_crab.glb',
        (gltf) => {
          console.log('✅ Model loaded!');
          if (crab) scene.remove(crab);
          crab = gltf.scene;
          const box = new THREE.Box3().setFromObject(crab);
          const size = box.getSize(new THREE.Vector3());
          const scale = 2 / Math.max(size.x, size.y, size.z);
          crab.scale.multiplyScalar(scale);
          const center = box.getCenter(new THREE.Vector3());
          crab.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
          scene.add(crab);
        },
        undefined,
        (error) => {
          console.error('❌ Model load error:', error);
          console.log('🦀 Using placeholder instead');
        }
      );
    }
    
    // Animation
    let rotation = 0;
    function animate() {
      requestAnimationFrame(animate);
      if (crab) {
        rotation += 0.01;
        crab.rotation.y = rotation;
        crab.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      }
      renderer.render(scene, camera);
    }
    animate();
    console.log('✅ Animation started');
  }
  
  // Initialize when ready
  waitForThree(() => {
    console.log('✅ Three.js loaded');
    waitForLoader(() => {
      console.log('✅ GLTFLoader loaded');
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCrab);
      } else {
        initCrab();
      }
    });
  });
})();

