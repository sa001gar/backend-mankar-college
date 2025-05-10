document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements (same as before)
  const chatModal = document.getElementById('csbot-modal');
  const chatToggleBtn = document.getElementById('csbot-toggle-btn');
  const closeChatBtn = document.getElementById('csbot-close-btn');
  const chatMessages = document.getElementById('csbot-messages');
  const chatForm = document.getElementById('csbot-form');
  const messageInput = document.getElementById('csbot-message-input');
  const sendBtn = document.getElementById('csbot-send-btn');
  const shortcutsBtn = document.getElementById('csbot-shortcuts-btn');
  const shortcutsPanel = document.getElementById('csbot-shortcuts-panel');
  const shortcutButtons = document.querySelectorAll('.csbot-shortcut-btn');
  const voiceToggleBtn = document.getElementById('csbot-voice-toggle');
  const voicePanel = document.getElementById('csbot-voice-panel');
  const voiceBtn = document.getElementById('csbot-voice-btn');
  const voiceStatus = document.getElementById('csbot-voice-status');
  const themeToggleBtn = document.getElementById('csbot-theme-toggle');
  
  // Chat State
  let messages = [
    { role: "assistant", content: "Hello! I'm the Department of Computer Science AI assistant powered by Gemini 2.0 Flash. How can I help you today? You can type your question or click the microphone to speak." }
  ];
  let isLoading = false;
  let isRecording = false;
  let recognition = null;
  let synthesisVoice = null;
  let apiAvailable = true; // Will be updated after checking
  
  // Backend API endpoints
  const CHAT_API_URL = '/api/chatbot/response/';
  const API_STATUS_URL = '/api/chatbot/status/';
  
  // Check API status on page load
  checkApiStatus();
  
  // Initialize voice recognition
  initVoiceRecognition();
  
  // Initialize text-to-speech
  initTextToSpeech();
  
  // Initialize chat
  renderMessages();
  
  // Event Listeners - Same as before
  chatToggleBtn.addEventListener('click', openChatModal);
  closeChatBtn.addEventListener('click', closeChatModal);
  
  chatModal.addEventListener('click', function(e) {
    if (e.target === chatModal) {
      closeChatModal();
    }
  });
  
  chatForm.addEventListener('submit', handleSubmit);
  
  messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });
  
  shortcutsBtn.addEventListener('click', function() {
    shortcutsPanel.classList.toggle('active');
    voicePanel.classList.remove('active');
  });
  
  shortcutButtons.forEach(button => {
    button.addEventListener('click', function() {
      const prompt = this.getAttribute('data-prompt');
      messageInput.value = prompt;
      shortcutsPanel.classList.remove('active');
      messageInput.focus();
    });
  });
  
  // Voice related event listeners
  if (recognition) {
    voiceToggleBtn.addEventListener('click', function() {
      voicePanel.classList.toggle('active');
      shortcutsPanel.classList.remove('active');
      if (voicePanel.classList.contains('active')) {
        voiceStatus.textContent = 'Click to start speaking';
      }
    });
    
    voiceBtn.addEventListener('click', function() {
      if (isRecording) {
        recognition.stop();
      } else {
        messageInput.value = '';
        recognition.start();
      }
    });
  }
  
  // Theme toggle
  themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('csbotDarkTheme', document.body.classList.contains('dark-theme'));
  });
  
  // Check for saved theme preference
  if (localStorage.getItem('csbotDarkTheme') === 'true') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Modal Functions - Same as before
  function openChatModal() {
    chatModal.classList.add('active');
    messageInput.focus();
    chatToggleBtn.style.animation = 'none';
    document.body.classList.add('no-scroll')
    
  }
  
  function closeChatModal() {
    chatModal.classList.remove('active');
    shortcutsPanel.classList.remove('active');
    voicePanel.classList.remove('active');
    document.body.classList.remove('no-scroll')
    
    if (isRecording && recognition) {
      recognition.stop();
    }
    
    setTimeout(() => {
      chatToggleBtn.style.animation = 'pulse 2s infinite';
    }, 300);
  }
  
  // Check if API is available
  function checkApiStatus() {
    fetch(API_STATUS_URL)
      .then(response => response.json())
      .then(data => {
        apiAvailable = data.api_available;
        console.log(`API available: ${apiAvailable}`);
      })
      .catch(error => {
        console.error('Error checking API status:', error);
        apiAvailable = false;
      });
  }
  
  // Voice Recognition Functions - Same as before
  function initVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = function() {
        isRecording = true;
        voiceBtn.classList.add('recording');
        voiceStatus.textContent = 'Listening...';
      };
      
      recognition.onresult = function(event) {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        voiceStatus.textContent = transcript;
        messageInput.value = transcript;
      };
      
      recognition.onend = function() {
        isRecording = false;
        voiceBtn.classList.remove('recording');
        voiceStatus.textContent = 'Click to start speaking';
        
        if (messageInput.value.trim() !== '') {
          setTimeout(() => {
            voicePanel.classList.remove('active');
            handleSubmit(new Event('submit'));
          }, 500);
        }
      };
      
      recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
        voiceStatus.textContent = 'Error: ' + event.error;
        isRecording = false;
        voiceBtn.classList.remove('recording');
      };
    } else {
      voiceToggleBtn.style.display = 'none';
    }
  }
  
  // Text-to-Speech Functions - Same as before
  function initTextToSpeech() {
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = function() {
        const voices = speechSynthesis.getVoices();
        synthesisVoice = voices.find(voice => 
          voice.lang.includes('en-') && voice.name.includes('Google') && !voice.name.includes('Male')
        ) || voices.find(voice => 
          voice.lang.includes('en-')
        ) || voices[0];
      };
      
      speechSynthesis.getVoices();
    }
  }
  
  function speakText(text) {
    if ('speechSynthesis' in window && synthesisVoice) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = synthesisVoice;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      window.speechSynthesis.speak(utterance);
    }
  }
  
  // Chat Functions
  function handleSubmit(e) {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message || isLoading) return;
    
    // Add user message
    addMessage("user", message);
    messageInput.value = '';
    
    // Show loading indicator
    isLoading = true;
    updateSendButtonState();
    showTypingIndicator();
    
    // Get the conversation history for context (last 10 messages)
    const conversationHistory = messages.slice(-10);
    
    // Call Django backend instead of direct API call
    fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken') // For Django CSRF protection
      },
      body: JSON.stringify({
        message: message,
        conversation_history: conversationHistory
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      removeTypingIndicator();
      
      if (data.status === 'success') {
        addAnimatedMessage("assistant", data.response);
        
        if (voicePanel.classList.contains('active')) {
          speakText(data.response);
        }
      } else {
        addMessage("assistant", "Sorry, I encountered an error processing your request. Please try again later.");
      }
    })
    .catch(error => {
      console.error("Error processing message:", error);
      removeTypingIndicator();
      addMessage("assistant", "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.");
    })
    .finally(() => {
      isLoading = false;
      updateSendButtonState();
    });
  }
  
  // Helper function to get CSRF token from cookies (for Django)
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  // Message handling functions - Same as before
  function addMessage(role, content) {
    messages.push({ role, content });
    
    const messageElement = document.createElement('div');
    messageElement.className = `csbot-message ${role}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'csbot-message-content';
    messageContent.textContent = content;
    
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    
    scrollToBottom();
  }
  
  function addAnimatedMessage(role, content) {
    messages.push({ role, content });
    
    const messageElement = document.createElement('div');
    messageElement.className = `csbot-message ${role}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'csbot-message-content';
    
    const typingText = document.createElement('div');
    typingText.className = 'csbot-typing-text';
    
    const cursor = document.createElement('span');
    cursor.className = 'csbot-cursor';
    
    messageContent.appendChild(typingText);
    messageContent.appendChild(cursor);
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    
    scrollToBottom();
    
    let i = 0;
    const typingSpeed = 10;
    const typingInterval = 30;
    
    function typeNextChunk() {
      if (i < content.length) {
        const endIndex = Math.min(i + typingSpeed, content.length);
        const chunk = content.substring(i, endIndex);
        typingText.textContent += chunk;
        i = endIndex;
        
        scrollToBottom();
        
        setTimeout(typeNextChunk, typingInterval);
      } else {
        messageContent.removeChild(cursor);
        typingText.textContent = content;
      }
    }
    
    setTimeout(typeNextChunk, 150);
  }
  
  function renderMessages() {
    chatMessages.innerHTML = '';
    
    messages.forEach((message, index) => {
      if (index === 0) {
        addAnimatedMessage(message.role, message.content);
      } else {
        const messageElement = document.createElement('div');
        messageElement.className = `csbot-message ${message.role}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'csbot-message-content';
        messageContent.textContent = message.content;
        
        messageElement.appendChild(messageContent);
        chatMessages.appendChild(messageElement);
      }
    });
    
    scrollToBottom();
  }
  
  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'csbot-typing-indicator';
    typingIndicator.id = 'csbot-typing-indicator';
    
    const indicatorContent = document.createElement('div');
    indicatorContent.className = 'csbot-message-content';
    
    const dots = document.createElement('div');
    dots.className = 'csbot-typing-dots';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'csbot-dot';
      dots.appendChild(dot);
    }
    
    indicatorContent.appendChild(dots);
    typingIndicator.appendChild(indicatorContent);
    chatMessages.appendChild(typingIndicator);
    
    scrollToBottom();
  }
  
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('csbot-typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function updateSendButtonState() {
    sendBtn.disabled = isLoading || messageInput.value.trim() === '';
    if (sendBtn.disabled) {
      sendBtn.style.opacity = '0.5';
    } else {
      sendBtn.style.opacity = '1';
    }
  }
  
  // Update send button state on input change
  messageInput.addEventListener('input', updateSendButtonState);
  
  // Initial button state
  updateSendButtonState();
});