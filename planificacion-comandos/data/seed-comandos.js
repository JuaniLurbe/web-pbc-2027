// Respaldo de estructura y nómina inicial de los 3 Comandos (sincronizado con Supabase Postgres)
window.PBC_COMANDOS_SEED = {
  campamento: {
    nombre: 'Protagonistas del Bien Común 2027',
    fechas: '15 al 22 de enero de 2027',
    sede: 'Hotel Savoia Mendoza'
  },
  comandos: [
    { id: 'formacion', nombre: 'Comando de Formación', rol: 'Mensaje, doctrina y charlas' },
    { id: 'disciplinas', nombre: 'Comando de Disciplinas', rol: 'Aplicación práctica y experiencias' },
    { id: 'liturgia', nombre: 'Comando de Liturgia', rol: 'Vida espiritual e imagen de Nehemías' }
  ],
  equipoInicial: {
    coordinacion: [
      { name: 'Mil. Ignacio Martínez', role: 'Jefe de Campamento' },
      { name: 'Pablo Gaete', role: 'Maestro' },
      { name: 'Federico Rossini', role: 'Sacerdote' },
      { name: 'Matías Poccioni', role: 'Sacerdote' },
      { name: 'Leonor Aguilar', role: 'Caterina' }
    ],
    formacion: [
      { name: 'Mil. Tomás Perelló', role: 'Jefe' },
      { name: 'Mil. Victoria Sammartino', role: 'Integrante' },
      { name: 'Mil. Luz Fernandez', role: 'Integrante' },
      { name: 'Mil. Kimberly Medinilla', role: 'Integrante' },
      { name: 'Mil. Mateo Ramirez', role: 'Integrante' }
    ],
    liturgia: [
      { name: 'Mil. Juani Lurbe', role: 'Jefe' },
      { name: 'Mil. Ana Clara Ponce', role: 'Integrante' },
      { name: 'Mil. José Diaz', role: 'Integrante' },
      { name: 'Mil. Agustín Montes', role: 'Integrante' },
      { name: 'Mil. Guadalupe Baccaro', role: 'Integrante' }
    ],
    disciplinas: [
      { name: 'Mil. Rosario Calvi', role: 'Jefe' },
      { name: 'Mil. Ro Guerra', role: 'Integrante' },
      { name: 'Mil. Karen Silva', role: 'Integrante' },
      { name: 'Mil. Guada Varela', role: 'Integrante' },
      { name: 'Mil. Lucía Sivero', role: 'Integrante' },
      { name: 'Mil. Paula Alvarez', role: 'Integrante' }
    ]
  }
};
