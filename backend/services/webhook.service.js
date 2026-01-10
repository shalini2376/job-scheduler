const axios = require('axios');

const webhookUrl  = process.env.WEBHOOK_URL;

exports.triggerWebhook = async (job) => {
  let parsedPayload = {};

  try {
    // SAFE parsing
    if (job.payload) {
      parsedPayload =
        typeof job.payload === 'string'
          ? JSON.parse(job.payload)
          : job.payload;
    }

    await axios.post(webhookUrl , {
      jobId: job.id,
      taskName: job.taskName,
      status: 'completed',
      priority: job.priority,
      payload: parsedPayload,
      completedAt: new Date()
    });
    
    console.log(`✅ Webhook sent successfully for job ${job.id}`);
  } catch (error) {
    if (error.response) {
        console.error(`Webhook failed for job ${job.id}:`,
        error.response.status);
  }else {
    console.error(`Webhook failed for job ${job.id}`);
  }
  }
};
