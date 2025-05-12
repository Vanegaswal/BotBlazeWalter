import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Select, message, Spin } from 'antd';
import { getAllProducts } from '../services/productService';
import { createInventoryTransaction } from '../services/InventroyService';
import type { Product } from '../api/types/product';
import type { InventoryTransactionDTO } from '../api/types/inventoryTransaxtion';

const { Option } = Select;

const InventoryForm = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await getAllProducts('');
      setProducts(result);
    } catch (error) {
      message.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true); // Activar el spinner

    const payload: InventoryTransactionDTO = {
      productId: values.productId,
      quantity: values.quantity,
      transactionType: values.transactionType,
    };

    try {
      // Enviar la transacción de inventario
      await createInventoryTransaction(payload);
      message.success('Transacción registrada con éxito');
      form.resetFields();

      // Actualizar los productos después de la transacción
      await fetchProducts();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al registrar transacción';
      message.error(errorMessage);
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  return (
    <div>
      <h2>Registrar Transacción de Inventario</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="productId" label="Producto" rules={[{ required: true, message: 'Seleccione un producto' }]}>
          <Select placeholder="Seleccione un producto" loading={loading}>
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="transactionType" label="Tipo de Transacción" rules={[{ required: true, message: 'Seleccione un tipo' }]}>
          <Select placeholder="Seleccione tipo">
            <Option value="IN">IN - Entrada</Option>
            <Option value="OUT">OUT - Salida</Option>
          </Select>
        </Form.Item>

        <Form.Item name="quantity" label="Cantidad" rules={[{ required: true, message: 'Ingrese una cantidad' }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InventoryForm;
