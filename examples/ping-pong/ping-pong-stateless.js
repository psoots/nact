#!/usr/bin/env node

const { start, dispatch, spawnStateless } = require('../../lib');
const system = start();

const delay = (time) => new Promise((resolve, reject) => setTimeout(resolve, time));

const ping = spawnStateless(system, async (msg, ctx) => {
  console.log(msg);
  // ping: Pong is a little slow. So I'm giving myself a little handicap :P
  await delay(500);
  dispatch(ctx.sender, ctx.name, ctx.self);
}, 'ping');

const pong = spawnStateless(system, (msg, ctx) => {
  console.log(msg);
  dispatch(ctx.sender, ctx.name, ctx.self);
}, 'pong');

dispatch(ping, 'begin', pong);
