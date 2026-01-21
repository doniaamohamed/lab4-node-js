/*const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post.routes');

const app = express();
app.use(express.json());

app.use('/posts', postRoutes);

mongoose.connect('mongodb://localhost:27017/iti-zag').then(() => {
    console.log('✅ Connected to DB');
    app.listen(3000, () => console.log('✅ Server running on 3000'));
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routers/users');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();



const app = express();

// app level middleware
app.use(express.json());
app.use(cors());

// routers
app.use('/users', userRouter);


app.use(errorHandler);


const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(() => {
        console.log('✅✅ Connected to MongoDB');
    }).catch((err) => {
        console.log('❌❌ Connected to MongoDB');
        console.log(err);
    });
    console.log(`✅✅ Server is running on Port:${PORT}`);
});


// Cross Origin Resource Sharing (CORS)


// server to server communication*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/posts', postRouter);


app.use(errorHandler);

const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
    mongoose
        .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        .then(() => {
            console.log('✅✅ Connected to MongoDB');
        })
        .catch((err) => {
            console.log('❌❌ Failed to connect to MongoDB');
            console.log(err);
        });

    console.log(`✅✅ Server is running on Port:${PORT}`);
});



