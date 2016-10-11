var app = angular.module("taskApp",[]);
var SUCESSO = "success";
var ALERTA = "warning";



app.controller("taskController",  function($scope, $window, $http) { 

	$scope.prioridades  = [{ "value": 1, "text": "Baixa" }, { "value": 2, "text": "Normal" }, { "value": 3, "text": "Alta" }];
	$scope.situacoes  = [{ "value": 1, "text": "Nova" }, { "value": 2, "text": "En Andamento" }, { "value": 3, "text": "Fechada" }, { "value": 4, "text": "Reaberta" }];

	$scope.tarefa = new Object();
	$scope.tarefas = new Array();
	$scope.operacao = "I";

	$scope.msgs = new Object();
	$scope.msgs.msg = ""; 
	$scope.msgs.tipo = "";

	$scope.init = function () {
		$scope.tarefas = JSON.parse(localStorage.getItem("tarefas"));
		if (null == $scope.tarefas) {
			$scope.tarefas = new Array();
			return false;
		}

	}

	$scope.incluir = function () {		
		$scope.msgs = new Object();
		if($scope.taskForm.$invalid) {
			$scope.msgs.tipo = ALERTA;
			$scope.msgs.msg = "Favor preencher todos os campos.";
			return false;
		} 

		if ($scope.tarefas.length == 0) {
			$scope.tarefa.codigo = 1;
		} else {
			$scope.tarefa.codigo = $scope.tarefas[$scope.tarefas.length-1].codigo + 1;
		}
		$scope.tarefa.situacao = 1;	
		$scope.tarefas.push($scope.tarefa);

		localStorage.setItem("tarefas", JSON.stringify($scope.tarefas));

		$scope.msgs.msg = "Tarefa incluída com sucesso!";
		$scope.msgs.tipo = SUCESSO;

		$scope.tarefa = new Object();
	}

	$scope.alterar = function () {
		$scope.msgs = new Object();
		if($scope.taskForm.$invalid) {
			$scope.msgs.tipo = ALERTA;
			$scope.msgs.msg = "Favor preencher todos os campos.";
			return false;
		} 
		$scope.tarefas[$scope.index] = $scope.tarefa;
		localStorage.setItem("tarefas", JSON.stringify($scope.tarefas));

		$scope.msgs.msg = "Tarefa alterada com sucesso!";
		$scope.msgs.tipo = SUCESSO;	

		$scope.tarefa = new Object();
		$scope.operacao = "I";
	}

	$scope.excluir = function () {
		$scope.tarefas.splice($scope.index, 1);
		localStorage.setItem("tarefas", JSON.stringify($scope.tarefas));

		$scope.msgs.msg = "Tarefa excluida com sucesso!";
		$scope.msgs.tipo = SUCESSO;	
		$scope.operacao = "I";
		$scope.tarefa = new Object();
		$scope.msgs = new Object();
		$('#modalExcluir').modal('hide');
	}

	$scope.selecionar = function(tarefa, index, op) {
		$scope.tarefa.codigo = tarefa.codigo;
		$scope.tarefa.titulo = tarefa.titulo;
		$scope.tarefa.descricao = tarefa.descricao;
		$scope.tarefa.data = tarefa.data;
		$scope.tarefa.situacao = tarefa.situacao;
		$scope.tarefa.prioridade = tarefa.prioridade;
		$scope.index = index;

		$scope.operacao = op;
	}

	$scope.cancelar = function () {
		$scope.operacao = "I";
		$scope.tarefa = new Object();
	}
	
});


app.filter('zeroAEsquerda', function () {
	return function (n, len) {
		var num = parseInt(n, 10);
		len = parseInt(len, 10);
		if (isNaN(num) || isNaN(len)) {
			return n;
		}
		num = ''+num;
		while (num.length < len) {
			num = '0'+num;
		}
		return num;
	};
});