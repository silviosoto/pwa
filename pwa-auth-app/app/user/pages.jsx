"use client";
import { withAuth } from '../../utils/withAuth';
import Layout from '../../components/layout/Layout';
import { ROLES } from '../../utils/constants';

const UserPanel = () => {
  return (
    <Layout>
      <div className="user-panel">
        <h1>Área de Usuario</h1>
        <p>Visible para todos los usuarios autenticados</p>
        {/* Contenido para usuarios regulares */}
      </div>
    </Layout>
  );
};

export default withAuth(UserPanel, [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]);