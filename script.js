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