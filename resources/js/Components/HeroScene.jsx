import { useEffect, useRef } from 'react';

export default function HeroScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const container = mountRef.current;
        if (!container) return;

        let mounted = true;
        let rafId;

        import('three').then((THREE) => {
            if (!mounted) return;

            const w = container.clientWidth  || window.innerWidth;
            const h = container.clientHeight || window.innerHeight;

            /* ── Renderer ── */
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(w, h);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.domElement.style.cssText =
                'position:absolute;inset:0;pointer-events:none;';
            container.appendChild(renderer.domElement);

            /* ── Camera ── */
            const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
            camera.position.z = 10;

            /* ── Scene ── */
            const scene = new THREE.Scene();
            const clock = new THREE.Clock();

            /* ── Materials ── */
            const edgeMat = (opacity) =>
                new THREE.LineBasicMaterial({
                    color: 0x18d26e, transparent: true, opacity,
                });
            const wireMat = (opacity) =>
                new THREE.MeshBasicMaterial({
                    color: 0x18d26e, wireframe: true, transparent: true, opacity,
                });

            /* ── Shape 1: Icosahedron (large, left) ── */
            const geo1  = new THREE.IcosahedronGeometry(2.4, 0);
            const edge1 = new THREE.EdgesGeometry(geo1);
            const m1    = new THREE.LineSegments(edge1, edgeMat(0.22));
            m1.position.set(-4.2, 0.4, 0);
            scene.add(m1);

            /* ── Shape 2: TorusKnot (right, deeper) ── */
            const geo2 = new THREE.TorusKnotGeometry(1.3, 0.38, 80, 10);
            const m2   = new THREE.Mesh(geo2, wireMat(0.11));
            m2.position.set(4.3, -0.6, -1.5);
            scene.add(m2);

            /* ── Shape 3: Octahedron (small, upper) ── */
            const geo3  = new THREE.OctahedronGeometry(1.1, 0);
            const edge3 = new THREE.EdgesGeometry(geo3);
            const m3    = new THREE.LineSegments(edge3, edgeMat(0.17));
            m3.position.set(1.8, 3.1, 0.5);
            scene.add(m3);

            /* ── Resize ── */
            const onResize = () => {
                const nw = container.clientWidth;
                const nh = container.clientHeight;
                renderer.setSize(nw, nh);
                camera.aspect = nw / nh;
                camera.updateProjectionMatrix();
            };
            window.addEventListener('resize', onResize);

            /* ── Mouse parallax ── */
            let mx = 0, my = 0, lx = 0, ly = 0;
            const onMouse = (e) => {
                mx = (e.clientX / window.innerWidth  - 0.5) * 2;   // –1 → +1
                my = (e.clientY / window.innerHeight - 0.5) * 2;   // –1 → +1
            };
            window.addEventListener('mousemove', onMouse);

            /* ── Animation loop ── */
            const tick = () => {
                if (!mounted) return;
                rafId = requestAnimationFrame(tick);
                const t = clock.getElapsedTime();

                m1.rotation.x = t * 0.11;
                m1.rotation.y = t * 0.07;

                m2.rotation.x = t * 0.06;
                m2.rotation.y = t * 0.13;
                m2.rotation.z = t * 0.04;

                m3.rotation.x = t * 0.18;
                m3.rotation.y = t * 0.09;

                // Lerp parallax — different depth per shape
                lx += (mx - lx) * 0.04;
                ly += (my - ly) * 0.04;

                m1.position.set(-4.2 + lx * 0.45, 0.4  - ly * 0.45,  0);
                m2.position.set( 4.3 + lx * 0.70, -0.6 - ly * 0.70, -1.5);
                m3.position.set( 1.8 + lx * 0.25,  3.1 - ly * 0.25,  0.5);

                renderer.render(scene, camera);
            };
            rafId = requestAnimationFrame(tick);

            /* ── Stored cleanup (runs after import resolves) ── */
            container._threeDispose = () => {
                cancelAnimationFrame(rafId);
                window.removeEventListener('mousemove', onMouse);
                window.removeEventListener('resize',    onResize);
                [geo1, edge1, geo2, geo3, edge3].forEach(g => g.dispose());
                renderer.dispose();
                if (container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
            };
        });

        return () => {
            mounted = false;
            container._threeDispose?.();
            delete container._threeDispose;
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
