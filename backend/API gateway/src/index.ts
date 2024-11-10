import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 5000;

const endpoints = {
  user: process.env.USER_API_BASE_URL,
  admin: process.env.ADMIN_API_BASE_URL ,
};

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());

app.all('/user/*', async (req: Request, res: Response) => {
  try {
    console.log("here its woriking")
    const targetUrl = `${endpoints.user}${req.path.replace('/user', '')}`;

    const response = await axios({
      method: req.method as 'GET' | 'POST' | 'PUT' | 'DELETE', 
      url: targetUrl,
      data: req.body,  
      headers: req.headers,  
      params: req.query, 
      timeout: 30000,
    });

      res.status(response.status).send(response.data);

  } catch (error: any) {
    console.error('Error in /user/* proxy route:', error.message || error);

    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.all('/admin/*', async (req: Request, res: Response) => {
  try {
    const targetUrl = `${endpoints.admin}${req.path.replace('/admin', '')}`;

    const response = await axios({
      method: req.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
      url: targetUrl,
      data: req.body,
      headers: req.headers,
      params: req.query,
      timeout: 10000,
    });

    res.status(response.status).send(response.data);

  } catch (error: any) {
    console.error('Error in /admin/* proxy route:', error.message || error);

    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});
