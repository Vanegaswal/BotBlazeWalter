import { Layout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { removeToken } from '../api/jwt';



const { Header, Content, Footer, Sider } = Layout;

export const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: 16, color: 'white', textAlign: 'center' }}>Wevt</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="productos">
            <Link to="/productos">Productos</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout} danger>
            Cerrar sesión
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>Sistema de Gestión</h2>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Wevt ©2025</Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;