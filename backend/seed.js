import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ✅');

    await Product.deleteMany({});
    console.log('Cleared old products');

    const sampleProducts = [
      {
        name: 'Wireless Headphones',
        price: 4999,
        image: 'https://via.placeholder.com/300x300?text=Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        stock: 50,
      },
      {
        name: 'Laptop Stand',
        price: 1999,
        image: 'https://via.placeholder.com/300x300?text=Laptop+Stand',
        description: 'Adjustable aluminum laptop stand for better posture',
        category: 'Accessories',
        stock: 75,
      },
      {
        name: 'USB-C Cable',
        price: 499,
        image: 'https://via.placeholder.com/300x300?text=USB+Cable',
        description: 'Durable USB-C charging cable, 2 meters long',
        category: 'Cables',
        stock: 200,
      },
      {
        name: 'Mechanical Keyboard',
        price: 7999,
        image: 'https://via.placeholder.com/300x300?text=Keyboard',
        description: 'RGB Mechanical Keyboard with custom switches',
        category: 'Electronics',
        stock: 40,
      },
      {
        name: 'Wireless Mouse',
        price: 2499,
        image: 'https://via.placeholder.com/300x300?text=Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        category: 'Electronics',
        stock: 100,
      },
      {
        name: 'Phone Case',
        price: 799,
        image: 'https://via.placeholder.com/300x300?text=Phone+Case',
        description: 'Protective phone case with shock absorption',
        category: 'Accessories',
        stock: 150,
      },
    ];

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ ${inserted.length} products added to database!`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();