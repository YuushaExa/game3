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

       if (scene.background) {
            this.setBackground(scene.background);
        }
        
        this.currentScene = sceneId;
        this.mainDiv.innerHTML = scene.html || '';

  if (scene.dialog) {
        renderDialogSystem(scene.dialog);
    }
        
        if (scene.onRender) {
            scene.onRender();
        }

        this.triggerEvent('sceneChanged', { sceneId });
    }

    setBackground(backgroundUrl) {
           this.mainDiv.style.backgroundImage = `url('${backgroundUrl}')`;
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
// dialog
function renderDialogSystem(dialogArray) {
    const dialogContainer = document.createElement('div');
    dialogContainer.className = 'dialog-container';
    dialogContainer.innerHTML = `
        <div class="dialog-box">
            <div class="character-info">
                <img class="character-avatar" src="">
                <span class="character-name"></span>
            </div>
            <div class="dialog-text"></div>
            <button class="next-dialog">Next</button>
        </div>
    `;
    
    document.body.appendChild(dialogContainer);
    
    let currentDialogIndex = 0;
    const updateDialog = () => {
        if (currentDialogIndex >= dialogArray.length) {
            dialogContainer.remove();
            return;
        }
        
        const dialog = dialogArray[currentDialogIndex];
        dialogContainer.querySelector('.character-avatar').src = dialog.image;
        dialogContainer.querySelector('.character-name').textContent = dialog.name;
        dialogContainer.querySelector('.dialog-text').textContent = dialog.text;
    };
    
    updateDialog();
    
    dialogContainer.querySelector('.next-dialog').addEventListener('click', () => {
        currentDialogIndex++;
        updateDialog();
    });
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
