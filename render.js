    renderDialogSystem() {
        this.mainDiv.innerHTML += `
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
            <style>
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
                }
            </style>
        `;
        
        // Add event listener for the next button
        document.getElementById('nextDialog').addEventListener('click', () => {
            this.nextDialog();
        });
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
