import express, { Request, Response, NextFunction } from "express";
import todosRoutes from "./routes/todos";
import bodyParser from "body-parser";
import doSomeHeavyTask from "./util";
import client from "prom-client";
import responseTime from "response-time";
import LokiTransport from "winston-loki";
import { createLogger, transports } from "winston";


const options = {
    transports: [
        new LokiTransport({
            labels: {
                appName: "express",
            },
            host: "http://127.0.0.1:3100"
        })
    ]
};
export const logger = createLogger(options);

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
    name: "http_express_req_res_time",
    help: "This tells how much time is taken by req and res",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 2000, 5000, 10000, 2000],
})

const totalReqCount = new client.Counter({
    name: "http_express_req_count",
    help: "This will tell how many req are there",
});

app.use(responseTime((req, res, time) => {
    totalReqCount.inc();
    reqResTime.labels({
        method: req.method,
        route: req.url,
        status_code: req.statusCode,
    }).observe(time)
}))

app.use(bodyParser.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.use(todosRoutes);

app.get("/slow", async (req, res) => {
  try {
      logger.info("Req came on /slow route");
    const timeTaken = await doSomeHeavyTask();
    return res.json({
      status: "Success",
      message: `Heavy task completed in ${timeTaken}ms`,
    });
  } catch (error) {
      logger.error(error.message);
    return res
      .status(500)
      .json({ status: "Error", error: "Internal Server Error" });
  }
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

app.listen(8000);
