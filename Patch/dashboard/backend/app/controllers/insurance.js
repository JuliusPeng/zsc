'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const services = require('../services');

const debug = require('debug')('backend:app:controllers:insurance');

const add = async (req, res) => {
};

const remove = async (req, res) => {
};

const update = async (req, res) => {
};

const list = async (req, res) => {
};
const count = async (req, res) => {
  try {
    const company = req.query.company;
    const category = req.query.category;
    const title = req.query.title;
  } catch (err) {
    res.sendErr(err);
  }
};

module.exports = {add, remove, update, list, detail, count};
