const server = require('./server.js');
const route = require('./router');



const PORT = process.env.PORT || 4000;
server.use('/api', route);


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});