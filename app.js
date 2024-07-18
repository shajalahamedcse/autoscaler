const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 3000;

const register = new promClient.Registry();

// Create a counter metric
const httpRequestCounter = new promClient.Counter({
    name: 'http_request_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
});

// Register the counter metric
register.registerMetric(httpRequestCounter);

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Middleware to increment the counter metric

app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode,
        });
    });
        next();
});

app.get('/metrics',async(req, res) => {
    console.log(register.contentType);
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
  