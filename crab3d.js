// 3D Crab Model with Scroll-based Rotation
// Using global THREE from CDN

class Crab3D {
  constructor() {
    console.log('🦀 Initializing 3D Crab...');
    this.container = document.getElementById('crab3d-container');
    if (!this.container) {
      console.error('❌ Container not found: #crab3d-container');
      return;
    }
    console.log('✅ Container found');

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.crab = null;
    this.rotationSpeed = 0;
    this.targetRotation = 0;
    this.scrollY = 0;
    this.lastScrollY = 0;

    this.init();
    this.setupScrollListener();
    this.animate();
    console.log('🦀 3D Crab initialized');
  }

  init() {
    console.log('🦀 Setting up 3D scene...');
    
    if (typeof THREE === 'undefined') {
      console.error('❌ Three.js is not loaded!');
      return;
    }
    
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent background

    // Camera setup
    const width = this.container.clientWidth || 200;
    const height = this.container.clientHeight || 200;
    this.camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5);

    // Renderer setup
    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Ensure canvas is on top
      const canvas = this.renderer.domElement;
      canvas.style.position = 'relative';
      canvas.style.zIndex = '99999';
      canvas.style.pointerEvents = 'none';
      
      this.container.appendChild(canvas);
      console.log('✅ Renderer created and added to container');
      console.log('✅ Canvas z-index set to 99999');
    } catch (error) {
      console.error('❌ Error creating renderer:', error);
      return;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 5, 5);
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    this.scene.add(directionalLight2);

    // Create placeholder immediately so something is visible
    console.log('🦀 Creating temporary placeholder...');
    this.createPlaceholder();
    
    // Then try to load the actual model
    setTimeout(() => {
      this.loadModel();
    }, 100);

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  loadModel() {
    if (typeof THREE === 'undefined') {
      console.error('❌ Three.js not loaded');
      this.createPlaceholder();
      return;
    }
    
    // Check if GLTFLoader is available
    let LoaderClass;
    if (typeof GLTFLoader !== 'undefined') {
      LoaderClass = GLTFLoader;
      console.log('✅ GLTFLoader found');
    } else if (typeof THREE.GLTFLoader !== 'undefined') {
      LoaderClass = THREE.GLTFLoader;
      console.log('✅ THREE.GLTFLoader found');
    } else {
      console.warn('⚠️ GLTFLoader not found, using placeholder');
      this.createPlaceholder();
      return;
    }
    
    const loader = new LoaderClass();
    
    // Load the 3D crab model
    const modelPath = 'models/little_crab.glb';
    console.log('🦀 Loading 3D model from:', modelPath);
    console.log('🦀 Full URL would be:', window.location.origin + '/' + modelPath);
    
    // Set a timeout to show placeholder if model takes too long
    const loadTimeout = setTimeout(() => {
      console.warn('⚠️ Model loading taking too long, showing placeholder');
      if (!this.crab) {
        this.createPlaceholder();
      }
    }, 5000);
    
    loader.load(
      modelPath,
      (gltf) => {
        clearTimeout(loadTimeout);
        console.log('✅ 3D model loaded successfully!');
        
        // Remove placeholder if it exists
        if (this.crab && this.crab.parent) {
          this.scene.remove(this.crab);
        }
        
        this.crab = gltf.scene;
        
        // Scale and position the model
        const box = new THREE.Box3().setFromObject(this.crab);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        this.crab.scale.multiplyScalar(scale);
        
        this.crab.position.x = -center.x * scale;
        this.crab.position.y = -center.y * scale;
        this.crab.position.z = -center.z * scale;
        
        // Enable shadows if needed
        this.crab.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        this.scene.add(this.crab);
        console.log('✅ Model added to scene, placeholder removed');
      },
      (progress) => {
        // Loading progress
        if (progress.lengthComputable) {
          const percentComplete = (progress.loaded / progress.total) * 100;
          console.log('📊 Loading progress:', percentComplete.toFixed(2) + '%');
        } else {
          console.log('📊 Loading...', progress.loaded, 'bytes');
        }
      },
      (error) => {
        clearTimeout(loadTimeout);
        console.error('❌ Error loading 3D model:', error);
        console.error('❌ Error details:', error.message);
        console.log('📍 Model path attempted:', modelPath);
        console.log('📍 Current URL:', window.location.href);
        // Create a placeholder if model fails to load
        console.log('🦀 Creating placeholder crab...');
        this.createPlaceholder();
      }
    );
  }

  createPlaceholder() {
    console.log('🦀 Creating placeholder crab (model not loaded)');
    
    if (!this.scene) {
      console.error('❌ Scene not initialized, cannot create placeholder');
      return;
    }
    
    // Remove existing crab if any
    if (this.crab && this.crab.parent) {
      this.scene.remove(this.crab);
    }
    
    // Create a simple placeholder crab-like shape if model doesn't load
    const group = new THREE.Group();
    
    // Body (sphere) - larger and more visible
    const bodyGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6b35,
      roughness: 0.7,
      metalness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // Claws (boxes) - larger and more visible
    const clawGeometry = new THREE.BoxGeometry(0.5, 0.5, 1.0);
    const clawMaterial = new THREE.MeshStandardMaterial({ color: 0xff4500 });
    
    const leftClaw = new THREE.Mesh(clawGeometry, clawMaterial);
    leftClaw.position.set(-1.0, 0, 0);
    group.add(leftClaw);
    
    const rightClaw = new THREE.Mesh(clawGeometry, clawMaterial);
    rightClaw.position.set(1.0, 0, 0);
    group.add(rightClaw);
    
    // Legs (cylinders) - more visible
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b35 });
    
    for (let i = 0; i < 6; i++) {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      const angle = (i / 6) * Math.PI * 2;
      leg.position.set(
        Math.cos(angle) * 1.0,
        -0.5,
        Math.sin(angle) * 1.0
      );
      leg.rotation.x = Math.PI / 4;
      group.add(leg);
    }
    
    // Position the group
    group.position.set(0, 0, 0);
    
    this.crab = group;
    this.scene.add(this.crab);
    console.log('✅ Placeholder crab created and added to scene');
    console.log('✅ Scene children count:', this.scene.children.length);
  }

  setupScrollListener() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.scrollY = window.scrollY || window.pageYOffset;
          const scrollDelta = this.scrollY - this.lastScrollY;
          
          // Calculate rotation based on scroll direction
          this.targetRotation += scrollDelta * 0.01; // Adjust speed here
          
          this.lastScrollY = this.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    if (!this.renderer || !this.scene || !this.camera) {
      console.warn('⚠️ Cannot animate: renderer, scene, or camera missing');
      return;
    }
    
    if (this.crab) {
      // Smooth rotation interpolation
      this.rotationSpeed += (this.targetRotation - this.rotationSpeed) * 0.1;
      
      // Rotate around Y axis (vertical)
      this.crab.rotation.y = this.rotationSpeed;
      
      // Optional: Add a subtle floating animation
      this.crab.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    } else {
      // Even if no crab, keep rendering the scene (might have other objects)
      if (this.scene.children.length === 0) {
        console.warn('⚠️ Scene has no children, creating placeholder...');
        this.createPlaceholder();
      }
    }
    
    try {
      this.renderer.render(this.scene, this.camera);
    } catch (error) {
      console.error('❌ Render error:', error);
    }
  }

  onWindowResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

// Initialize when DOM and scripts are ready
function initCrab3D() {
  console.log('🔧 initCrab3D called');
  console.log('🔧 THREE available:', typeof THREE !== 'undefined');
  console.log('🔧 GLTFLoader available:', typeof GLTFLoader !== 'undefined');
  
  // Wait for Three.js and GLTFLoader to be available
  if (typeof THREE === 'undefined') {
    console.log('⏳ Waiting for Three.js to load...');
    setTimeout(initCrab3D, 100);
    return;
  }
  
  if (typeof GLTFLoader === 'undefined') {
    console.log('⏳ Waiting for GLTFLoader to load...');
    setTimeout(initCrab3D, 100);
    return;
  }
  
  console.log('✅ All dependencies loaded, initializing Crab3D...');
  try {
    const crab = new Crab3D();
    console.log('✅ Crab3D instance created:', crab);
  } catch (error) {
    console.error('❌ Error initializing 3D crab:', error);
    console.error('❌ Error stack:', error.stack);
  }
}

// Make initCrab3D available globally for the module script
window.initCrab3D = initCrab3D;
console.log('✅ initCrab3D function registered globally');

// Also try to initialize if scripts are already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded, waiting to initialize...');
    setTimeout(initCrab3D, 500);
  });
} else {
  console.log('📄 DOM already loaded, waiting to initialize...');
  setTimeout(initCrab3D, 500);
}

