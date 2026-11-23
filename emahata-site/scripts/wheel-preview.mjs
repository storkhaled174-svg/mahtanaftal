import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
// Bundled with Three.js 0.186.1; no remote scripts or product images required.
const stage = document.getElementById('wheelStage');
const fallback = document.getElementById('wheelFallback');
try {
    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    stage.appendChild(renderer.domElement);
    fallback.style.display = 'none';
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture;
    room.dispose(); pmrem.dispose();
    const floor = new Reflector(new THREE.PlaneGeometry(8, 8), {
        textureWidth: 512, textureHeight: 512, color: 0x293342, clipBias: .003
    });
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -.365;
    scene.add(floor);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(8,8), new THREE.ShadowMaterial({opacity:.45}));
    shadow.rotation.x=-Math.PI/2;shadow.position.y=-.364;shadow.receiveShadow=true;scene.add(shadow);
    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 20);
    camera.position.set(0.82, 0.32, 1.75);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xe9f3ff, 0x222b3b, 1));
    for (const [x,y,z,intensity] of [[2,3,4,5],[-3,1,0,4],[0,0,-3,3]]) {
        const light = new THREE.DirectionalLight(0xffffff, intensity);
        light.position.set(x,y,z);
        if(x===2){light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-1;light.shadow.camera.right=1;light.shadow.camera.top=1;light.shadow.camera.bottom=-1;light.shadow.bias=-.0002;}
        scene.add(light);
    }
    const wheel = new THREE.Group(); scene.add(wheel);
    const grainCanvas=document.createElement('canvas');grainCanvas.width=grainCanvas.height=256;
    const context=grainCanvas.getContext('2d');
    const pixels=context.createImageData(256,256);
    let seed=17;
    for(let i=0;i<pixels.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const v=95+(seed%65);pixels.data.set([v,v,v,255],i);}
    context.putImageData(pixels,0,0);
    const grain=new THREE.CanvasTexture(grainCanvas);grain.wrapS=grain.wrapT=THREE.RepeatWrapping;grain.repeat.set(14,5);
    const rubber = new THREE.MeshStandardMaterial({color:0x161719,roughness:0.8,metalness:0,bumpMap:grain,bumpScale:.00065});
    const tread = new THREE.MeshStandardMaterial({color:0x202124,roughness:0.82,bumpMap:grain,bumpScale:.0005});
    const metal = new THREE.MeshPhysicalMaterial({color:0xd4dae2,metalness:1,roughness:0.19,clearcoat:1,clearcoatRoughness:.16});
    const brake = new THREE.MeshStandardMaterial({color:0x737780,metalness:.9,roughness:.48});
    const dark = new THREE.MeshStandardMaterial({color:0x30343b,metalness:0.6,roughness:0.65});
    const add = (geometry,material,x=0,y=0,z=0) => {
        const mesh = new THREE.Mesh(geometry,material); mesh.position.set(x,y,z); mesh.castShadow=true;mesh.receiveShadow=true;wheel.add(mesh); return mesh;
    };
    function rebuild({width,aspect,rim}) {
        while (wheel.children.length) {const mesh=wheel.children[0];wheel.remove(mesh);mesh.geometry.dispose();if(mesh.isInstancedMesh)mesh.dispose();}
        const inner = rim * .0254 / 2, wall = width * aspect / 100000;
        const outer = inner + wall, depth = width / 1000;
        // Lathed closed tire cross-section: sidewalls, rounded shoulders and tread.
        const points = [
            [inner,-depth*.44],[inner+wall*.12,-depth*.52],[outer-wall*.22,-depth*.52],
            [outer-wall*.04,-depth*.42],[outer,-depth*.25],[outer,depth*.25],
            [outer-wall*.04,depth*.42],[outer-wall*.22,depth*.52],
            [inner+wall*.12,depth*.52],[inner,depth*.44],[inner,-depth*.44]
        ].map(([r,z])=>new THREE.Vector2(r,z));
        const tire=add(new THREE.LatheGeometry(points,192),rubber);tire.rotation.x=Math.PI/2;
        // Individual staggered tread blocks; local Z points radially outward.
        const blockGeometry=new RoundedBoxGeometry(outer*.066,depth*.165,.006,2,.001);
        const blocks=new THREE.InstancedMesh(blockGeometry,tread,5*88);
        blocks.castShadow=true;blocks.receiveShadow=true;
        const transform=new THREE.Object3D();let index=0;
        for(let row=0;row<5;row++) for(let i=0;i<88;i++) {
            const angle=(i+(row%2)*.5)/88*Math.PI*2;
            transform.position.set(Math.sin(angle)*(outer+.0015),Math.cos(angle)*(outer+.0015),(row-2)*depth*.19);
            transform.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(Math.sin(angle),Math.cos(angle),0));
            transform.rotateZ(row%2 ? .19 : -.19);transform.updateMatrix();
            blocks.setMatrixAt(index++,transform.matrix);
        }
        wheel.add(blocks);
        // Fine molded circumferential rings on both sidewalls.
        for(const side of [-1,1]) for(const fraction of [.18,.23,.72,.77]) {
            add(new THREE.TorusGeometry(inner+wall*fraction,.0011,6,160),rubber,0,0,side*depth*.521);
        }
        const barrel=add(new THREE.CylinderGeometry(inner*.97,inner*.97,depth*.8,64,1,true),dark);barrel.rotation.x=Math.PI/2;
        for(const z of [-depth*.44,depth*.44]) {
            add(new THREE.TorusGeometry(inner*.96,.008,12,96),metal,0,0,z);
            for(let i=0;i<5;i++) {
                const angle=i*Math.PI*2/5;
                const spoke=add(new RoundedBoxGeometry(inner*.12,inner*.78,.032,3,.006),metal,
                    Math.sin(angle)*inner*.48,Math.cos(angle)*inner*.48,z);
                spoke.rotation.z=-angle;
                const twin=add(new RoundedBoxGeometry(inner*.06,inner*.76,.025,2,.004),metal,
                    Math.sin(angle+.13)*inner*.49,Math.cos(angle+.13)*inner*.49,z-.008);
                twin.rotation.z=-angle-.13;
            }
            const hub=add(new THREE.CylinderGeometry(inner*.22,inner*.22,.032,32),metal,0,0,z);hub.rotation.x=Math.PI/2;
            for(let i=0;i<5;i++) {const a=i*Math.PI*2/5;add(new THREE.SphereGeometry(.007,8,8),dark,Math.sin(a)*inner*.14,Math.cos(a)*inner*.14,z+.019);}
        }
        const disc=add(new THREE.CylinderGeometry(inner*.8,inner*.8,.009,96),brake,0,0,depth*.22);
        disc.rotation.x=Math.PI/2;
        for(let i=0;i<32;i++){const a=i*Math.PI*2/32;add(new THREE.CircleGeometry(.0038,8),dark,Math.sin(a)*inner*.68,Math.cos(a)*inner*.68,depth*.22+.005);}
        const scale=.36/outer;wheel.scale.setScalar(scale);
        renderer.render(scene,camera);
    }
    function current() {
        return {width:+document.getElementById('tireWidth').value,aspect:+document.getElementById('tireAspect').value,rim:parseInt(document.getElementById('tireRim').value,10)};
    }
    const resize=()=>{const {width,height}=stage.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();renderer.render(scene,camera);};
    new ResizeObserver(resize).observe(stage);
    document.addEventListener('tire-size-change',event=>rebuild(event.detail));
    let previous=null;
    stage.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'){previous=e.clientX;stage.setPointerCapture(e.pointerId);}});
    stage.addEventListener('pointermove',e=>{if(previous!==null){wheel.rotation.y+=(e.clientX-previous)*.01;previous=e.clientX;renderer.render(scene,camera);}});
    stage.addEventListener('pointerup',()=>{previous=null;});
    stage.addEventListener('pointercancel',()=>{previous=null;});
    renderer.domElement.addEventListener('webglcontextlost',()=>{fallback.style.display='block';renderer.domElement.style.display='none';});
    rebuild(current());resize();
} catch {
    // Accessible static illustration remains available when WebGL is unavailable.
    stage.querySelector('canvas')?.remove();
    fallback.style.display = 'block';
}
