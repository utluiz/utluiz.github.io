//inicializa brython
brython();

// Cria objeto que vai monitorar alterações no DOM
function criaObserver(el) {
    var observer = new MutationObserver(function(mutations) {
        // Loop sobre as mutações detectadas
        mutations.forEach(function(mutation) {

            // Inserção de nós aparecem em addedNodes
            var node = mutation.addedNodes[0];

            // Achou um script
            if(node && node.tagName === 'SCRIPT' && node.type === 'text/pyscript') {
            	console.log('encontrado pyscript')
            	var $src;
            	//console.log(node.textContent || node.innerText)
                // TODO: implementar chamada ajax síncrona (argh!) para pegar o código
                if(node.src!=='') {
                	// get source code by an Ajax call
                    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                       var $xmlhttp=new XMLHttpRequest();
                    }else{// code for IE6, IE5
                       var $xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    $xmlhttp.open('GET',node.src,false)
                    $xmlhttp.send()
                    
                    if($xmlhttp.readyState===4 && $xmlhttp.status===200){
                        $src = $xmlhttp.responseText
                    }
                    if ($src === undefined) { // houston, we have a problem!!!
                        console.log('erro ao carregar script')
                        return;
                     }
                } else {
                	$src = node.textContent || node.innerText;
                }
                
                // see https://bitbucket.org/olemis/brython/src/bafb482fb6ad42d6ffd2123905627148e339b5ce/src/py2js.js?at=default

                // Passa o código para ser interpretado
                __BRYTHON__.$py_module_path['__main__'] = window.location.href;
                var $root=__BRYTHON__.py2js($src,'__main__');
                $src = $root.to_js();
                
                // eval in global scope
                if (window.execScript) {
                   window.execScript($src);
                   return;
                }
                       
                var fn = function() {
                    window.eval.call(window,$src);
                };
                fn();
            } 
        });    
    });

    // Inicia o observer, configurando-o para monitorar inserções de nós em qualquer nível
    observer.observe(el, { childList: true, subtree: true })
    return observer; 
}

var observer = criaObserver(document);