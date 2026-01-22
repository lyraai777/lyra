import { AIModule } from './features/ai.js';
import { Memory } from './features/memory.js';

const App = {
    ai: new AIModule(),
    hasInteracted: false,

    async init() {
        Memory.init();
        this.setupVideo();
        this.setupChat();
        
        // Restore old chat if it exists
        this.renderHistory();
    },

    setupVideo() {
        const video = document.getElementById('intro-video');
        const btn = document.getElementById('enter-btn');
        const layer = document.getElementById('intro-layer');
        const root = document.getElementById('app-root');

        // Show "Enter" button after 2 seconds
        setTimeout(() => btn.classList.remove('hidden'), 2000);

        btn.addEventListener('click', () => {
            layer.classList.add('hidden'); // Hide video
            root.classList.remove('hidden'); // Show app
            video.pause();
            
            // Start AI Loading
            this.loadAI(); 
        });
    },

    async loadAI() {
        // Show a system message
        this.addMessage('lyra', 'Initializing Lyceum Neural Core...');
        
        await this.ai.init((status) => {
            console.log("AI Status:", status);
        });
        
        this.addMessage('lyra', 'Lyra is Online. Systems Normal.');
    },

    setupChat() {
        const sendBtn = document.getElementById('send-btn');
        const input = document.getElementById('user-input');

        const send = () => this.handleSend();

        sendBtn.addEventListener('click', send);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') send();
        });
    },

    async handleSend() {
        const input = document.getElementById('user-input');
        const text = input.value.trim();
        if (!text) return;

        // 1. TRIGGER THE "L" ANIMATION (Center -> Left)
        if (!this.hasInteracted) {
            document.body.classList.add('active-mode');
            this.hasInteracted = true;
        }

        // 2. Add User Message
        this.addMessage('user', text);
        Memory.saveMessage('user', text);
        input.value = '';

        // 3. Fast Spin L (Thinking)
        document.getElementById('rotating-l').style.animationDuration = "0.5s";

        // 4. Get AI Response
        const history = Memory.getHistory();
        const response = await this.ai.generate(text, history);

        // 5. Slow Spin L (Done)
        document.getElementById('rotating-l').style.animationDuration = "8s";

        // 6. Show Response
        this.addMessage('lyra', response);
        Memory.saveMessage('lyra', response);
    },

    addMessage(role, text) {
        const container = document.getElementById('chat-container');
        const div = document.createElement('div');
        div.className = `message ${role}`;
        div.textContent = text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },

    renderHistory() {
        const history = Memory.getHistory();
        history.forEach(msg => {
            this.addMessage(msg.role, msg.content);
        });
        // If history exists, move header immediately
        if (history.length > 0) {
            document.body.classList.add('active-mode');
            this.hasInteracted = true;
        }
    }
};

// Start the App
document.addEventListener('DOMContentLoaded', () => App.init());