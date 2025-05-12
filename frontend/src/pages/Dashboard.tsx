import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  return (
    <Card>
      <Title level={2}>Bienvenido al Dashboard</Title>
      <Paragraph>
        Selecciona una opción en el menú para comenzar. Puedes gestionar productos, revisar estadísticas y más.
      </Paragraph>
    </Card>
  );
};

export default Dashboard;