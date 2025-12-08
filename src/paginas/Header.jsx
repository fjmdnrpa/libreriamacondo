import React from 'react'
import '../estilos/Header.css';

function Header() {
  return (
    <div>
    <div class="cabecera">
        <img class="iconos" src="logo.png" alt="macondo"/>
        <h1 id="razon">LIBRERIA MACONDO</h1>
        <img id="iconos-bancos" src="visa.png" alt="visa"/>
        <img id="iconos-bancos" src="mastercard.png" alt="mastercard"/>
        <img id="iconos-bancos" src="american.png" alt="american express"/>
        <img id="iconos-bancos" src="mercadopv.svg" alt="mercadopago"/>
        <img id="iconos-bancos" src="modo.svg" alt="modo"/>
    </div>
        <p id="parrafo">3 y 6 cuotas sin interes con tarjetas seleccionadas. Consultar por otras promociones bancarias.</p>            
    </div>
    
  )
}

export default Header
