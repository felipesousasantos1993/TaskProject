$(document).ready(function() {
	$('.datatable').DataTable();
	$('.data-hora').mask('00/00/0000 00:00')
	$('.selectpicker').selectpicker({
		 showTick: true,
		 doneButton: true,
    	doneButtonText: 'Fechar'
	});
	$('[data-toggle="tooltip"]').tooltip();
	$('.datepicker').datetimepicker({
		locale: 'pt-BR'
	});
} );