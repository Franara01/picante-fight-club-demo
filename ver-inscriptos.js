// ver-inscriptos.js
import { supabase } from './supabaseClient.js';

let inscriptos = [];

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('tabla-inscriptos');
  const btnDescargar = document.getElementById('btn-descargar');

  const { data, error } = await supabase.from('inscripcion_interno').select('*');
  inscriptos = data || [];

  if (error) {
    contenedor.textContent = 'Error al obtener inscriptos: ' + error.message;
    return;
  }

  if (!inscriptos.length) {
    contenedor.textContent = 'No hay ningún inscripto.';
    btnDescargar.style.display = 'none';
    return;
  }

  // Crear tabla HTML
  const tabla = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>#</th>
      <th>Nombre</th>
      <th>DNI</th>
      <th>Sexo</th>
      <th>Edad</th>
      <th>Peleas</th>
      <th>Clase</th>
      <th>Modalidad</th>
      <th>Deporte</th>
      <th>Abono</th>
      <th>Profe</th>
      <th> </th>
    </tr>
  `;

  const tbody = document.createElement('tbody');
  inscriptos.forEach((item, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nombre}</td>
      <td>${item.dni}</td>
      <td>${item.sexo}</td>
      <td>${item.edad}</td>
      <td>${item.peleas}</td>
      <td>${item.clase}</td>
      <td>${item.modalidad}</td>
      <td>${item.deporte}</td>
      <td>${item.abono ? 'Sí' : 'No'}</td>
      <td>${item.profe}</td>
      <td><button class="btn-eliminar" data-id="${item.id}">Eliminar</button></td>
    `;
    tbody.appendChild(fila);
  });

  tabla.appendChild(thead);
  tabla.appendChild(tbody);
  contenedor.innerHTML = '';
  contenedor.appendChild(tabla);

  // Botones eliminar
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      const confirmar = confirm('¿Eliminar esta inscripción?');
      if (!confirmar) return;

      const { error } = await supabase
        .from('inscripcion_interno')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Error al eliminar: ' + error.message);
      } else {
        alert('Inscripción eliminada.');
        location.reload(); // refresca la tabla
      }
    });
  });

  // Descargar Excel
  btnDescargar.addEventListener('click', () => {
    const datosParaExcel = inscriptos.map((item, i) => ({
      N: i + 1,
      Nombre: item.nombre,
      DNI: item.dni,
      Sexo: item.sexo,
      Edad: item.edad,
      Peleas: item.peleas,
      Clase: item.clase,
      Modalidad: item.modalidad,
      Deporte: item.deporte,
      Abono: item.abono ? 'Sí' : 'No',
      Profe: item.profe,
    }));

    const ws = XLSX.utils.json_to_sheet(datosParaExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inscriptos');
    XLSX.writeFile(wb, 'Inscriptos_Interno.xlsx');
  });
});
