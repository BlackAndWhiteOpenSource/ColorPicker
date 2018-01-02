ColorPicker = function(Element) {
    this._anchorElement = Element;
    this._canvas_block;
    this._canvas_line;

    this._createcontainer = function(){
        var container = '<div class="canvas-color-picker"></div>'
        $(this._anchorElement).append(container);
    }

    this._createcanvas = function(){
        var canvascontainer =   '<div id="box-color-picker">' +
                                '    <canvas id="color-picker"></canvas>' +
                                '    <canvas id="color-picker-line"></canvas>' +
                                '    Hex: <span id="hex-color"></span> ' +
                                '         <div class="input-color-picker" id="hex-set-color"></div> ' +
                                '    <button class="button-color-picker" id="picker-ok">OK</button> <button class="button-color-picker" id="picker-close">X</button>' +
                                '</div>';
        $(this._anchorElement).children().append(canvascontainer);                               
        this._canvas_block = $(this._anchorElement).find('#color-picker')[0];
        this._canvas_line = $(this._anchorElement).find('#color-picker-line')[0];
    }
    
    this._constructor = function(){
        this._createcontainer();
        this._createcanvas();
    }

    this._renderpicker = function(){
        this.context = this._canvas_block.getContext('2d');
        this.blockSize = new Size(this._canvas_block.width, this._canvas_block.height);
    }

    this.Open = function(CallBack){
        this._renderpicker();     
    }

    this._constructor();
}
Size = function(Heigth, Witdh) {
    this.Heigth = Heigth;
    this.Witdh = Witdh;   
}