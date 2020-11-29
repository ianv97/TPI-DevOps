import React from 'react';

const Inicio = React.lazy(() => import('../pages/Inicio.js'));
const Drogas = React.lazy(() => import('../pages/Drogas.js'));
const DrogasDetalles = React.lazy(() => import('../pages/DrogasDetalles.js'));
const Medicamentos = React.lazy(() => import('../pages/Medicamentos.js'));
const MedicamentosDetalles = React.lazy(() => import('../pages/MedicamentosDetalles.js'));

const routes = [
  { path: '/', exact: true, name: 'Inicio', component: Inicio },
  { path: '/drugs', exact: true, name: 'Drogas', component: Drogas },
  { path: '/drugs/:id', name: 'Detalles', component: DrogasDetalles },
  {
    path: '/medicines',
    exact: true,
    name: 'Medicamentos',
    component: Medicamentos,
  },
  {
    path: '/medicines/:id',
    name: 'Detalles',
    component: MedicamentosDetalles,
  },
];

export default routes;
