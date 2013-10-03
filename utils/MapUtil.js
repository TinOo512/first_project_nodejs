if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
(function (define) {
    define([], function () {
        var mapUtil = {
            sizeMap : 10,

            orthoToIso: function(Ortho){
                var Iso = Ortho;
                // x positif
                if (Iso.x > 0) {
                    if(Iso.x > this.sizeMap){
                        do{
                            Iso.x = Iso.x-(this.sizeMap);
                        }while(Iso.x > this.sizeMap);
                    }
                // x negatif
                } else {
                    Iso.x = Math.abs(Iso.x);
                    if(Iso.x > this.sizeMap){
                        do{
                            Iso.x = Math.abs(Iso.x-(this.sizeMap));
                        }while(Iso.x > this.sizeMap);
                    }
                    Iso.x = this.sizeMap-(Iso.x-1);
                }
                // y positif
                if (Iso.y > 0) {
                    if(Iso.y > this.sizeMap){
                        do{
                            Iso.y = Math.abs(Iso.y-(this.sizeMap));
                        }while(Iso.y > this.sizeMap);
                    }
                    Iso.y = this.sizeMap-(Iso.y-1);
                // y negatif
                } else {
                    Iso.y = Math.abs(Iso.y);
                    if(Iso.y > this.sizeMap){
                        do{
                            Iso.y = Iso.y-(this.sizeMap);
                        }while(Iso.y > this.sizeMap);
                    }
                }
                 
                return Iso;
            }, 
            
            getOrigin: function(pos){
                // x positif
                if (pos.x > 0) {
                    pos.x = (Math.ceil(pos.x/this.sizeMap) - 1)*this.sizeMap;
                // x negatif
                } else {
                    pos.x = Math.ceil((pos.x+1)/this.sizeMap)*this.sizeMap-10;
                }
                
                // y positif
                if (pos.y > 0) {
                    pos.y = Math.ceil(pos.y/this.sizeMap)*this.sizeMap;
                // y negatif
                } else {
                    pos.y = Math.ceil((pos.y+1)/this.sizeMap)*this.sizeMap;
                }
                
                return pos;
            }
        };
        return mapUtil;
    });
})(typeof define != "undefined" ? define : function () {
    var result = arguments[arguments.length - 1]();
    if ("undefined" != typeof(result)) {
        module.exports = result;
    }
});