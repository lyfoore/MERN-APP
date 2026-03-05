import TelegramBot from 'node-telegram-bot-api';

export class Bot {
  constructor(token) {
    this.bot = new TelegramBot(token, { polling: true, baseApiUrl: 'https://api.telegram.org' });
    this.userStates = new Map();
  }

  start() {
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;

      this.userStates.set(chatId, { step: 'waiting_name' });

      await this.bot.sendMessage(
        chatId,
        '👋 Добро пожаловать!\n\nПожалуйста, введите ваше имя:'
      );
    });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;
      const state = this.userStates.get(chatId);

      if (text?.startsWith('/')) return;

      if (!state) return;

      if (state.step === 'waiting_name') {
        if (!text || text.trim().length < 2) {
          await this.bot.sendMessage(chatId, '❌ Имя должно быть не менее 2 символов. Введите имя:');
          return;
        }

        state.name = text.trim();
        state.step = 'waiting_time';

        await this.bot.sendMessage(
          chatId,
          `✅ Имя принято: ${state.name}\n\nТеперь введите время записи в формате:\n📅 ДД.ММ.ГГГГ ЧЧ:ММ\n\nПример: 15.03.2026 14:30`
        );
      } else if (state.step === 'waiting_time') {
        const timeParsed = this.parseDateTime(text);

        if (!timeParsed) {
          await this.bot.sendMessage(
            chatId,
            '❌ Неверный формат времени.\nИспользуйте формат: ДД.ММ.ГГГГ ЧЧ:ММ\nПример: 15.03.2026 14:30'
          );
          return;
        }

        if (timeParsed < new Date()) {
          await this.bot.sendMessage(chatId, '❌ Нельзя записаться на прошедшее время. Введите будущее время:');
          return;
        }

        state.appointmentTime = timeParsed;

        try {
          await global.createAppointment?.(
            String(chatId),
            state.name,
            state.appointmentTime
          );

          await this.bot.sendMessage(
            chatId,
            `✅ Вы успешно записаны!\n\n👤 Имя: ${state.name}\n📅 Время: ${this.formatDateTime(state.appointmentTime)}\n\nЖдём вас!`
          );

          this.userStates.delete(chatId);
        } catch (error) {
          await this.bot.sendMessage(chatId, '❌ Произошла ошибка при записи. Попробуйте позже.');
          console.error('Bot error:', error);
        }
      }
    });

    console.log('🤖 Telegram bot started');
  }

  parseDateTime(text) {
    const regex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})\s+(\d{1,2}):(\d{2})$/;
    const match = text?.match(regex);
    
    if (!match) return null;

    const [, day, month, year, hours, minutes] = match;
    const date = new Date(year, month - 1, day, hours, minutes);
    
    if (isNaN(date.getTime())) return null;
    
    return date;
  }

  formatDateTime(date) {
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
