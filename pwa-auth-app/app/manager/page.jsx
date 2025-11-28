"use client";
import { withAuth } from '../../utils/withAuth';
import Layout from '../../components/layout/Layout';
import { ROLES } from '../../utils/constants';

const ManagerPanel = () => {
  return (
    <Layout>
      <div className="manager-panel">
        <h1>Panel de Gestión</h1>
        <p>Visible para ADMIN y MANAGER</p>
        {/* Contenido específico del manager */}
      </div>
    </Layout>
  );
};

export default withAuth(ManagerPanel, [ROLES.ADMIN, ROLES.MANAGER]);