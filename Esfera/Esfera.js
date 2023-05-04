        var WIDTH = window.innerWidth;
        var HEIGHT = window.innerHeight;
        
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(100,WIDTH / HEIGHT,0.1,1000);
        

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(WIDTH, HEIGHT);
        renderer.setClearColor(0xDDDDDD, 1);
        document.body.appendChild(renderer.domElement);


        //Creación de malla
        const size = 500;
        const divisiones = 1000;
        const gridHelper = new THREE.GridHelper( size, divisiones );
        scene.add( gridHelper );


        //Creación de ejes X,Y,Z
        const axesHelper1 = new THREE.AxesHelper( 50 );
        const axesHelper2 = new THREE.AxesHelper( -50 );
        scene.add( axesHelper1,axesHelper2 )

        // Crear un nuevo objeto THREE.Group() para contener todas las caras de la esfera
        const sphere = new THREE.Group();

        const vertices = [];
        const radio = 1; // Radio de la esfera
        const numLongitudes = 16; // Número de longitudes
        const numLatitudes = 16; // Número de latitudes

        for (let i = 0; i <= numLatitudes; i++) {
        const theta = (i * Math.PI) / numLatitudes;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let j = 0; j <= numLongitudes; j++) {
            const phi = (j * 2 * Math.PI) / numLongitudes;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;

            vertices.push(radio * x, radio * y, radio * z);
        }
        }

        // Definir los índices de los triángulos
        const indices = [];
        for (let i = 0; i < numLatitudes; i++) {
        for (let j = 0; j < numLongitudes; j++) {
            const first = i * (numLongitudes + 1) + j;
            const second = first + numLongitudes + 1;
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
        }

        // Crear una geometría para la esfera utilizando los arrays de vértices e índices
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setIndex(indices);

        // Crear un nuevo objeto THREE.Mesh() para la esfera utilizando la geometría y un material
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 ,wireframe: true });

        const mesh = new THREE.Mesh(geometry, material);

        // Agregar el objeto THREE.Mesh() de la esfera al objeto principal
        sphere.add(mesh);

        // Agregar el objeto principal a la escena
        scene.add(sphere);

        // Agregar una luz ambiental a la escena
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Agregar una luz direccional a la escena
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        sphere.position.y=1;
        
        camera.position.x=1;
        camera.position.y=2;
        camera.position.z=5;
        

        const controls = new THREE.OrbitControls(camera, renderer.domElement);

        
        function render() {
            // Actualiza los controles de OrbitControls
            controls.update();
            
            // Dibuja la escena
            renderer.render( scene, camera );
        
            // Vuelve a llamar a la función render en el siguiente cuadro de la animación
            requestAnimationFrame( render );
        }
        
        // Llama por primera vez a la función render
        render();
       