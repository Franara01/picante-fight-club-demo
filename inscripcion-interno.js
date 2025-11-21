import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inscripcion-form');
  const btnVolver = document.querySelector('.btn-volver');

  btnVolver.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const peleas = Number(formData.get('peleas'));
    const clase = peleas > 5 ? 'A' : 'B';

    const data = {
      nombre: formData.get('nombre'),
      dni: formData.get('dni'),
      email: formData.get('email'),
      sexo: formData.get('sexo'),
      edad: Number(formData.get('edad')),
      peleas,
      clase,  // lógica ya aplicada
      modalidad: formData.get('modalidad'),
      deporte: formData.get('deporte'),
      abono: formData.get('abono') === 'si',
      profe: formData.get('profe')
    };


    const { error } = await supabase
      .from('inscripcion_interno')
      .insert([data]);

    if (error) {
      alert('Error al inscribir: ' + error.message);
    } else {
      alert('Inscripción realizada con éxito.');
      form.reset();
    }
  });
});
