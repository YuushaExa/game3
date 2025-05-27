const gameState = {
    globalCount: 0,
    previousScene: null
};

const gameData = {
    scenes: {
        start_screen: {
            html: `
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                background: linear-gradient(135deg, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);
                                color: white;
                                font-family: Arial, sans-serif;
                                text-align: center;
                                position: relative;
                            }
                            .title {
                                font-size: 3em;
                                margin-bottom: 20px;
                                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                            }
                            .start-btn {
                                padding: 15px 30px;
                                background-color: #ff6b6b;
                                color: white;
                                border: none;
                                border-radius: 5px;
                                font-size: 1.2em;
                                cursor: pointer;
                                transition: all 0.3s;
                            }
                            .start-btn:hover {
                                background-color: #ff8e8e;
                                transform: scale(1.05);
                            }
                        </style>
                        <div>
                            <div class="title">Visual Novel</div>
                            <button class="start-btn" next_scene="block_1">Start Game</button>
                         <button class="start-btn" next_scene="block_2">Start 2</button>
                    <div class="count-display">Current count: ${gameState.globalCount}</div>
                    <button class="options-btn" next_scene="options">Options</button>
                        </div>
            `,
            onRender: function() {
                // Refresh the count display when returning to this scene
                document.querySelector('.count-display').textContent = `Current count: ${gameState.globalCount}`;


            },
            next_scene: "block_1"
        },
        block_1: {
            background: "https://raw.githubusercontent.com/YuushaExa/game2/refs/heads/main/Image_fx%20(1).jpg",
            color: "#bbbbbb",
             dialog: [
                {
                    name: "Character 1",
                    image: "avatar.jpg",
                    text: "This is the first dialogue."
                },
                {
                    name: "Character 1",
                    image: "avatar.jpg",
                    text: "This is the second dialogue."
                },
                {
                    name: "Character 2",
                    image: "avatar2.jpg",
                    text: "This is the third dialogue.",
 choices: [
                {
                    text: "Go to the park",
                    next_scene: "block_3"
                },
                {
                    text: "Stay here",
                    next_scene: "block_3"
                },
                {
                    text: "Ask for more information",
                    next_scene: "start_screen"
                }
            ]
        }
            ],
            scene: {
                time: "25", // in seconds
                next_scene: "block_2" // scene to transition to after 5 seconds
            },
        },
        block_2: {
            background: {
                type: "color",
                source: "#f0f0f0"
            },
        html: `
          <style>
                    div#counter {
                        background: #fff;
                        }
                        </style>
        <div id="counter">${gameState.globalCount}</div>
                  <button id="incrementBtn">Click to +1</button>
                  <button class="start-btn" next_scene="start_screen">Return to Home</button>`,
   onRender: function() {
        const counterElement = document.getElementById('counter');
        const incrementBtn = document.getElementById('incrementBtn');

        // Set initial value
        counterElement.textContent = gameState.globalCount;
        
        // Manual increment button
        incrementBtn.addEventListener('click', function() {
            gameState.globalCount++;
            counterElement.textContent = gameState.globalCount;
        });
        
        // Start new auto-increment
        gameState.autoIncrement = setInterval(function() {
            gameState.globalCount++;
            counterElement.textContent = gameState.globalCount;
        }, 1000);
},
               onLeave: function() {
        // Clear the interval when leaving the scene
        if (gameState.autoIncrement) {
            clearInterval(gameState.autoIncrement);
            gameState.autoIncrement = null;
        }
    },
                      next_scene: "block_1"
        },
 block_3: {
color: "#bbbbbb",
 },
      options: {
            html: `
                <style>
                    .options-menu {
                        background: #3f51b5;
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        margin: auto;
                    }
                    .back-btn {
                        padding: 10px 20px;
                        background-color: #ff6b6b;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        margin-top: 20px;
                        cursor: pointer;
                    }
                </style>
                <div class="options-menu">
                    <h2>Options</h2>
                    <div id="language-switcher">
                        <button data-lang="en">English</button>
                        <button data-lang="ru">Русский</button>
                    </div>
                    <div>Volume controls would go here</div>
                    <button class="btn btn-primary" next_scene="${gameState.previousScene || 'start_screen'}">Back</button>
                </div>
            `,
          onRender: function() {
                // Store current scene as previous before going to options
                gameState.previousScene = vnEngine.currentScene;
            }
        },
    }
};
