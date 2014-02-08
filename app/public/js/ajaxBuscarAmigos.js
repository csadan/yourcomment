
function buscarAmigos(that){    
        $.ajax("/findusers", 
                {  "type": "post",   // usualmente post o get
                    "data":{"expr":that.value},
                   "success": function(result) {
                                    $("#content-inner").html(result);
                    },
                   "error": function(result) {
                                console.error("Se ha producido un error: ", result);
                    },
                    "async": true,
                })};
