/**
 * Import whole module from `express` then create router
 *
 * import express from "express";
 * const router = express.Router();
 */

/**
 * Or just import what is required...
 */
import { Router } from "express";
import { Todo } from "../models/todo";
import {logger} from "../app";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];
const router = Router();

router.get("/", (req, res, next) => {
    logger.info("Req came on / route");
    res.status(200).json({todos: todos});
});

router.post("/todo", (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    };

    todos.push(newTodo);

    res.status(201).json({message: "Added Todo", todo: newTodo, todos: todos});
})

router.put("/todo/:todoId", (req, res, next) => {
    const body = req.body as RequestBody;
    const params = req.params as RequestParams;

    const tid = params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if(todoIndex >= 0) {
        todos[todoIndex].text = body.text;
        return res.status(200).json({message: "Todo Updated", todos: todos});
    }

    res.status(404).json({message: "Could not find todo with id: " + tid});
})

router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params as RequestParams;

    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({message: "Todo Deleted", todos: todos});
});

export default router;


