#!/usr/bin/env node

const { start, dispatch, spawn } = require('../../lib');
const system = start();

const delay = (time) => new Promise((resolve, reject) => setTimeout(resolve, time));

const ping = spawn(system, async (state = {}, msg, ctx) => {
  console.log(msg);

  if (!state['counter']) {
    state['counter'] = 1;
  }

  console.log('counter ' + state['counter']);
  if (state['counter'] < 10) {
    await delay(500);
    dispatch(ctx.sender, ctx.name, ctx.self);
    return { ...state, 'counter': state['counter'] + 1 };
  }
}, 'ping');

const pong = spawn(system, async (state = {}, msg, ctx) => {
  console.log(msg);

  if (!state['counter']) {
    state['counter'] = 1;
  }

  console.log('counter ' + state['counter']);
  if (state['counter'] < 10) {
    await delay(500);
    dispatch(ctx.sender, ctx.name, ctx.self);
    return { ...state, 'counter': state['counter'] + 1 };
  }
}, 'pong');

dispatch(ping, 'begin', pong);
