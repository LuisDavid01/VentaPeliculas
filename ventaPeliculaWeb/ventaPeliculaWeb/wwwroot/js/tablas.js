$(document).ready(function () {
    // Verificar si jQuery está cargado
    if (typeof jQuery === 'undefined') {
        console.error('jQuery no está cargado.');
        return;
    }

    // Verificar si DataTable está definido
    if (typeof $.fn.DataTable === 'undefined') {
        console.error('DataTables no está cargado.');
        return;
    }

    // Inicializar DataTables
    $('#myTable').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json'
        },
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        columnDefs: [
            { orderable: false, targets: -1 } // Deshabilitar ordenamiento en la columna de acciones
        ]
    });

    // Confirmación de eliminación con SweetAlert2
    $('.delete-form').on('submit', function (e) {
        e.preventDefault();
        var form = this;
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres eliminar esta promoción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            }
        });
    });
});