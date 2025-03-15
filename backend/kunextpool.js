const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const multer = require('multer');
const path = require('path');
const fs = require('fs');



const port = 8200

const app = express()

app.use(bodyparser.json())
app.use(cors())

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Your database password',
    database: 'kunext',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
    res.send('Server Started')
})

app.post('/login', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(); // ดึงการเชื่อมต่อจาก pool
        const userdata = req.body;
        const std_code = userdata.std_code;
        const hashedPassword = crypto.createHash('sha256').update(userdata.std_password).digest('hex');
        
        const [rows] = await connection.query(
            'SELECT std_code, std_fname, std_lname, std_year, std_type, std_rank, std_status, std_email FROM users WHERE std_code = ? AND std_password = ?', 
            [std_code, hashedPassword]
        );

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Login Error", error);
        res.status(500).json({ message: error.message, error: error });
    } finally {
        if (connection) connection.release(); // คืน connection กลับ pool
    }
});




app.post('/checkupdateuser', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(); // ดึงการเชื่อมต่อจาก pool
        const userdata = req.body;
        const std_code = userdata.std_code;
        
        const [rows] = await connection.query(
            'SELECT std_code, std_fname, std_lname, std_year, std_type, std_rank, std_status, std_email FROM users WHERE std_code = ?', 
            [std_code]
        );

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Checkdata Error", error);
        res.status(500).json({ message: error.message, error: error });
    } finally {
        if (connection) connection.release(); // คืน connection กลับ pool
    }
});







app.get('/lectdata', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT 
                lect.lect_id, 
                lect.lect_subject,
                lect.lect_title, 
                lect.lect_detail, 
                lect.lect_file, 
                lect.std_code, 
                lect.lect_createtime, 
                lect.lect_createdate, 
                lect.lect_updatetime, 
                lect.lect_updatedate, 
                users.std_fname, 
                users.std_lname
            FROM lect
            JOIN users ON lect.std_code = users.std_code
            WHERE lect.lect_status = 'post'
            ORDER BY lect.lect_id DESC;
        `);

        console.log(rows);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Show Lect Data Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        if (connection) connection.release();
    }
});





app.get('/searchlect/:topic', async (req, res) => {
    const { topic } = req.params;
    let connection;
    try {
        connection = await pool.getConnection();

        const [rows] = await connection.query(`
            SELECT 
                lect.lect_id, 
                lect.lect_subject,
                lect.lect_title, 
                lect.lect_detail, 
                lect.lect_file, 
                lect.std_code,
                lect.lect_createtime,
                lect.lect_createdate,
                lect.lect_updatetime,
                lect.lect_updatedate, 
                users.std_fname, 
                users.std_lname
            FROM lect
            JOIN users ON lect.std_code = users.std_code
            WHERE lect.lect_status = 'post'
            AND (lect.lect_subject LIKE ? OR lect.lect_title LIKE ? OR lect.lect_detail LIKE ?)
            ORDER BY lect.lect_id DESC;
        `, [`%${topic}%`, `%${topic}%`, `%${topic}%`]);

        console.log(rows);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Search lect Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        if (connection) connection.release();
    }
});










const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload-lecture', upload.array('lect_file'), async (req, res) => {
    let connection;
    try {
        const { lect_subject,lect_title, lect_detail, std_code } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        connection = await pool.getConnection();

        let date_ob = new Date();
        let formatted_date = date_ob.toISOString().split('T')[0];
        let formatted_time = date_ob.toTimeString().split(' ')[0];

        const query = `
          INSERT INTO lect
          SET lect_file = "", lect_createtime = ?, lect_createdate = ?, std_code = ?,lect_subject = ?, lect_title = ?, lect_detail = ?, lect_updatetime="", lect_updatedate=""
        `;
        const result = await connection.query(query, [
            formatted_time,
            formatted_date,
            std_code,
            lect_subject,
            lect_title,
            lect_detail,
        ]);

        const lect_id = result[0].insertId;

        const folderPath = `./lect/${lect_id}`;
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const savedFiles = [];
        files.forEach(file => {
            const sanitizedFilename = path.basename(file.originalname, path.extname(file.originalname))
                .replace(/[^a-zA-Z0-9ก-ฮ๐-๙เแ]+/g, '_');
            
            const extension = path.extname(file.originalname);
            const normalizedFilename = `${sanitizedFilename}${extension}`;
            
            const filePath = path.join(folderPath, normalizedFilename);

            fs.writeFileSync(filePath, file.buffer);
            savedFiles.push(normalizedFilename);
        });

        const updateQuery = `UPDATE lect SET lect_file = ? WHERE lect_id = ?`;
        await connection.query(updateQuery, [savedFiles.join(','), lect_id]);

        const newloglectdata = {
            lect_id: lect_id,
            lect_subject: lect_subject,
            lect_title: lect_title,
            lect_detail: lect_detail,
            lect_file:savedFiles.join(','),
            lectlogdate: formatted_date,
            lectlogtime: formatted_time,
            std_code: std_code,
            lect_status: 'create'
        };

        const [resultlog] = await connection.query('INSERT INTO loglect SET ?', newloglectdata);

        console.log(result);

        res.json({
            success: true,
            message: 'Lecture uploaded successfully',
            lect_id: lect_id,
            files: savedFiles,
        });
    } catch (error) {
        console.error('Error uploading lecture:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    } finally {
        if (connection) connection.release();
    }
});


app.post('/deletelect', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const lect_data = req.body;

        let date_ob = new Date();

        // ดึงข้อมูลวันที่
        let date2 = ("0" + date_ob.getDate()).slice(-2);

        // ดึงข้อมูลเดือน
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // ดึงข้อมูลปี
        let year = date_ob.getFullYear();

        // สร้างรูปแบบ YYYY-MM-DD
        let formatted_date = year + "-" + month + "-" + date2;

        // ดึงข้อมูลชั่วโมง
        let hours = ("0" + date_ob.getHours()).slice(-2);

        // ดึงข้อมูลนาที
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);

        // ดึงข้อมูลวินาที
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);

        // สร้างรูปแบบ HH:MM:SS
        let formatted_time = hours + ":" + minutes + ":" + seconds;

        console.log("Date:", formatted_date);
        console.log("Time:", formatted_time);

        const newlectdata = {
            lect_id: lect_data.lect_id,
            lect_subject:lect_data.lect_subject,
            lect_title:lect_data.lect_title,
            lect_detail:lect_data.lect_detail,
            lect_file:lect_data.lect_file,
            lectlogdate: formatted_date,
            lectlogtime: formatted_time,
            std_code:lect_data.std_code,
            lect_status: 'delete'
        };

        const [resultupdate] = await connection.query(
            'UPDATE lect SET lect_updatedate=?, lect_updatetime=?, lect_status=? WHERE lect_id=?',
            [
                newlectdata.lect_updatedate,
                newlectdata.lect_updatetime,
                newlectdata.lect_status,
                newlectdata.lect_id
            ]
        );

        console.log(resultupdate);

        const newlectlogdata = {
            lect_id: lect_data.lect_id,
            lect_subject:lect_data.lect_subject,
            lect_title:lect_data.lect_title,
            lect_detail:lect_data.lect_detail,
            lect_file:lect_data.lect_file,
            lectlogdate: formatted_date,
            lectlogtime: formatted_time,
            std_code:lect_data.std_code,
            lect_status: 'delete'
        };

        const [resultlog] = await connection.query('INSERT INTO loglect SET ?', newlectlogdata);

        res.status(200).json(resultupdate);
    } catch (error) {
        console.log("Delete news Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});


app.post('/uploadnewlecture', upload.array('lect_fileupdate'), async (req, res) => {
    let connection;
    try {
        const { lect_id, lect_subject, lect_title, lect_detail,lect_file,std_code} = req.body;
        const files = req.files;

        connection = await pool.getConnection();

        let date_ob = new Date();
        let formatted_date = date_ob.toISOString().split('T')[0];
        let formatted_time = date_ob.toTimeString().split(' ')[0];

        const query = `
          UPDATE lect
          SET lect_subject = ?,lect_title = ?, lect_detail = ?, lect_updatetime=?, lect_updatedate=? WHERE lect_id=?
        `;
        const result = await connection.query(query, [
            lect_subject,
            lect_title,
            lect_detail,
            formatted_time,
            formatted_date,
            lect_id,
        ]);


        const folderPath = `./lect/${lect_id}`;
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const savedFiles = [];
        files.forEach(file => {
            const sanitizedFilename = path.basename(file.originalname, path.extname(file.originalname))
                .replace(/[^a-zA-Z0-9ก-ฮ๐-๙เแ]+/g, '_');
            
            const extension = path.extname(file.originalname);
            const normalizedFilename = `${sanitizedFilename}${extension}`;
            
            const filePath = path.join(folderPath, normalizedFilename);

            fs.writeFileSync(filePath, file.buffer);
            savedFiles.push(normalizedFilename);
        });

        const combinedFiles = lect_file 
        ? [...savedFiles, ...lect_file.split(',')].join(',')
        : savedFiles.join(',');

        const updateQuery = `UPDATE lect SET lect_file = ? WHERE lect_id = ?`;
        await connection.query(updateQuery, [combinedFiles, lect_id]);

        const newloglectdata = {
            lect_id: lect_id,
            lect_subject:lect_subject,
            lect_title: lect_title,
            lect_detail: lect_detail,
            lect_file:combinedFiles,
            lectlogdate: formatted_date,
            lectlogtime: formatted_time,
            std_code: std_code,
            lect_status: 'update'
        };
        const [resultlog] = await connection.query('INSERT INTO loglect SET ?', newloglectdata);

        console.log(result);

        res.json({
            success: true,
            message: 'Lecture uploaded successfully',
            lect_id: lect_id,
            files: savedFiles,
        });
    } catch (error) {
        console.error('Error uploading lecture:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    } finally {
        if (connection) connection.release();
    }
});




app.get('/lectfiles/:folder/:filename', async (req, res) => {
    const { folder, filename } = req.params;
    const filePath = path.join(__dirname, 'lect', folder, filename);

    try {
        fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                return res.status(404).json({ success: false, message: 'File not found' });
            }

            res.sendFile(filePath, (err) => {
                if (err) {
                    res.status(500).json({ success: false, message: 'Error sending file' });
                }
            });
        });
    } catch (error) {
        console.error('Error show lecture:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
});



app.post('/createnews', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const news_data = req.body;

        let date_ob = new Date();
        let date2 = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let formatted_date = year + "-" + month + "-" + date2;

        let hours = ("0" + date_ob.getHours()).slice(-2);
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);
        let formatted_time = hours + ":" + minutes + ":" + seconds;

        console.log("Date:", formatted_date);
        console.log("Time:", formatted_time);

        const newnewsdata = {
            news_title: news_data.newstitle,
            news_detail: news_data.newsdetail,
            newsdatecreate: formatted_date,
            newstimecreate: formatted_time,
            std_code: news_data.stdcode
        };

        const [result] = await connection.query('INSERT INTO news SET ?', newnewsdata);
        const news_id = result.insertId;

        const newlognewsdata = {
            news_id: news_id,
            news_title: news_data.newstitle,
            news_detail: news_data.newsdetail,
            newslogdate: formatted_date,
            newslogtime: formatted_time,
            std_code: news_data.stdcode,
            news_status: 'create'
        };

        const [resultlog] = await connection.query('INSERT INTO lognews SET ?', newlognewsdata);

        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        console.log("Create news Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});

app.post('/editnews', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const news_data = req.body;

        let date_ob = new Date();

        // ดึงข้อมูลวันที่
        let date2 = ("0" + date_ob.getDate()).slice(-2);

        // ดึงข้อมูลเดือน
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // ดึงข้อมูลปี
        let year = date_ob.getFullYear();

        // สร้างรูปแบบ YYYY-MM-DD
        let formatted_date = year + "-" + month + "-" + date2;

        // ดึงข้อมูลชั่วโมง
        let hours = ("0" + date_ob.getHours()).slice(-2);

        // ดึงข้อมูลนาที
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);

        // ดึงข้อมูลวินาที
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);

        // สร้างรูปแบบ HH:MM:SS
        let formatted_time = hours + ":" + minutes + ":" + seconds;

        console.log("Date:", formatted_date);
        console.log("Time:", formatted_time);

        const newnewsdata = {
            news_id: news_data.news_id,
            news_title: news_data.news_title,
            news_detail: news_data.news_detail,
            newsdatecreate: formatted_date,
            newstimecreate: formatted_time,
            std_code: news_data.stdcode
        };

        const [resultupdate] = await connection.query(
            'UPDATE news SET news_title=?, news_detail=?, newsdatecreate=?, newstimecreate=?, std_code=? WHERE news_id=?',
            [
                newnewsdata.news_title,
                newnewsdata.news_detail,
                newnewsdata.newsdatecreate,
                newnewsdata.newstimecreate,
                newnewsdata.std_code,
                newnewsdata.news_id
            ]
        );

        console.log(resultupdate);

        const newlognewsdata = {
            news_id: newnewsdata.news_id,
            news_title: newnewsdata.news_title,
            news_detail: newnewsdata.news_detail,
            newslogdate: newnewsdata.newsdatecreate,
            newslogtime: newnewsdata.newstimecreate,
            std_code: newnewsdata.std_code,
            news_status: 'update'
        };

        const [resultlog] = await connection.query('INSERT INTO lognews SET ?', newlognewsdata);

        res.status(200).json(resultupdate);
    } catch (error) {
        console.log("Create news Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});

app.post('/deletenews', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const news_data = req.body;

        let date_ob = new Date();

        // ดึงข้อมูลวันที่
        let date2 = ("0" + date_ob.getDate()).slice(-2);

        // ดึงข้อมูลเดือน
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // ดึงข้อมูลปี
        let year = date_ob.getFullYear();

        // สร้างรูปแบบ YYYY-MM-DD
        let formatted_date = year + "-" + month + "-" + date2;

        // ดึงข้อมูลชั่วโมง
        let hours = ("0" + date_ob.getHours()).slice(-2);

        // ดึงข้อมูลนาที
        let minutes = ("0" + date_ob.getMinutes()).slice(-2);

        // ดึงข้อมูลวินาที
        let seconds = ("0" + date_ob.getSeconds()).slice(-2);

        // สร้างรูปแบบ HH:MM:SS
        let formatted_time = hours + ":" + minutes + ":" + seconds;

        console.log("Date:", formatted_date);
        console.log("Time:", formatted_time);

        const newnewsdata = {
            news_id: news_data.news_id,
            newsdatecreate: formatted_date,
            newstimecreate: formatted_time,
            std_code: news_data.stdcode,
            news_status: 'delete'
        };

        const [resultupdate] = await connection.query(
            'UPDATE news SET newsdatecreate=?, newstimecreate=?, std_code=?, news_status=? WHERE news_id=?',
            [
                newnewsdata.newsdatecreate,
                newnewsdata.newstimecreate,
                newnewsdata.std_code,
                newnewsdata.news_status,
                newnewsdata.news_id
            ]
        );

        console.log(resultupdate);

        const newlognewsdata = {
            news_id: newnewsdata.news_id,
            news_title: "",
            news_detail: "",
            newslogdate: newnewsdata.newsdatecreate,
            newslogtime: newnewsdata.newstimecreate,
            std_code: newnewsdata.std_code,
            news_status: 'delete'
        };

        const [resultlog] = await connection.query('INSERT INTO lognews SET ?', newlognewsdata);

        res.status(200).json(resultupdate);
    } catch (error) {
        console.log("Delete news Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});

app.get('/readnews', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            `SELECT news.*, users.std_code, users.std_fname, users.std_lname 
             FROM news
             JOIN users ON news.std_code = users.std_code WHERE news_status="show"
             ORDER BY news.news_id DESC`
        );
        
        res.status(200).json(result);
    } catch (error) {
        console.log("Read news Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});





//User



function sendemail(email,subject,html){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'your app pass'
        }
    })
    const option = {
        from: 'youremail@gmail.com',
        to: email,
        subject: subject,
        html: html
    }

    transporter.sendMail(option, (err, info) => {
        if(err) {
            console.log('err', err)
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad',
                RespError: err
            })
        }
        else {
            console.log('Send: ' + info.response)
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good',
            })
        }
    })
}

function getRandomNumbers(count) {
    const randomNumbers = [];
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    randomNumbers.push(randomNumber);
    return randomNumbers;
}



app.post('/createuser', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const userdata = req.body;
        //const hashedPassword = crypto.createHash('sha256').update(userdata.std_password).digest('hex');
        const randomtoken = getRandomNumbers(4, 100);
        const stdyear = userdata.std_code[0] + userdata.std_code[1];
        const stddata = {
            std_code: userdata.std_code,
            std_fname: userdata.std_fname,
            std_lname: userdata.std_lname,
            std_password: "",
            std_year: stdyear,
            std_type: userdata.std_type,
            std_rank: userdata.std_rank,
            std_status: "study",
            std_email: userdata.std_email,
            std_verifytoken: userdata.std_code + randomtoken,
            std_otp: ""
        };

        console.log(stddata);

        const result = await connection.query('INSERT INTO users SET ?', stddata);
        
        const resultcheckyear = await connection.query(
            `SELECT * 
             FROM year 
             WHERE years = ?`, [stdyear]
        );

        console.log(resultcheckyear[0][0]);
        
        const yearscheck = resultcheckyear[0][0];

        if (!yearscheck) {
            const yeardatanew = {
                years: stdyear
            };
            
            try {
                const resultnewyears = await connection.query('INSERT INTO year SET ?', yeardatanew);
                console.log('Inserted new year:', resultnewyears[0]);
            } catch (error) {
                console.error('Error inserting new year:', error);
            }
        }

        const verifyhtml = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f9f9f9;
                            color: #333333;
                            text-align: center;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            background-color: #ffffff;
                        }
                        .header {
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 20px;
                        }
                        .content {
                            font-size: 16px;
                            line-height: 1.5;
                            margin-bottom: 20px;
                        }
                        .btn {
                            display: inline-block;
                            padding: 10px 20px;
                            font-size: 16px;
                            color: #ffffff;
                            background-color: #007BFF;
                            text-decoration: none;
                            border-radius: 5px;
                            transition: background-color 0.3s ease;
                        }
                        .btn:hover {
                            background-color: #0056b3;
                        }
                        .footer {
                            font-size: 12px;
                            margin-top: 20px;
                            color: #888888;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img src="https://my.ku.th/favicon.ico" alt="KU Next Logo" style="width: 100px; height: auto; margin-bottom: 20px;" />
                        <div class="header">Verify Your Account</div>
                        <div class="content">
                            Thank you for signing up with KU Next! Please verify your account by clicking the button below.
                        </div>
                        <a href="https://yourdomainname/verify?verifytoken=${userdata.std_code+randomtoken}" class="btn">Verify Account</a>
                        <div class="content" style="margin-top: 20px;">
                            If you didn't sign up for an account, you can safely ignore this email.
                        </div>
                        <div class="footer">
                            © 2024 KU Next. All rights reserved. <br />
                            This email was sent from an unmonitored address. Please do not reply.
                        </div>
                    </div>
                </body>
            </html>
            `;

        sendemail(userdata.std_email, "Verify Account", verifyhtml);
        
        res.status(200).json(result[0]);
    } catch (error) {
        console.log("Create user Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});




app.post('/request-otp', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const userdata = req.body;
        const randomotp = getRandomNumbers(4, 100);
        const stddata = {
            std_code: userdata.std_code,
            std_otp: randomotp
        };

        console.log(stddata);

        const result = await connection.query('UPDATE users SET std_otp=? WHERE std_code=?', [stddata.std_otp,stddata.std_code]);
        const resultemail = await connection.query(`SELECT std_email FROM users WHERE std_code = ?`,[stddata.std_code]);
		
		console.log(resultemail[0][0].std_email)

        const verifyhtml = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            padding: 20px;
                            text-align: center;
                        }
                        .header {
                            font-size: 24px;
                            font-weight: bold;
                            color: #007BFF;
                            margin-bottom: 20px;
                        }
                        .content {
                            font-size: 16px;
                            color: #555;
                            line-height: 1.6;
                            margin-bottom: 20px;
                        }
                        .otp-box {
                            font-size: 28px;
                            font-weight: bold;
                            color: #333;
                            background-color: #f7f7f7;
                            border: 1px dashed #ccc;
                            padding: 10px 20px;
                            border-radius: 8px;
                            display: inline-block;
                            margin: 20px 0;
                        }
                        .footer {
                            font-size: 12px;
                            color: #888;
                            margin-top: 20px;
                            line-height: 1.4;
                        }
                        .logo {
                            width: 80px;
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img src="https://my.ku.th/favicon.ico" alt="KU Next Logo" class="logo" />
                        <div class="header">Verify Your Account</div>
                        <div class="content">
                            Thank you for signing up with <b>KU Next</b>! Use the OTP below to verify your account:
                        </div>
                        <div class="otp-box">${randomotp}</div>
                        <div class="content">
                            If you didn't sign up for an account, you can safely ignore this email.
                        </div>
                        <div class="footer">
                            © 2024 KU Next. All rights reserved. <br />
                            This email was sent from an unmonitored address. Please do not reply.
                        </div>
                    </div>
                </body>
            </html>

            `;

        sendemail(resultemail[0][0].std_email, "OTP", verifyhtml);
        
        res.status(200).json(result[0]);
    } catch (error) {
        console.log("OTP Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});


app.post('/otpverify', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const userdata = req.body;

        console.log(userdata);

        const result = await connection.query(`SELECT std_fname, std_lname, std_year, std_type, std_rank, std_status, std_email 
             FROM users WHERE std_code = ? AND std_otp = ?`,[userdata.std_code,userdata.std_otp]);
        
        const resultclearotp = await connection.query('UPDATE users SET std_otp=? WHERE std_code=?', ["", userdata.std_code]);

        res.status(200).json(result[0]);
    } catch (error) {
        console.log("OTP Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});


app.post('/confirmpasswordotp', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const std_data = req.body;
        const hashedPassword = crypto.createHash('sha256').update(std_data.std_password).digest('hex');

        const result = await connection.query('UPDATE users SET std_password=? WHERE std_code=?', [hashedPassword, std_data.std_code]);

        console.log(result[0]);
        console.log(result[0].info);

        if (result[0].info === "Rows matched: 1  Changed: 0  Warnings: 0") {
            res.status(200).json(result[0]);
        } else if (result[0].info === "Rows matched: 1  Changed: 1  Warnings: 0") {
            res.status(200).json(result[0]);
        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.log("Confirm Password Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});




app.post('/user', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const std_data = req.body;
        const std_code = std_data.std_code;
        const hashedPassword = crypto.createHash('sha256').update(std_data.std_newpassword).digest('hex');

        const result = await connection.query('UPDATE users SET std_password=? WHERE std_code=?', [hashedPassword, std_code]);

        console.log(result[0]);
        console.log(result[0].info);

        if (result[0].info == "Rows matched: 1  Changed: 0  Warnings: 0") {
            res.status(200).json(result[0]);
        } else if (result[0].info == "Rows matched: 1  Changed: 1  Warnings: 0") {
            res.status(200).json(result[0]);
        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.log("Reset Password Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});


app.post('/confirmpassword', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const std_data = req.body;
        const hashedPassword = crypto.createHash('sha256').update(std_data.std_password).digest('hex');
        const usertoken = '';

        const result = await connection.query('UPDATE users SET std_password=? ,std_verifytoken=? WHERE std_code=?', [hashedPassword, usertoken, std_data.std_code]);

        console.log(result[0]);
        console.log(result[0].info);

        if (result[0].info === "Rows matched: 1  Changed: 0  Warnings: 0") {
            res.status(200).json(result[0]);
        } else if (result[0].info === "Rows matched: 1  Changed: 1  Warnings: 0") {
            res.status(200).json(result[0]);
        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.log("Confirm Password Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});

app.post('/checktoken', async (req, res) => {
    const std_data = req.body;
    const connection = await pool.getConnection();
    try {
		console.log(std_data)
        if (!std_data.std_verifytoken) {
            return res.status(400).json({ message: 'Verify token is required' });
        }

        const [rows] = await connection.query(
            `SELECT std_code, std_fname, std_lname, std_year, std_type, std_rank, std_status, std_email 
             FROM users WHERE std_verifytoken = ?`, 
            [std_data.std_verifytoken]
        );

        if (rows.length === 0) {
			console.log('Token not found or invalid')
            return res.status(404).json({ message: 'Token not found or invalid' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.log("Check Token Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});





app.post('/showuserlist', async (req, res) => {
    const std_data = req.body;
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            `SELECT std_code, std_fname, std_lname, std_year, std_type, std_rank, std_status, std_email 
             FROM users 
             WHERE std_type = ? AND std_year =?
             ORDER BY std_code ASC`,
            [std_data.std_type, std_data.std_year]
        );

        console.log(rows);

        res.status(200).json(rows);
    } catch (error) {
        console.log("Error fetching user list", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});




app.post('/showsearchuserlist', async (req, res) => {
    const std_data = req.body;
    const connection = await pool.getConnection();
    try {

        let query;

        if (std_data.std_rank == "superadmin") {
            query = `
                SELECT std_code, std_fname, std_lname, std_year, std_type, std_rank, std_status, std_email
                FROM users
                WHERE std_code LIKE ? OR 
                    std_fname LIKE ? OR 
                    std_lname LIKE ? OR
                    std_year LIKE ? OR
                    std_type LIKE ? OR
                    std_rank LIKE ? OR
                    std_status LIKE ? OR
                    std_email LIKE ?
                ORDER BY std_code ASC
            `;
        } else {
            query = `
                SELECT std_code, std_fname, std_lname, std_year, std_type, std_rank, std_status, std_email
                FROM users
                WHERE (std_code LIKE ? OR 
                    std_fname LIKE ? OR 
                    std_lname LIKE ? OR
                    std_year LIKE ? OR
                    std_type LIKE ? OR
                    std_rank LIKE ? OR
                    std_status LIKE ? OR
                    std_email LIKE ?)
                AND std_year = ? 
                AND std_type = ?
                ORDER BY std_code ASC
            `;
        }


        const searchValue = `%${std_data.std_search}%`;

        const [rows] = await connection.query(query, [
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            std_data.std_year,
            std_data.std_type
        ]);

        console.log(rows);

        res.status(200).json(rows);
    } catch (error) {
        console.log("Search Account Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});


app.post('/editaccount', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const account_data = req.body;

        const resultupdate = await connection.query(
            'UPDATE users SET std_fname=?, std_lname=?, std_email=?, std_type=?, std_rank=?, std_status=? WHERE std_code=?', [
                account_data.std_fname,
                account_data.std_lname,
                account_data.std_email,
                account_data.std_type,
                account_data.std_rank,
                account_data.std_status,
                account_data.std_code
            ]
        );

        console.log(resultupdate[0]);

        res.status(200).json(resultupdate[0]);
    } catch (error) {
        console.log("Edit Account Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});


app.post('/deleteaccount', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const account_data = req.body;

        const newaccountdata = {
            std_code: account_data.std_code,
            std_status: account_data.std_status
        };

        const resultupdate = await connection.query(
            'UPDATE users SET std_status=? WHERE std_code=?', [
                newaccountdata.std_status,
                newaccountdata.std_code
            ]
        );

        console.log(resultupdate[0]);

        res.status(200).json(resultupdate[0]);
    } catch (error) {
        console.log("Delete Account Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});



//log


app.get('/lognewsdata', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            `SELECT *
             FROM lognews
             ORDER BY lognews_id  ASC`
        );
        
        res.status(200).json(result);
    } catch (error) {
        console.log("Log news Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});


app.get('/loglectdata', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            `SELECT *
             FROM loglect
             ORDER BY loglect_id  ASC`
        );
        
        res.status(200).json(result);
    } catch (error) {
        console.log("Log lect Error", error);
        res.status(500).json({
            message: error.message,
            error: error
        });
    } finally {
        connection.release();
    }
});



app.listen(port, async (req, res) => {
    console.log(`Server Start On Port : ${port}`)
})