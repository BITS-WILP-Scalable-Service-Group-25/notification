const { Queue } = require('bullmq');
const { connection, queueOptions } = require('../config/queues');

class PriorityQueue {
  constructor() {
    this.highPriority = new Queue('notification-high', queueOptions);
    this.mediumPriority = new Queue('notification-medium', queueOptions);
    this.lowPriority = new Queue('notification-low', queueOptions);
  }

  async add(notification) {
    const { priority = 'medium', ...data } = notification;
    
    const queue = this.getQueueByPriority(priority);
    await queue.add('process-notification', data, {
      priority: this.getPriorityValue(priority),
    });
    
    return { queue: queue.name, data };
  }

  getQueueByPriority(priority) {
    switch (priority) {
      case 'high': return this.highPriority;
      case 'low': return this.lowPriority;
      default: return this.mediumPriority;
    }
  }

  getPriorityValue(priority) {
    switch (priority) {
      case 'high': return 1;
      case 'medium': return 2;
      case 'low': return 3;
      default: return 2;
    }
  }
}

module.exports = new PriorityQueue();