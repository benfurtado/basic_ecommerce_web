import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

export async function seedProducts(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(Product);

  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and long battery life',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      stock: 50,
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and notifications',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      stock: 30,
    },
    {
      name: 'Laptop Stand',
      description: 'Ergonomic aluminum laptop stand for better posture and workspace organization',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      stock: 100,
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with cherry MX switches and customizable backlighting',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      stock: 40,
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with long battery life and precise tracking',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      stock: 75,
    },
    {
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1587825147138-34637a8c5c5e?w=500',
      stock: 60,
    },
  ];

  for (const productData of products) {
    const existingProduct = await productRepository.findOne({
      where: { name: productData.name },
    });

    if (!existingProduct) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
      console.log(`✓ Added product: ${productData.name}`);
    } else {
      console.log(`- Product already exists: ${productData.name}`);
    }
  }

  console.log('Products seeding completed!');
}
