import React, { useState } from 'react';
import papel from './componentes/images/papel.png'
import piedra from './componentes/images/piedra.png'
import tijera from './componentes/images/tijera.png'

function App() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [resultText, setResultText] = useState('');
  let [pc, setPc] = useState('');
  let [puntaje1, setPuntaje1] = useState(0);
  let [puntaje2, setPuntaje2] = useState(0);
  let [i, setI] = useState(1);

  const usuarioDiv = document.getElementById('usuarioDiv');
  const textInicio = document.getElementById('textInicio');
  const seleccionDiv = document.getElementById('seleccion');
  const piedraBot = document.getElementById('piedraBot');
  const papelBot = document.getElementById('papelBot');
  const tijeraBot = document.getElementById('tijeraBot');
  const inputUsuario = document.getElementById('inputUsuario');

  function Incrementpc(){
  setPuntaje1(puntaje1=puntaje1 + 1); 

}
  function IncrementUser(){
    setPuntaje2(puntaje2=puntaje2 + 1);
    
  }

  
  const calcularResult = (eleccionUsuario, jug2) => {
    if (eleccionUsuario === jug2) {
      setResultText('Empate');
     console.log(i);
    } else if (
      (eleccionUsuario === 'piedra' && jug2 === 'papel') ||
      (eleccionUsuario === 'tijeras' && jug2 === 'piedra') ||
      (eleccionUsuario === 'papel' && jug2 === 'tijeras')
    ) {
      Incrementpc();
      setResultText('Punto para la máquina');
      console.log(i);
       detener();
       

    } else if (
      (eleccionUsuario === 'papel' && jug2 === 'piedra') ||
      (eleccionUsuario === 'piedra' && jug2 === 'tijeras') ||
      (eleccionUsuario === 'tijeras' && jug2 === 'papel')
    ) {
      IncrementUser();
      setResultText(`Punto para ${nombreUsuario}`);
      console.log(i);
       detener();
        
    }
  };

  const obtenerJugadaComputadora = () => {
    const numeroAleatorio = Math.floor(Math.random() * 3);

    if (numeroAleatorio === 0) {
      setPc('eleccion de la pc: piedra');
      return 'piedra';
    } else if (numeroAleatorio === 1) {
      setPc('eleccion de la pc: papel');
      return 'papel';
    } else {
      setPc('eleccion de la pc: tijeras');
      return 'tijeras';
    }
  };

  function detener(){
    console.log(i)
    if (puntaje1 === 3) {
      setResultText('Mala suerte, gana la máquina.');
      piedraBot.disabled = true;
      papelBot.disabled = true;
     tijeraBot.disabled = true;
    } else if (puntaje2 === 3) {
      setResultText(`Felicitaciones ${nombreUsuario}, ¡Tú ganas!!`);
       piedraBot.disabled = true;
         papelBot.disabled = true;
        tijeraBot.disabled = true;
    }
     
  };  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const botones = document.querySelectorAll('#seleccion button');

      for (let boton of botones) {
        boton.style.display = 'block';
      }

      if (nombreUsuario === '') {
        alert('Ingrese su nombre');
      } else {
        
        textInicio.innerHTML = `¡Hola ${nombreUsuario}! Selecciona una opción.`;

        piedraBot.addEventListener('click', () => {
          calcularResult('piedra', obtenerJugadaComputadora());
          setI(i=i+1);
          
        });

        papelBot.addEventListener('click', () => {
          calcularResult('papel', obtenerJugadaComputadora());
          setI(i=i+1);
           
        });

        tijeraBot.addEventListener('click', () => {
          calcularResult('tijeras', obtenerJugadaComputadora());
          setI(i=i+1);
          
        });

        seleccionDiv.style.display = 'block';
        textInicio.style.display = 'block';
        inputUsuario.style.display = 'none';
        usuarioDiv.style.display = 'none';
      }
    }
  };

  return (
    <div>
    <div><p id="usuarioDiv">El juego es al mejor de tres. <br/>Ingresa tu nombre:</p></div>
      <input
        id="inputUsuario"
        type="text"
        onKeyDown={handleKeyDown}
        onChange={(event) => setNombreUsuario(event.target.value)}
      />
      <div id="usuarioDiv">
        {/* Renderizar aquí los elementos relevantes */}
      </div>
      <div id="seleccion">
        <button id="piedraBot"><img src={piedra}/></button>
        <button id="papelBot"><img src={papel}/></button>
        <button id="tijeraBot"><img src={tijera}/></button>
      </div>
      <div id="textInicio"></div>
      <div id="resultText">{resultText}</div>
      <div id="pc" dangerouslySetInnerHTML={{ __html: pc }}></div>
      <div id="puntaje1" display='none'>pc: {puntaje1}</div>
      <div id="puntaje2" display= 'none'>{nombreUsuario}: {puntaje2}</div>
      <div id="refresh"><button id="refBoton" onClick={() => window.location.reload()}>Reiniciar</button></div>
    </div>
  );
}

export default App;
