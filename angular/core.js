angular.module('MainApp', [])

function mainController($scope, $http) {
	$scope.newPersona = {};
	$scope.personas = {};
	$scope.selected = false;

	// Obtenemos todos los datos de la base de datos
	$http.get('/api/persona').success(function(data) {
		console.log('personas data: ', data);
		$scope.personas = data;
	})
	.error(function(data) {
		console.log('Error (get): ' + data);
	});

	// Función para registrar a una persona
	$scope.registrarPersona = function() {
		$http.post('/api/persona', $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {}; // Borramos los datos del formulario
				$scope.personas = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para editar los datos de una persona
	$scope.modificarPersona = function(newPersona) {
		$http.put('/api/persona/' + $scope.newPersona._id, $scope.newPersona)
		.success(function(data) {
				$scope.newPersona = {}; // Borramos los datos del formulario
				$scope.personas = data;
				$scope.selected = false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que borra un objeto persona conocido su id
	$scope.borrarPersona = function(newPersona) {
		$http.delete('/api/persona/' + $scope.newPersona._id)
		.success(function(data) {
			$scope.newPersona = {};
			$scope.personas = data;
			$scope.selected = false;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectPerson = function(persona) {
		$scope.newPersona = persona;
		$scope.selected = true;
		console.log($scope.newPersona, $scope.selected);
	};

  $scope.submitFormulario = function() {
    console.log('click.');
    // if(this.myForm.invalid){
    //   Object.values(this.myForm.controls).forEach(control=>{
    //     control.markAllAsTouched();
    //   });
    //   return;
    // }

    // if(!this.loginPrd.ingresarAplicativo(this.myForm.value)){
    //   alert("Usuario o contraseña invalido");
    // }
  }


}
