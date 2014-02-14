/**
 * For some implementation details of Brython, see:
 * https://bitbucket.org/olemis/brython/src/bafb482fb6ad42d6ffd2123905627148e339b5ce/src/py2js.js?at=default
 */ 

//init brython
brython();

//create observer instance
var mutationObserver = new MutationObserver(function(mutations) {
	
	//iterate over document changes
    mutations.forEach(function(mutation) {

    	//get new node
        var node = mutation.addedNodes[0];

        //checks if is the type we want
        if(node && node.tagName === 'SCRIPT' && node.type === 'text/pyscript') {
        	
        	//test log
        	console.log('encontrado pyscript')
        	
        	//python source
        	var $src;
        	
<<<<<<< HEAD
            //If src attribute is found, do a synchronous ajax to get 
=======
            //If `src` is found, do a synchronous ajax to get 
>>>>>>> refs/remotes/origin/master
        	//the code in order to execute it immediately
            if (node.src!=='') {
            	
                if (window.XMLHttpRequest){
                	// code for IE7+, Firefox, Chrome, Opera, Safari
                    var $xmlhttp = new XMLHttpRequest();
                } else {
                	// code for IE6, IE5
                    var $xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                $xmlhttp.open('GET', node.src, false)
                $xmlhttp.send()
                if ($xmlhttp.readyState === 4 && $xmlhttp.status === 200) {
                    $src = $xmlhttp.responseText
                }
                if ($src === undefined) { // houston, we have a problem!!!
                    console.log('Erro ao carregar script: ' + node.src)
                    return;
                }
                
            } else {
            	
            	//without src, source is tag content
            	$src = node.textContent || node.innerText;
            	
            }
            
            //python -> javascript
            __BRYTHON__.$py_module_path['__main__'] = window.location.href;
            var $root = __BRYTHON__.py2js($src, '__main__');
            var $jssrc = $root.to_js();
            
            //eval in global scope
            if (window.execScript) {
               window.execScript($jssrc);
               return;
            }
            
            //fix for old browsers
            var fn = function() {
                window.eval.call(window, $jssrc);
            };
            fn();
        } 
    });    
});

//init observer, monitoring changes in all nodes of any level
<<<<<<< HEAD
mutationObserver.observe(document, { childList: true, subtree: true })
=======
mutationObserver.observe(el, { childList: true, subtree: true })
>>>>>>> refs/remotes/origin/master

