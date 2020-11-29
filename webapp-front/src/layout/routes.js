import React from 'react';

const Inicio = React.lazy(() => import('../pages/Inicio.js'));
const Drogas = React.lazy(() => import('../pages/Drogas.js'));
const DrogasDetalles = React.lazy(() => import('../pages/DrogasDetalles.js'));

const routes = [
  { path: '/', exact: true, name: 'Inicio', component: Inicio },
  { path: '/drugs', exact: true, name: 'Drogas', component: Drogas },
  { path: '/drugs/:id', name: 'Detalles', component: DrogasDetalles },
];

export default routes;
