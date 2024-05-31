//Declaraciones
const URL_PALABRAS = "http://localhost:3000/palabras";
let casillasSeleccionadas = [];
let palabrasHorizontal = 1;
let palabrasVertical =   1;
let palabrasDiagonal =   1;

//Obtener datos del servidor
let palabras= []

function obtenerDatos(){
    fetch(URL_PALABRAS)
    .then( res => res.json())
    .then( datos => {
        palabras = datos
        console.log(datos)
        console.log(palabras)
        
    });
}

//primera lectura de datos y espera de 0,2 segundos para su correcta carga
obtenerDatos();

setTimeout(() =>{
    play()
},200)



let arrayBi = [
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
    new Array(20),new Array(20),
]

console.log(arrayBi)

//seteo del juego
let juego = {
    palabrasJuego :[],
    acertadas :[],
    palabraFormada : ""
}


function play(){
    rellenarVacios(arrayBi);
    ponerPalabrasEnJuegoHorizontal();
    ponerPalabrasEnJuegoVertical();
    ponerPalabrasEnJuegoDiagonal();
    //rellenarConLetras(arrayBi);
    console.log(juego.palabrasJuego)
    addIndex();
    addPalabrasBuscar();
}



//Botones Reiniciar y comprobar
function reiniciarJuego(){
    obtenerDatos();
    removePalabrasBuscar()
    removeIndex();

    arrayBi = [
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
        new Array(20),new Array(20),
    ]
    
    juego = {
        palabrasJuego :[],
        acertadas :[],
    }
    
    console.log(arrayBi)
    
    
    console.log(palabras);

    play();
}





//Funciones para crear la sopa
function ponerPalabrasEnJuegoHorizontal(){
    
    puestas = 0;
    while(puestas < palabrasHorizontal){
    
        let posPalabraRndm = ~~(Math.random() * palabras.length);
        let palabra = palabras[posPalabraRndm]
        let rndm1 = ~~(Math.random() * 20);
        let rndm2 = ~~(Math.random() * 20);
        let comprobarEntrada = 20 - rndm2 >= palabra.value.length? true : false
        let comprobarSiVacio = comprobarVacioHorizontal(arrayBi, rndm1, rndm2, palabra);
        
        if(comprobarEntrada && comprobarSiVacio){
            for(let i = 0; i < palabra.value.length;i++){
                
                arrayBi[rndm1][rndm2] = palabra.value[i];
                rndm2++;
            }
            palabras.splice(posPalabraRndm, 1);
            puestas++;
            juego.palabrasJuego.push(palabra.value);
        }
    }
    
    console.log(arrayBi)
}


function ponerPalabrasEnJuegoVertical(){
    
    puestas = 0;
    while(puestas < palabrasVertical){
    
        let posPalabraRndm = ~~(Math.random() * palabras.length);
        let palabra = palabras[posPalabraRndm]
        let rndm1 = ~~(Math.random() * 20);
        let rndm2 = ~~(Math.random() * 20);
        let comprobarSiVacio = false;
        let comprobarEntrada = 20 - rndm1 >= palabra.value.length? true : false

        if(comprobarEntrada != false){
            comprobarSiVacio = comprobarVacioVertical(arrayBi, rndm1, rndm2, palabra);
        }
        
        if(comprobarEntrada && comprobarSiVacio){
            for(let i = 0; i < palabra.value.length;i++){
                
                arrayBi[rndm1][rndm2] = palabra.value[i];
                rndm1++;
            }
            palabras.splice(posPalabraRndm, 1);
            puestas++;
            juego.palabrasJuego.push(palabra.value);
        }


        console.log(arrayBi)
    }
    
}

function ponerPalabrasEnJuegoDiagonal(){
    
    puestas = 0;
    direction = "der"
    while(puestas < palabrasDiagonal){
    
        let posPalabraRndm = ~~(Math.random() * palabras.length);
        let palabra = palabras[posPalabraRndm]
        let rndm1 = ~~(Math.random() * 20);
        let rndm2 = ~~(Math.random() * 20);
        let comprobarEntradaAltura = 20 - rndm1 >= palabra.value.length? true : false
        
        if(direction == "der" && comprobarEntradaAltura != false){
            let comprobarEntrada = 20 - rndm2 >= palabra.value.length? true : false
            let comprobarSiVacio = comprobarVacioDiagonal(arrayBi, rndm1, rndm2, palabra, "der");
            
            if(comprobarEntrada && comprobarSiVacio){
                for(let i = 0; i < palabra.value.length;i++){
                    
                    arrayBi[rndm1][rndm2] = palabra.value[i];
                    rndm1++;
                    rndm2++;
                }
                puestas++;
                direction = "izq"
                juego.palabrasJuego.push(palabra.value);
                palabras.splice(posPalabraRndm, 1);
            }
        }else if(direction == "izq" && comprobarEntradaAltura != false){

            let comprobarEntrada = 20 - rndm2 <= palabra.value.length? true : false
            let comprobarSiVacio = comprobarVacioDiagonal(arrayBi, rndm1, rndm2, palabra, "izq");
            if(comprobarEntrada && comprobarSiVacio){
                for(let i = 0; i < palabra.value.length;i++){
                    
                    arrayBi[rndm1][rndm2] = palabra.value[i];
                    rndm1++;
                    rndm2--;
                }
                puestas++;
                direction = "der"
                juego.palabrasJuego.push(palabra.value);
                palabras.splice(posPalabraRndm, 1);
            }
        }
        
    }
    
    console.log(arrayBi)
}

function comprobarVacioHorizontal(arr, aleatorio1, aleatorio2, palabraActual){
    
    for(let i = 0; i <palabraActual.value.length;i++){
        
        if(arr[aleatorio1][aleatorio2] == "_"){
            aleatorio2++
        }else{
            return false;
        }
    }
    return true;
}


function comprobarVacioVertical(arr, aleatorio1, aleatorio2, palabraActual){
    
    for(let i = 0; i <palabraActual.value.length;i++){
        
        if(arr[aleatorio1][aleatorio2] == "_"){
            aleatorio1++
        }else{
            return false;
        }
    }
    return true;
}

//comprueba hacia abajo diagonal izq o dcha
function comprobarVacioDiagonal(arr, aleatorio1, aleatorio2, palabraActual, direccion){

    
    if(direccion == "der"){

        for(let i = 0; i <palabraActual.value.length;i++){
            
            if(arr[aleatorio1][aleatorio2] == "_"){
                aleatorio2++
                aleatorio1++
            }else{
                return false;
            }
        }
        return true;

    }else if(direccion == "izq"){
        for(let i = 0; i <palabraActual.value.length;i++){
            
            if(arr[aleatorio1][aleatorio2] == "_"){
                aleatorio2--
                aleatorio1++
            }else{
                return false;
            }
        }
        return true;
    }

}

function rellenarVacios(arr){

    for (let i = 0; i < 20; i++) {
        
        for (let j = 0; j < 20; j++) {
            
            //letras = "ABCDEFGHIJKLMNÑOPQRSTVWXYZ";
            letras = "__________________________";

            letraElejida = letras[~~(Math.random() * 26)];

            if(arr[i][j] === undefined){
                arr[i][j] = letraElejida;
            }
        }
    }
}

function rellenarConLetras(arr){

    for (let i = 0; i < 20; i++) {
        
        for (let j = 0; j < 20; j++) {
            
            letras = "ABCDEFGHIJKLMNÑOPQRSTVWXYZ";

            letraElejida = letras[~~(Math.random() * 26)];

            if(arr[i][j] == "_"){
                arr[i][j] = letraElejida;
            }
        }
    }
}

//Funciones para añadir y quitar las casillas del table
function addIndex(){

    for (let i = 0; i < 20; i++) {

        let tr = document.createElement("tr")
        tr.setAttribute("id", "r" + (i+1))
        tablero.append(tr)

        for (let j = 0; j < 20; j++) {

            let td = document.createElement("td")
            td.setAttribute("id", "r" + (i+1) + "c" + (j+1))
            td.setAttribute("onclick", "sumarLetras("+(i+1)+", "+ (j+1) +")")
            td.append(arrayBi[i][j])
            tr.append(td);

        }

    }

}

function removeIndex(){
    for (let i = 1; i <= 20; i++) {
        let tr = document.getElementById("r"+i)

        tr.remove();
    }
}

function addPalabrasBuscar(){

    for (let i = 0; i < juego.palabrasJuego.length; i++) {
        let p = document.createElement("p")
        p.setAttribute("id", "p" + (i+1))
        p.append(juego.palabrasJuego[i]);
        palabrasBuscar.append(p);
        
    }
}

function removePalabrasBuscar(){
    
    for (let i = 1; i <= juego.palabrasJuego.length; i++) {
        let p = document.getElementById("p"+i)

        p.remove();
    }
}




function sumarLetras(row, col){
    let casilla = document.getElementById("r" + row + "c" + col);
    casilla.style.backgroundColor = "rgb(254, 246, 167)"
    
    casillasSeleccionadas.push(casilla)
    console.log(casillasSeleccionadas)

    let valor = casilla.textContent;
    
    juego.palabraFormada += valor
    console.log(juego.palabraFormada)
}


function comprobarPalabra(){

    if(juego.palabrasJuego.includes(juego.palabraFormada)){

        for (let i = 0; i < casillasSeleccionadas.length; i++) {
            
            casillasSeleccionadas[i].style.backgroundColor = "rgb(179, 203, 255)";
        }

        let posPalabra = juego.palabrasJuego.indexOf(juego.palabraFormada)
        
        let p = document.getElementById("p"+(posPalabra+1))
        p.style.backgroundColor = "rgb(255, 133, 133)"

        juego.acertadas.push(juego.palabraFormada)
        juego.palabraFormada = "";
        casillasSeleccionadas = [];
        console.log(juego.palabraFormada);
        
        comprobarGanaOPierde();

    }else{
        for (let i = 0; i < casillasSeleccionadas.length; i++) {
            
            casillasSeleccionadas[i].style.backgroundColor = "rgb(255, 139, 139)";
        }

        setTimeout(() =>{
            for (let i = 0; i < casillasSeleccionadas.length; i++) {
            
                casillasSeleccionadas[i].style.backgroundColor = "white";
            }
            juego.palabraFormada = "";
            casillasSeleccionadas = [];

        },1500)
    }
}

function comprobarGanaOPierde(){
    if(juego.acertadas.length == juego.palabrasJuego.length){
        setTimeout(() =>{
            alert("HAS GANADOOOOO")
        },100)
    }
}