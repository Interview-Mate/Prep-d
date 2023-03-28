 //@ts-nocheck
import { config } from 'dotenv';
config();
import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import axios from 'axios';

jest.mock('axios');

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('punctuate', () => {
  it('should punctuate the text and return the result', async () => {
    const mockResponse = 'Hello, world!';
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
    const response = await request(app)
      .post('/punctuate')
      .send({ text: 'Hello world' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"punctuatedText": "Hello, world!"});
  });

  it('should return an error if something goes wrong', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Axios error'));
    const response = await request(app)
      .post('/punctuate')
      .send({ text: 'Hello world' });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});