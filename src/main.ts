import {
  api_nodes,
  api_alerts
} from './api'

const koa = require('koa');
const router = require('koa-router');

const app = new koa();
const api = new router();

api
  .get("/v1/nodes", async (ctx) => ctx.body = await api_nodes())
  .get("/v1/nodes/:ip")
  .get("/v1/nodes/:ip/os")
  .get("/v1/nodes/:ip/dbs/oracle")
  .get("/v1/nodes/:ip/dbs/oracle/:name")
  .get("/v1/alerts", async (ctx) => ctx.body = await api_alerts())
  .get("/v1/alerts/os")
  .get("/v1/alerts/db/oracle")
  .get("/v1/reports")
  .get("/v1/reports/os")
  .get("/v1/reports/db/oracle")

  // .get("/v1/alerts/oss", async (ctx) => ctx.body = await api_alerts_os())
  // .get("/v1/alerts/databases", async (ctx) => ctx.body = await api_alerts_oracle())
  .get("/v1/alerts/:ip/oss")
  .get("/v1/alerts/:ip/databases")
  .get("/v1/alerts/:ip/databases/:name")

app.use(api.routes()).use(api.allowedMethods());
app.listen(3000);