export class Section {
    constructor(conteinerSection, renderer) {
      this._renderer = renderer;
      this._conteiner = document.querySelector(conteinerSection);
    }
    addItem(node){
     this._conteiner.prepend(node);
    }
    rendererItem(dataArray){
        dataArray.forEach(dataElements => {
        this._renderer(dataElements);

     });
    }
}