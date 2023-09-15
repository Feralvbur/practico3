
import './App.css';
import React, { useState } from 'react';

function App() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  // const [puntPc, setPuntPc] = useState(0);
  // const [puntUsuario, setPuntUsuario] = useState(0);
  const [resultText, setResultText] = useState('');
  const [pc, setPc] = useState('');
  const [puntaje1, setPuntaje1] = useState(0);
  const [puntaje2, setPuntaje2] = useState(0);

 
  // const inputUsuario = document.getElementById('inputUsuario');
  const usuarioDiv = document.getElementById('usuarioDiv');
  const textInicio = document.getElementById('textInicio');
  const seleccionDiv = document.getElementById('seleccion');
  const piedraBot = document.getElementById('piedraBot');
  const papelBot = document.getElementById('papelBot');
  const tijeraBot = document.getElementById('tijeraBot');

  function Incrementpc(){
  setPuntaje1((prev) => prev + 1); 
}
  function IncrementUser(){
    setPuntaje2((prev) => prev + 1);
  }

  
  const calcularResult = (eleccionUsuario, jug2) => {
    if (eleccionUsuario === jug2) {
      setResultText('Empate');
      console.log(puntaje1, " ", puntaje2)
    } else if (
      (eleccionUsuario === 'piedra' && jug2 === 'papel') ||
      (eleccionUsuario === 'tijeras' && jug2 === 'piedra') ||
      (eleccionUsuario === 'papel' && jug2 === 'tijeras')
    ) {
      console.log(puntaje1, " ", puntaje2)
      Incrementpc();
      setResultText('Punto para la máquina');
       detener();
       if (puntaje1 === 3) {
         piedraBot.disabled = true;
         papelBot.disabled = true;
         tijeraBot.disabled = true;
       }
    } else if (
      (eleccionUsuario === 'papel' && jug2 === 'piedra') ||
      (eleccionUsuario === 'piedra' && jug2 === 'tijeras') ||
      (eleccionUsuario === 'tijeras' && jug2 === 'papel')
    ) {
      IncrementUser();
      setResultText(`Punto para ${nombreUsuario}`);
  
       detener();
       if (puntaje2 === 3) {
         piedraBot.disabled = true;
         papelBot.disabled = true;
        tijeraBot.disabled = true;
      }
    }
  };

  const obtenerJugadaComputadora = () => {
    const numeroAleatorio = Math.floor(Math.random() * 3);

    if (numeroAleatorio === 0) {
      setPc('<img src="piedra.png" alt="Piedra" />');
      return 'piedra';
    } else if (numeroAleatorio === 1) {
      setPc('<img src="papel.png" alt="Papel" />');
      return 'papel';
    } else {
      setPc('<img src="tijera.png" alt="Tijeras" />');
      return 'tijeras';
    }
  };

  function detener(){
    if (puntaje1 === 3) {
      setResultText('Mala suerte, gana la máquina.');
    } else if (puntaje2 === 3) {
      setResultText(`Felicitaciones ${nombreUsuario}, ¡Tú ganas!!`);
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
        usuarioDiv.style.display = 'none';
        textInicio.innerHTML = `¡Hola ${nombreUsuario}! Selecciona una opción.`;

        piedraBot.addEventListener('click', () => {
          calcularResult('piedra', obtenerJugadaComputadora());
        });

        papelBot.addEventListener('click', () => {
          calcularResult('papel', obtenerJugadaComputadora());
        });

        tijeraBot.addEventListener('click', () => {
          calcularResult('tijeras', obtenerJugadaComputadora());
        });

        seleccionDiv.style.display = 'block';
        textInicio.style.display = 'block';
      }
    }
  };

  return (
    <div>
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
        <button id="piedraBot">piedra</button>
        <button id="papelBot">Papel</button>
        <button id="tijeraBot">Tijeras</button>
      </div>
      <div id="textInicio"></div>
      <div id="resultText">{resultText}</div>
      <div id="pc" dangerouslySetInnerHTML={{ __html: pc }}></div>
      <div id="puntaje1">pc: {puntaje1}</div>
      <div id="puntaje2">{nombreUsuario}: {puntaje2}</div>
    </div>
  );
}

export default App;
