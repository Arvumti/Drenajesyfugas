<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="utf-8" />
    
    <title>Chat</title>
    
    <link rel="stylesheet" href="style.css" type="text/css" />
    
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="chat.js"></script>
    <script type="text/javascript">
    
        // Nombre del usuario 
        var name = prompt("Ingresa tu nombre:", "Invitado");
        
        // Nombre por defaul invitado
    	if (!name || name === ' ') {
    	   name = "Invitado";	
    	}
    	
    	name = name.replace(/(<([^>]+)>)/ig,"");
    	
    	// mostrar nombre en la pagina
    	$("#name-area").html("Tu: <span>" + name + "</span>");
    	
    	
        var chat =  new Chat();
    	$(function() {
    	
    		 chat.getState(); 
    		 
             $("#sendie").keydown(function(event) {  
             
                 var key = event.which;  
           
                 //todas las entradas incluyendo return
                 if (key >= 33) {
                   
                     var maxLength = $(this).attr("maxlength");  
                     var length = this.value.length;  
                     
                     // no poner contenido si excede el tamaño
                     if (length >= maxLength) {  
                         event.preventDefault();  
                     }  
                  }  
                																																												});
    		 // ver textarea 
    		 $('#sendie').keyup(function(e) {	
    		 					 
    			  if (e.keyCode == 13) { 
    			  
                    var text = $(this).val();
    				var maxLength = $(this).attr("maxlength");  
                    var length = text.length; 
                     
                    // enviar
                    if (length <= maxLength + 1) { 
                     
    			        chat.send(text, name);	
    			        $(this).val("");
    			        
                    } else {
                    
    					$(this).val(text.substring(0, maxLength));
    					
    				}	
    				
    				
    			  }
             });
            
    	});
    </script>

</head>

<body onload="setInterval('chat.update()', 1000)">

    <div id="page-wrap">
    
        <h2>Chatea con Nosotros</h2>
        
        <p id="name-area"></p>
        
        <div id="chat-wrap"><div id="chat-area"></div></div>
        
        <form id="send-message-area">
            <p>Tu mensaje: </p>
            <textarea id="sendie" maxlength = '100' ></textarea>
        </form>
    
    </div>

</body>

</html>