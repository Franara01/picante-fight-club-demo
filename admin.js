// admin.js
document.addEventListener('DOMContentLoaded', () => {
  const inscripcionesBtn = document.getElementById('btn-inscripciones');
  if (inscripcionesBtn) {
    inscripcionesBtn.addEventListener('click', () => {
      window.location.href = 'inscripcion-interno.html';
    });
  }
});
