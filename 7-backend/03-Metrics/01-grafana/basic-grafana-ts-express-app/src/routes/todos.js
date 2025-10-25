"use strict";
/**
 * Import whole module from `express` then create router
 *
 * import express from "express";
 * const router = express.Router();
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Or just import what is required...
 */
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo", todo: newTodo, todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex].text = req.body.text;
        return res.status(200).json({ message: "Todo Updated", todos: todos });
    }
    res.status(404).json({ message: "Could not find todo with id: " + tid });
});
router.delete("/todo/:todoId", (req, res, next) => {
    todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: "Todo Deleted", todos: todos });
});
exports.default = router;
