"use client";
import { withAuth } from '../../utils/withAuth';
import Layout from '../../components/layout/Layout';
import { ROLES } from '../../utils/constants';

const AdminPanel = () => {
  return (
    <Layout>
      <div className="admin-panel">
        <h1>Panel de Administración</h1>
        <p>Solo visible para usuarios con rol ADMIN</p>
        {/* Contenido específico del admin */}
      </div>
    </Layout>
  );
};

export default withAuth(AdminPanel, [ROLES.ADMIN]);