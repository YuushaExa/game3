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
                const currentScene = this.scenesData[this.currentScene];
            if (currentScene.scene && currentScene.scene.next_scene) {
                this.renderScene(currentScene.scene.next_scene);
            }
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
