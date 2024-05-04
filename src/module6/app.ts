
import express from 'express';
import { validateUserId } from './middleware/authMiddleware';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  validateUserId(req, res, next);
});

app.use('/api/products', productRoutes);
app.use('/api/profile/cart', cartRoutes);

export default app;