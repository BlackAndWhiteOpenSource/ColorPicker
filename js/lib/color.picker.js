ColorPicker = function(Element) {
    this._anchorElement = Element;
    this._canvas_block;
    this._canvas_line;
    this._rgbapatternColor;
    this._colorFillStyle;

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
        this._rgbapatternColor = 'rgba(255,0,0,1)';
        this._colorFillStyle = new FillList();
        this._colorFillStyle.AddFill(0, 'rgba(255, 0, 0, 1)'); 
        this._colorFillStyle.AddFill(0.17, 'rgba(255, 255, 0, 1)'); 
        this._colorFillStyle.AddFill(0.34, 'rgba(0, 255, 0, 1)'); 
        this._colorFillStyle.AddFill(0.51, 'rgba(0, 255, 255, 1)'); 
        this._colorFillStyle.AddFill(0.68, 'rgba(0, 0, 255, 1)'); 
        this._colorFillStyle.AddFill(0.85, 'rgba(255, 0, 255, 1)'); 
        this._colorFillStyle.AddFill(1, 'rgba(255, 0, 0, 1)'); 
    }

    this._renderpicker = function(){
        this.block_context = this._canvas_block.getContext('2d');        
        this.line_context = this._canvas_line.getContext('2d');
        this.blockSize = new Size(this._canvas_block.width, this._canvas_block.height);
        this.lineSize = new Size(this._canvas_line.width, this._canvas_line.height);

        this.lineargradiente_color = this.line_context.createLinearGradient(0,0,0,this.blockSize.Heigth);     
        this.line_context.fillStyle = this._colorFillStyle.FillStyle(this.lineargradiente_color);
        this.line_context.fill();
        this._fillGradiente();
    }

    this._fillGradiente = function(){
        this.block_context.fillStyle = this.rgbaColor;
        this.block_context.fillRect(0, 0, this.blockSize.width, this.blockSize.Heigth);
        this.lineargradiente_white = this.line_context.createLinearGradient(0, 0, this.blockSize.Witdh, 0);
        this.lineargradiente_black = this.line_context.createLinearGradient(0, 0, 0, this.blockSize.Heigth);
        this.lineargradiente_white.addColorStop(0, 'rgba(255,255,255,1)');
        this.lineargradiente_white.addColorStop(1, 'rgba(255,255,255,0)');
        this.lineargradiente_black.addColorStop(0, 'rgba(0,0,0,0)');
        this.lineargradiente_black.addColorStop(1, 'rgba(0,0,0,1)');                
        this._renderFillStyle(this.block_context, this.lineargradiente_white, this.blockSize);
        this._renderFillStyle(this.block_context, this.lineargradiente_black, this.blockSize);
    }
    
    this._renderFillStyle = function(Context, FillStyle, Size){
        Context.fillStyle = FillStyle;
        Context.fillRect(0, 0, Size.Witdh, Size.Heigth);
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
FillList = function(){
    this._fillPointers = [];

    this.AddFill = function(Number, Value){
        this._fillPointers.push({ Number : Number, Value : Value });
    }    

    this.FillStyle = function(LinearGradiente) {
         this._fillPointers.forEach(function(element) {
             LinearGradiente.addColorStop(element.Number, element.Value);
         }, this);
    }
}