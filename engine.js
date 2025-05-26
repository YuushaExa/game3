class VisualNovelEngine {
    constructor() {
        this.currentScene = null;
        this.scenesData = {};
        this.handlers = {};
        this.mainDiv = document.getElementById('main');
        
        // Set up event delegation once during initialization
        this.setupEventDelegation();
    }

    // Initialize the engine with game data
    init(gameData) {
        this.scenesData = gameData.scenes;
        this.triggerEvent('dataLoaded');
        this.startVisualNovel();
    }

    // Set up event delegation for scene transitions
setupEventDelegation() {
    this.mainDiv.addEventListener('click', (e) => {
        const targetScene = e.target.closest('[next_scene]')?.getAttribute('next_scene');
        if (targetScene) this.renderScene(targetScene);
    });
}

    // Start the visual novel
startVisualNovel() {
    const startingScene = this.scenesData['start_screen'] ? 'start_screen' : 'block_1';
    if (this.scenesData[startingScene]) {
        this.renderScene(startingScene);
    } else {
        console.error('No starting scene found');
    }
}

    // Render a scene
    renderScene(sceneId) {
         if (this.currentScene && this.scenesData[this.currentScene]?.onLeave) {
        this.scenesData[this.currentScene].onLeave();
    }
   
        const scene = this.scenesData[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found`);
            return;
        }

  this.mainDiv.style.backgroundImage = 'none';
    this.mainDiv.style.backgroundColor = 'transparent';

        
       if (scene.background) {
            this.setBackground(scene.background);
        }
           if (scene.color) {
            this.setColor(scene.color);
        }
        
        this.currentScene = sceneId;
        this.mainDiv.innerHTML = scene.html || '';

  if (scene.dialog) {
        renderDialogSystem(scene.dialog);
    }
        
  if (scene.choices) {
        renderChoices(scene.choices);
    }
        
        if (scene.onRender) {
            scene.onRender();
        }

        this.triggerEvent('sceneChanged', { sceneId });
    }

    setBackground(backgroundUrl) {
           this.mainDiv.style.backgroundImage = `url('${backgroundUrl}')`;
    }
       setColor(color) {
          this.mainDiv.style.backgroundColor = color;
    }

    
    // Event handling system
    on(event, handler) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(handler);
    }

    triggerEvent(event, data = {}) {
        if (this.handlers[event]) {
            this.handlers[event].forEach(handler => handler(data));
        }
    }
}

// Initialize the engine when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.vnEngine = new VisualNovelEngine();
    
    // Check if gameData is available
    if (typeof gameData !== 'undefined') {
        vnEngine.init(gameData);
    } else {
        console.error('gameData is not defined. Make sure game.js is loaded.');
    }
});
