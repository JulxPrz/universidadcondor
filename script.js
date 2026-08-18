const boton = document.getElementById("btnChat");
const menu = document.getElementById("chatMenu");

boton.addEventListener("click", ()=>{

    menu.classList.toggle("active");

});

// Alternar visibilidad de la ventana del chatbot
function toggleChatbot() {
  const chat = document.getElementById('chatbot-container');
  chat.classList.toggle('chatbot-hidden');
}

// Enviar mensaje al presionar la tecla Enter
function handleKeyPress(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
}

// Enviar mensaje mediante clic en los botones rápidos o tags
function sendQuickMessage(text) {
  document.getElementById('chatbot-input').value = text;
  sendMessage();
}

// Función principal para enviar mensaje de usuario
function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user-message');
  input.value = '';

  // Simulación de respuesta con pequeño tiempo de espera
  setTimeout(() => {
    processBotResponse(text);
  }, 400);
}

// Agregar mensaje a la interfaz
function appendMessage(text, className) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${className}`;
  msgDiv.innerHTML = text;
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Lógica de procesamiento de respuestas
function processBotResponse(rawText) {
  const text = rawText.toLowerCase();

  // Diccionarios de palabras clave para saludos y despedidas
  const greetings = ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'que tal'];
  const farewells = ['adios', 'adiós', 'chao', 'hasta luego', 'nos vemos', 'gracias'];

  const isGreeting = greetings.some(g => text.includes(g));
  const isFarewell = farewells.some(f => text.includes(f));

  if (isGreeting) {
    appendMessage(
      "¡Hola! Qué gusto saludarte. Soy el asistente de la Universidad Cóndor Unido. ¿En qué información académica o de admisiones te puedo orientar?",
      'bot-message'
    );
  } else if (isFarewell) {
    appendMessage(
      "¡Hasta luego! Fue un placer atenderte. Recuerda que la Universidad Cóndor Unido siempre tiene las puertas abiertas para ti.",
      'bot-message'
    );
  } else {
    // Respuesta fallback en caso de no ser ni saludo ni despedida
    appendMessage(
      `Lo siento, no comprendo esa consulta. Los servicios e información disponibles actualmente en la Universidad Cóndor Unido son:
      <br><br>
      🎓 <b>Oferta Académica:</b> Consulta de programas y carreras universitarias.<br>
      📝 <b>Admisiones:</b> Requisitos e inscripción para nuevos estudiantes.<br>
      📰 <b>Noticias:</b> Eventos y actualidad del campus.<br>
      📞 <b>Contacto:</b> Atención al estudiante y canales de comunicación.
      <div class="quick-buttons-grid">
        <button onclick="sendQuickMessage('Oferta Académica')">🎓 Ver Carreras</button>
        <button onclick="sendQuickMessage('Admisiones')">📝 Ver Admisiones</button>
        <button onclick="sendQuickMessage('Contacto')">📞 Contacto Directo</button>
      </div>`,
      'bot-message'
    );
  }
}

/* SECCIÓN DE PANEL */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
      console.log('Iniciando sesión con:', { username, password });
      alert(`Intentando ingresar con el usuario: ${username}`);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('academic-login-form');
  const toast = document.getElementById('toast-notification');

  if (!form || !toast) {
    console.error('No se encontraron los elementos del formulario o de la notificación.');
    return;
  }

  form.addEventListener('submit', (e) => {
    // 1. Detiene la recarga automática del formulario
    e.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    
    // Regla para validar correo con @ en medio y dominio
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
      showToast('Ingresa un correo válido (ej: usuario@correo.com)', '#ef4444');
      return;
    }

    if (!passwordInput) {
      showToast('Por favor ingresa tu contraseña', '#ef4444');
      return;
    }

    // 2. Muestra la bandeja de éxito
    showToast('¡Ingreso exitoso! Bienvenido al portal.', '#10b981');
  });

  function showToast(message, bgColor) {
    const toastMsg = document.getElementById('toast-message');
    toastMsg.textContent = message;
    toast.style.backgroundColor = bgColor;

    // Remueve la clase para mostrar la bandeja
    toast.classList.remove('toast-hidden');

    // La vuelve a ocultar a los 3.5 segundos
    setTimeout(() => {
      toast.classList.add('toast-hidden');
    }, 3500);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const formPago = document.getElementById('form-pago-condor');
  const toast = document.getElementById('toast-notificacion');
  const toastMensaje = document.getElementById('toast-mensaje');
  const btnPagar = document.querySelector('.btn-confirmar-pago');

  if (formPago) {
    formPago.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita recargar la página inmediatamente

      // 1. Mostrar la bandeja de notificación
      toast.classList.remove('toast-oculto');

      // 2. Deshabilitar el botón de pago
      if (btnPagar) {
        btnPagar.disabled = true;
        btnPagar.style.opacity = '0.6';
        btnPagar.style.cursor = 'not-allowed';
      }

      // 3. Temporizador de 5 segundos con cuenta regresiva
      let segundosRestantes = 5;

      const intervalo = setInterval(() => {
        segundosRestantes--;
        if (segundosRestantes > 0) {
          toastMensaje.textContent = `Serás redirigido al inicio en ${segundosRestantes} segundo${segundosRestantes > 1 ? 's' : ''}...`;
        }
      }, 1000);

      // 4. Redirección a index.html tras 5000 ms (5 segundos)
      setTimeout(() => {
        clearInterval(intervalo);
        window.location.href = "index.html";
      }, 5000);
    });
  }
});

const btnVolver = document.getElementById('btn-volver-inicio');

if (btnVolver) {
  btnVolver.addEventListener('click', function(e) {
    // Si quieres que haga scroll al inicio de la misma página:
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* RESPUESTA DEL BOT */ 


// Respuestas predefinidas para cada opción
const respuestasBot = {
  oferta: "🎓 **Oferta Académica:**\nContamos con carreras en áreas de Diseño Gráfico, Desarrollo Web, Multimedia e Ingeniería. Puedes explorar nuestro plan de estudios completo en la sección académica de nuestro portal.",
  
  admisiones: "📝 **Proceso de Admisiones:**\nEl proceso de inscripción incluye:\n1. Diligenciar el formulario de inscripción.\n2. Adjuntar documento de identidad y diploma.\n3. Presentar la entrevista de admisión.\n\n¡Las inscripciones están abiertas actualmente!",
  
  noticias: "📰 **Últimas Noticias:**\n• Apertura de inscripciones para el próximo ciclo académico.\n• Exposición interactiva de proyectos estudiantiles este viernes.\n• Nuevos convenios para prácticas profesionales.",
  
  contacto: "📞 **Contacto e Información:**\n• **Atención:** Lunes a Viernes (8:00 AM - 6:00 PM)\n• **Correo:** admisiones@universidad.edu.co\n• **Teléfono:** (605) 300-0000"
};

// Función para agregar un mensaje al chat
function agregarMensaje(texto, remitente) {
  const contenedorMensajes = document.getElementById('chatbot-messages');
  if (!contenedorMensajes) return;

  const divMensaje = document.createElement('div');
  divMensaje.classList.add('chat-message', `${remitente}-message`);
  
  // Reemplazar saltos de línea \n por <br> y negritas por <strong>
  let textoFormateado = texto.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  divMensaje.innerHTML = textoFormateado;

  contenedorMensajes.appendChild(divMensaje);

  // Hace scroll automático hacia el último mensaje
  contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
}

// Asignar los eventos de clic a cada botón de opción rápida
document.querySelectorAll('.quick-opt').forEach(boton => {
  boton.addEventListener('click', function() {
    const tema = this.getAttribute('data-topic');
    const textoBoton = this.textContent.trim();

    // 1. Muestra la opción elegida como mensaje enviado por el usuario
    agregarMensaje(textoBoton, 'user');

    // 2. Simula un breve tiempo de respuesta del chatbot (300ms)
    setTimeout(() => {
      const respuesta = respuestasBot[tema] || "Lo siento, no encontré información sobre este tema.";
      agregarMensaje(respuesta, 'bot');
    }, 300);
  });
});

// Contenido detallado para Oferta Académica
const detalleOfertaAcademica = `
🎓 <strong>Programas y Cursos Habilitados</strong><br><br>

🏛️ <strong>Carreras Profesionales:</strong>
• Diseño Gráfico y Visual
• Ingeniería de Software
• Diseño de Interacción y UX/UI
• Comunicación Digital<br><br>

📜 <strong>Cursos y Diplomados:</strong>
• Desarrollo Web Responsive (HTML, CSS, JavaScript)
• Branding y Creación de Identidad de Marca
• Ilustración Digital y Vectorización
• Producción y Procesos de Impresión<br><br>

💡 <em>Si deseas más información sobre el plan de estudios o requisitos de alguno de estos programas, escríbenos el nombre del curso en el chat.</em>
`;

// Lógica de respuesta al hacer clic en los botones
document.querySelectorAll('.quick-opt').forEach(boton => {
  boton.addEventListener('click', function() {
    const textoSeleccionado = this.textContent.trim();

    // 1. Muestra en el chat la opción que seleccionó el usuario
    agregarMensaje(textoSeleccionado, 'user');

    // 2. Muestra la respuesta correspondiente del bot
    setTimeout(() => {
      if (textoSeleccionado.includes('Oferta Académica')) {
        agregarMensaje(detalleOfertaAcademica, 'bot');
      } else if (textoSeleccionado.includes('Admisiones')) {
        agregarMensaje("📝 <strong>Admisiones:</strong> Puedes iniciar tu proceso adjuntando tu documento de identidad y diligenciando el formulario de inscripción.", 'bot');
      } else if (textoSeleccionado.includes('Noticias')) {
        agregarMensaje("📰 <strong>Noticias:</strong> ¡Inscripciones abiertas para el nuevo periodo! Revisa nuestra sección de noticias en el portal.", 'bot');
      } else if (textoSeleccionado.includes('Contacto')) {
        agregarMensaje("📞 <strong>Contacto:</strong> Escríbenos a admisiones@universidad.edu.co o llámanos al (605) 300-0000.", 'bot');
      }
    }, 300);
  });
});
