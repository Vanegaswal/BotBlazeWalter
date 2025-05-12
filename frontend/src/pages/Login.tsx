import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { login } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { username: string; password: string }) => {
    console.log('Valores del formulario:', values);
    setLoading(true);
    try {
      const result = await login(values.username, values.password);
      console.log('Login exitoso, respuesta:', result);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
      message.error('Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Por favor ingresa tu username' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Contraseña"
        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;