const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');



formularioCalculadora.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Nota: Agregué los paréntesis aquí
    calcularCalorias();//
});

function calcularCalorias() {
    aparecerResultado();
    
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura= document.querySelector('#altura');
    const actividad= document.querySelector('#actividad');
    const genero= document.querySelector('input[name="genero"]:checked');
    const nombre= document.querySelector('#nombre');
    const tipoDocumento= document.querySelector('#tipo-documento');
    const numeroDocumento= document.querySelector('#numero-documento');
   

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }
    
    if(!(edad.value && peso.value && altura.value && nombre.value && tipoDocumento.value && numeroDocumento.value )){
        mostrarMensajeDeError('Por favor asegurese de llenar todos los campos');
        return;
    }

    /*let mensajeEdad = '' ;
    if(edad.value >= 15 && edad.value < 30){
        mensajeEdad = 'Joven';
    }if(edad.value >= 30 && edad.value < 60){
        mensajeEdad = 'Adultos';
    }if(edad.value >= 60){
        mensajeEdad='Adultos Mayores';
 }*/

    const edadMensaje = edad.value >= 15 && edad.value < 30 ? 'Joven' : edad.value >= 30 && edad.value < 60 ? 'Adultos' : 'Adultos Mayores';


    /*let calculoCalorias
    //Formula hombres: valor actividad x ((10 x peso en kg) + (6,;25 × altura en cm) - (5 × edad en años) + 5))
    if(genero.id==='masculino'){
        calculoCalorias = actividad.value *((multiplicadorTMB.peso*peso.value) + (multiplicadorTMB.altura*altura.value)-(multiplicadorTMB.edad*edad.value))+5;
    }else{
        //Formula mujeres: valor actividad x ((10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161)
        calculoCalorias = actividad.value*((multiplicadorTMB.peso*peso.value) + (multiplicadorTMB.altura*altura.value)-(multiplicadorTMB.edad*edad.value)-161);
    } */  

    const calculoCalorias = genero.id ==='masculino'? actividad.value *((multiplicadorTMB.peso*peso.value) + (multiplicadorTMB.altura*altura.value)-(multiplicadorTMB.edad*edad.value))+5:actividad.value*((multiplicadorTMB.peso*peso.value) + (multiplicadorTMB.altura*altura.value)-(multiplicadorTMB.edad*edad.value)-161);
    
    /*totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;*/
    
    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
            <input class="form-control text-center" value="${Math.round(calculoCalorias)} kcal" style="font-size: 2rem" disabled>
            </div>
            <div class='container'>
            <p class='large-text text-wrap'>
            El paciente <strong><em>${nombre.value}</em></strong> identificado con <strong>${tipoDocumento.value}</strong> NO.<strong>${numeroDocumento.value}</strong>, el  cual se encuentra en el grupo poblacional de <strong>${edadMensaje}</strong>, requiere un total de <strong>${Math.round(calculoCalorias)}</strong> Kcal para el sostenimiento de su <strong>TBM</strong>.
            </p>
            </div>
        </div>
    `
}
/*Limpieza del formulario*/
const formulario = document.querySelector('form');
formulario.addEventListener('submit',()=>{
    document.querySelector('form').reset();//limpia el formulario con la funcion reset,la cual limpia el formulario.
});
/* document.querySelector('form').addEventListener('submit', function() {
    document.querySelector('form').reset();
});*/
    

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
