 this.mainDiv = document.getElementById('main');

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
    
    this.mainDiv.appendChild(dialogContainer);
    
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
        
        // Hide next button if there are choices
        const nextBtn = dialogContainer.querySelector('.next-dialog');
        if (dialog.choices) {
            nextBtn.style.display = 'none';
            renderChoices.call(this, dialog.choices); // Bind 'this' properly
        } else {
            nextBtn.style.display = 'block';
        }
    };
    
    updateDialog();
    
    dialogContainer.querySelector('.next-dialog').addEventListener('click', () => {
        currentDialogIndex++;
        updateDialog();
    });
}

function renderChoices(choices) {
    // Clear existing choices
    const existing = document.querySelector('.choices-overlay');
    if (existing) existing.remove();
    
    // Create main overlay container
    const choicesOverlay = document.createElement('div');
    choicesOverlay.className = 'choices-overlay';
    
    // Create centered choices container
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choices-center-container';
    
    // Create each choice button
    choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.className = 'choice-button';
        choiceButton.textContent = choice.text;
        
        choiceButton.addEventListener('click', () => {
            // Remove the choices overlay
            choicesOverlay.remove();
            
            // Load the next scene using the engine's method
            if (choice.next_scene) {
                vnEngine.renderScene(choice.next_scene);
            }
        });
        
        choicesContainer.appendChild(choiceButton);
    });
    
    choicesOverlay.appendChild(choicesContainer);
    this.mainDiv.appendChild(choicesOverlay);
    
    // Add click handler to overlay (optional - close when clicking outside)
    choicesOverlay.addEventListener('click', (e) => {
        if (e.target === choicesOverlay) {
            choicesOverlay.remove();
        }
    });
}
