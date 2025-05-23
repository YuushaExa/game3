renderDialogSystem() {
        this.mainDiv.innerHTML = `
            <div class="dialog-container">
                <div class="dialog">
                    <div class="name" id="nameDisplay"></div>
                    <div class="image-container">
                        <img class="image" id="imageDisplay" src="" alt="Character image">
                    </div>
                    <div class="text" id="textDisplay"></div>
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
            </style>
        `;
    }
