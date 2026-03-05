import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Bot } from './bot.js';
import Appointment from './models/Appointment.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/appointments';

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Запись не найдена' });
    }
    res.json({ message: 'Запись удалена', appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { telegramId, name, appointmentTime } = req.body;
    
    const existing = await Appointment.findOne({ telegramId });
    if (existing) {
      existing.name = name;
      existing.appointmentTime = appointmentTime;
      await existing.save();
      return res.json(existing);
    }
    
    const appointment = new Appointment({ telegramId, name, appointmentTime });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

global.createAppointment = async (telegramId, name, appointmentTime) => {
  try {
    const existing = await Appointment.findOne({ telegramId });
    if (existing) {
      existing.name = name;
      existing.appointmentTime = new Date(appointmentTime);
      await existing.save();
      return existing;
    }

    const appointment = new Appointment({
      telegramId,
      name,
      appointmentTime: new Date(appointmentTime)
    });
    await appointment.save();
    return appointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

const botToken = process.env.TELEGRAM_BOT_TOKEN;
if (botToken) {
  const bot = new Bot(botToken);
  bot.start();
} else {
  console.warn('⚠️ TELEGRAM_BOT_TOKEN not set, bot disabled');
}

process.once('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
});
