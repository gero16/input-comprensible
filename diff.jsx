diff --git a/src/Components/Clip/Clip.jsx b/src/Components/Clip/Clip.jsx
index 8c50ee8..0e01b0d 100644
--- a/src/Components/Clip/Clip.jsx
+++ b/src/Components/Clip/Clip.jsx
@@ -5,7 +5,7 @@ import { Context } from "../../context/context"
 import "./Clip.css"
 import { urlBackend_Desarrollo, urlBackend_Produccion } from "../../context/helpers";
 
-const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificultad, capitulo, grabacionID, numero_clip, editar }) => {
+const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificultad, capitulo, grabacionID, numero_clip, editar, mostrarDificultad }) => {
 
     const {  evaluar, mostrarRespuesta, transformarMayuscula, 
         dificultadIdioma, dificultadEsp, } = useContext(Context);
@@ -21,6 +21,7 @@ const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificulta
     const [idGrabar, setIdGrabar] = useState()
     const [grabacionPorGuardar, setGrabacionPorGuardar] = useState("");
     const [hayGrabacion, setHayGrabacion] = useState(false);
+    
 
     const separarDificultad = dificultad.split("-");
     const primeraPalabra = separarDificultad[0].charAt(0).toUpperCase() + separarDificultad[0].slice(1);
@@ -35,9 +36,7 @@ const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificulta
         });
     }, []);
 
-  
-
-    console.log(grabacionPorGuardar)
+ 
 
     const informarMensaje = (mensaje, posMensaje, tiempo) => {
         setMensaje(mensaje);
@@ -46,6 +45,7 @@ const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificulta
         },
          tiempo);
     };
+
     const guardarGrabacion = async (elemento, indice) => {
         const urlBlob = elemento.firstElementChild.src;
         const response = await fetch(urlBlob);
@@ -147,6 +147,7 @@ const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificulta
         }
     }
 
+
     return (
         <>
             <article className={`article-video`} id={`id-BD-${id}`}>
@@ -163,9 +164,14 @@ const Clip = ({ id, imagen, categoria, subtitulo, video, index, frase, dificulta
                         
                         <span className={`ocultar ${ subtitulo }-${ index } frase`} > { frase } </span>
                         <span className={`ocultar ${subtitulo}-mostrar-${index}` }> Incorrecto! </span>
-                        <span className={`bold ${dificultad} `}> { dificultadEsp(dificultad, true) } </span>
+                        <>
+                            <span className={`bold ${dificultad} `}> { mostrarDificultad ? dificultadEsp(dificultad, true) : "" } </span>
+                        </>
+                        
+
                         <input type="text" className={`input-${ subtitulo }-${ index } input-frase`} />
                         <input type="text" className={`ocultar inputRespuesta-${ subtitulo }-${ index } `} defaultValue={ frase} />
+
                         <section className="flex-between">
                             <button className="button" onClick={(e) => evaluar(subtitulo, index)} id="btn-evaluar">Evaluar</button>
                             <button className="button" onClick={(e) => mostrarRespuesta(subtitulo, index)} id="btn-mostar-respuesta"> Mostrar Respuesta </button>
diff --git a/src/Components/Navbar/Navbar.jsx b/src/Components/Navbar/Navbar.jsx
index b78d008..68f57e7 100644
--- a/src/Components/Navbar/Navbar.jsx
+++ b/src/Components/Navbar/Navbar.jsx
@@ -93,8 +93,7 @@ const Navbar = () => {
                         
 
                         : <>
-                          
-                      
+                
                             <li>
                                 <span className="span-link" onClick={() => cerrarSesion() }> Cerrar Sesion </span>
                             </li>
diff --git a/src/Components/Pelicula/ContenedorPelicula.jsx b/src/Components/Pelicula/ContenedorPelicula.jsx
index 90bbe5e..388581e 100644
--- a/src/Components/Pelicula/ContenedorPelicula.jsx
+++ b/src/Components/Pelicula/ContenedorPelicula.jsx
@@ -31,6 +31,7 @@ const ContenedorPelicula = () => {
       
     }, [paginaActual])
 
+  
     return (
         <>
        
diff --git a/src/Components/Pelicula/Pelicula.jsx b/src/Components/Pelicula/Pelicula.jsx
index 6f6a510..7eef633 100644
--- a/src/Components/Pelicula/Pelicula.jsx
+++ b/src/Components/Pelicula/Pelicula.jsx
@@ -7,7 +7,7 @@ const Pelicula = ({data, imagenPortada }) => {
 
     console.log(imagenPortada)
     let {  usuario, pelicula, jpg } = useParams();
-    const { urlBackend_Desarrollo, urlBackend_Produccion, setData, traerGrabacion, traerGrabaciones, traerImagenFomato, urlImagen  } = useContext(Context)
+    const { urlBackend_Desarrollo, urlBackend_Produccion, urlImagen, mostrarDificultad, ocultarDificultad  } = useContext(Context)
 
     const navigate = useNavigate();
     
@@ -37,10 +37,16 @@ const Pelicula = ({data, imagenPortada }) => {
 
     return (
         <>
-            <article className={`article-clip article-audio ${ pelicula }`} name={ pelicula }>  
+            <article className={`article-clip article-audio ${ pelicula }`} name={ pelicula }> 
 
                 <div className={`portada portada-${ pelicula } flex-center`} style={style}>
                 </div>
+
+                <section 
+                    className="ocultar-dificultad"
+                    onClick={() => ocultarDificultad()}> { mostrarDificultad ? "Ocultar " : "Mostrar "} 
+                    Dificultad 
+                </section> 
               
                 <section className='flex-center'>
                     { data.length > 0
@@ -58,6 +64,7 @@ const Pelicula = ({data, imagenPortada }) => {
                                 numero_clip={element["numero_clip"]}
                                 imagen={element.imagen}
                                 key={index}
+                                mostrarDificultad={mostrarDificultad}
                             />
                         )
                         })
diff --git a/src/context/context.jsx b/src/context/context.jsx
index 049b787..fec99c6 100644
--- a/src/context/context.jsx
+++ b/src/context/context.jsx
@@ -25,6 +25,7 @@ export const CustomProvider = ({ children }) => {
 
    
     const [data, setData] = useState([]) 
+    const [mostrarDificultad, setMostrarDificultad] = useState(true)
 
     const clickGrabar = (e) => {
         const idGrabar = e.classList[1]
@@ -189,6 +190,9 @@ export const CustomProvider = ({ children }) => {
     }
 
 
+    const ocultarDificultad = () => {
+        setMostrarDificultad(!mostrarDificultad)
+    }
 
 return (
     <Context.Provider 
@@ -198,7 +202,7 @@ return (
             cantidadPaginasHtml, fetchClips, data, setData, separarTexto, fetchCantidadClips, 
             traerImagenFomato, urlImagen, fetchTitulosPelicula, fetchTitulosSeries, evaluarSesion,
              usuarioSesion, setUsuarioSesion,nombreUsuario, traerImagenPortada, imagenPortada,
-             dificultadIdioma,dificultadEsp, grabacionPorGuardar, setGrabacionPorGuardar
+             dificultadIdioma,dificultadEsp, grabacionPorGuardar, setGrabacionPorGuardar, ocultarDificultad, mostrarDificultad
             }}> 
             
         { children } 
diff --git a/src/main.css b/src/main.css
index ae50d63..0536ea9 100644
--- a/src/main.css
+++ b/src/main.css
@@ -243,6 +243,11 @@
   gap: 50px
 }
 
+.ocultar-dificultad {
+  margin: 20px 0px 0px 0px;
+  cursor: pointer;
+}
+
 ul{
   list-style: none;
 }
