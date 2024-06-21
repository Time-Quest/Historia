//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿En que año inicio la Primera Guerra Mundial?",
        op0:"1914",
        op1:"1920",
        op2:"1939",
        correcta:"0"
    },
    {
        id:1,
        pregunta:"¿En qué año inicio la batalla de Gallipoli",
        op0:"1916",
        op1:"1915",
        op2:"1914",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"¿Qué era el tratado de Brest Litovsk?",
        op0:"Paz entre Alemania y Rusia",
        op1:"Paz entre Italia y Alemania",
        op2:"Paz entre Rusia e Italia",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"¿Cuántos días duro la batalla de Verdun?",
        op0:"303 días",
        op1:"200 días",
        op2:"310 días",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"¿Nombre del Archiduque Austro-Hungaro?",
        op0:"Francisco Fernando",
        op1:"Francisco De Sarajevo",
        op2:"Kaiser",
        correcta:"0"
    },
    {
        id:5,
        pregunta:"Aparición del Primer tanque durante la primera Guerra Mundial",
        op0:"mediados de 1915",
        op1:"1914",
        op2:"1918",
        correcta:"0"
    },
    {
        id:6,
        pregunta:"¿Cuál es la capital de Alemania",
        op0:"Sarajevo",
        op1:"Prusia",
        op2:"Berlin",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"operación Alemana que fue muy importante durante 1918",
        op0:"Kaiserchlacht",
        op1:"Gallapoli",
        op2:"operación del Marne",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"Territorios anexados A Alemania durante 1918",
        op0:"Parte de Polonia",
        op1:"Gran parte de Rusia",
        op2:"Francia",
        correcta:"1"
    },
    {
        id:9,
        pregunta:"Fecha en la cual culmino la Primera Guerra Mundial",
        op0:"1 de Septiembre de 1918",
        op1:"11 de Noviembre de 1920",
        op2:"11 de Noviembre de 1918",
        correcta:"2"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}