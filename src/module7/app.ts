import express from 'express';
import connectDB from './mongoose';
import { validateUserId } from './common/middlewares/authMiddleware';
import userRouter from './User/UserRoutes';
import productRoutes from './Product/ProductRoutes';
import cartRoutes from './Cart/CartRoutes';

const app = express();
connectDB();

app.use(express.json());

app.use((req, res, next) => {
  validateUserId(req, res, next);
});

app.use('/api/users', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/profile/cart', cartRoutes);

export default app;
