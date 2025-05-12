// src/pages/Products.tsx
import React, { useEffect, useState } from 'react';
import { deleteProduct, getAllProducts, updateProduct, createProduct } from '../services/productService';
import { Table, Button, message, Modal, Form, Input, InputNumber } from 'antd';
import type { Product, ProductsCreate } from '../api/types/product';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts('');
      setProducts(data);
    } catch (error) {
      message.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const deleteProductHandler = async (id: number) => {
    try {
      await deleteProduct(id);
      message.success('Producto eliminado');
      fetchProducts();
    } catch (error) {
      message.error('Error al eliminar el producto');
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    form.setFieldsValue(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, { ...selectedProduct, ...values });
        message.success('Producto actualizado correctamente');
      } else {
        const newProduct: ProductsCreate = { ...values };
        await createProduct(newProduct);
        message.success('Producto agregado correctamente');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      message.error('Error al guardar el producto');
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Precio', dataIndex: 'unitPrice' },
    { title: 'Cantidad Inicial', dataIndex: 'initialQuantity' },
    { title: 'Cantidad Disponible', dataIndex: 'availableQuantity' },
    {
      title: 'Acciones',
      render: (_: any, record: Product) => (
        <div>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Editar
          </Button>
          <Button danger onClick={() => deleteProductHandler(record.id)} style={{ marginLeft: '10px' }}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Productos</h1>
      <Button type="primary" onClick={openAddModal} style={{ marginBottom: '16px' }}>
        Agregar Producto
      </Button>
      <Table columns={columns} dataSource={products} loading={loading} rowKey="id" />

      <Modal
        title={selectedProduct ? 'Editar Producto' : 'Agregar Producto'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingrese un nombre' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Descripción" name="description" rules={[{ required: true, message: 'Ingrese una descripción' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Precio" name="unitPrice" rules={[{ required: true, message: 'Ingrese un precio' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Cantidad Inicial" name="initialQuantity" rules={[{ required: true, message: 'Ingrese la cantidad inicial' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Cantidad Disponible" name="availableQuantity" rules={[{ required: true, message: 'Ingrese la cantidad disponible' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
