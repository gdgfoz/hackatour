(function() {
  'use strict';

  angular
    .module('gdgfoz.hackatour', [])
    .controller('MainController', MainController);

  function MainController($scope) {

    //data
    var vm = this;
    var uid = null;
    var cadastroRef = new Firebase("https://hackatour.firebaseio.com/cadastros");

    vm.msg = {
      text  :null,
      status:true
    };

    vm.row = {
      name  : null,
      email : null
    };

    //Methods
    vm.register = register;

    activate();
    //-----------------------------------------------

    function activate()
    {
        logout();
        authenticate();
    }

    function authenticate()
    {
        cadastroRef.authAnonymously(function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);

            } else {
              uid = authData.uid;
              console.log("Login success!", uid);

            }
        });
    }

    function logout()
    {
       cadastroRef.unauth();
       uid = null;
    }

    function register()
    {
        if ( ! uid ) {
           vm.msg =  {text:"Problemas ao registrar", status : false};
        } else{
           vm.msg =  {text:"Obrigada por se registrar", status : true};
        }

        var now = new Date();
        vm.row.created_at = now.toString();        
        var r = cadastroRef.child(uid).set(vm.row);
        activate();
    }


  }


})();
