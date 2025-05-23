class VisualNovelEngine {
    constructor() {
        this.currentScene = null; 
        this.scenesData = {};
        this.handlers = {};
        this.mainDiv = document.getElementById('main');

             this.currentDialogIndex = 0;
        this.currentDialogData = null;
        
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

     if (scene.dialog) {
            this.currentDialogData = scene.dialog;
            this.currentDialogIndex = 0;
            this.renderDialogSystem();
            this.showCurrentDialog();
        }
        
        this.currentScene = sceneId;
        this.mainDiv.innerHTML = scene.html || '';
        
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

// delete

  renderDialogSystem() {
    // Clear any existing dialog first
    const existingDialog = this.mainDiv.querySelector('.dialog-container');
    if (existingDialog) {
        existingDialog.remove();
    }

    // Add new dialog container
    this.mainDiv.insertAdjacentHTML('beforeend', `
        <div class="dialog-container">
            <div class="dialog">
                <div class="name" id="nameDisplay"></div>
                <div class="image-container">
                    <img class="image" id="imageDisplay" src="" alt="Character image">
                </div>
                <div class="text" id="textDisplay"></div>
                <button class="next-button" id="nextDialog">Next</button>
            </div>
        </div>
    `);

    // Add styles (only once)
    if (!document.getElementById('dialogStyles')) {
        const style = document.createElement('style');
        style.id = 'dialogStyles';
        style.textContent = `
            .dialog-container {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: center;
                z-index: 1000;
            }
            .dialog {
                max-width: 800px;
                width: 100%;
            }
            .name {
                font-weight: bold;
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            .image-container {
                float: left;
                margin-right: 20px;
                margin-bottom: 10px;
            }
            .image {
                max-height: 150px;
                max-width: 150px;
                border-radius: 5px;
            }
            .text {
                line-height: 1.5;
            }
            .next-button {
                margin-top: 10px;
                padding: 5px 15px;
                cursor: pointer;
                background: #444;
                color: white;
                border: none;
                border-radius: 4px;
            }
            .next-button:hover {
                background: #555;
            }
        `;
        document.head.appendChild(style);
    }

    // Add event listener for the next button
    const nextButton = document.getElementById('nextDialog');
    if (nextButton) {
        // Remove any existing listeners to prevent duplicates
        nextButton.replaceWith(nextButton.cloneNode(true));
        document.getElementById('nextDialog').addEventListener('click', () => {
            this.nextDialog();
        });
    }
}
    showCurrentDialog() {
        if (!this.currentDialogData || this.currentDialogIndex >= this.currentDialogData.length) {
            // No more dialog to show
            return;
        }
        
        const currentDialog = this.currentDialogData[this.currentDialogIndex];
        document.getElementById('nameDisplay').textContent = currentDialog.name;
        document.getElementById('imageDisplay').src = currentDialog.image;
        document.getElementById('textDisplay').textContent = currentDialog.text;
    }

    nextDialog() {
        this.currentDialogIndex++;
        if (this.currentDialogIndex < this.currentDialogData.length) {
            this.showCurrentDialog();
        } else {
            // Dialog finished, check if there's a next scene
            const currentScene = this.scenesData[this.currentScene];
            if (currentScene.scene && currentScene.scene.next_scene) {
                this.renderScene(currentScene.scene.next_scene);
            }
            // You could also hide the dialog container here if needed
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
