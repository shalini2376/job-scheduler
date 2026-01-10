const db = require('../database/db');
const {triggerWebhook} = require('../services/webhook.service')

exports.createJob = (req, res) => {
    const {taskName, payload, priority } = req.body;

    if (!taskName || !priority) {
        return res.status(400).json({error: 'Task name and priority required'});
    }
    const payloadString  = payload ? JSON.stringify(payload) : '{}';

    db.run(
        `INSERT INTO jobs (taskName, payload, priority, status) 
        VALUES (?, ?, ?, 'pending')`, [taskName, payloadString, priority],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({id: this.lastID, message: 'Job created'});
        }
    );
};

exports.getJobs = (req, res) => {
    const {status, priority} = req.query;

    let query = 'SELECT * FROM jobs WHERE 1=1';
    let params = [];

    if (status){
        query += ' AND status = ?';
        params.push(status);
    }

    if (priority) {
        query += ' AND priority = ?';
        params.push(priority)
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
}

exports.getJobById = (req, res) => {
    const {id} = req.params;

    db.get(`SELECT * FROM jobs WHERE id = ?`, [id], (err, row) => {
        if (!row) return res.status(404).json({error: 'Job not found'});
        res.json(row)
    });
};

exports.runJob = (req, res) => {
    const {id} = req.params;

    db.get(`SELECT * FROM jobs WHERE id = ?`, [id], (err, job) => {
        if (!job) return res.status(404).json({error: 'Job not found'});

        if (job.status !== 'pending'){
            return res.status(400).json({error: 'Job already processed'});
        }

        db.run(`UPDATE jobs SET status='running', updatedAt=CURRENT_TIMESTAMP WHERE id=?`,[id]);

        //  simulate background work
        setTimeout(() => {
            db.run(`UPDATE jobs SET status='completed', completedAt=CURRENT_TIMESTAMP WHERE id=?`,[id],
            () => {
                // console.log(`Job ${job.id} completed`);
                triggerWebhook(job);
            }
            );
        }, 3000);
        res.json({message: 'Job started'});
    })
};