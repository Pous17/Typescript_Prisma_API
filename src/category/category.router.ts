import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as CategoryService from "./category.service";

export const categoryRouter = express.Router();

// GET all 

categoryRouter.get("/", async(req: Request, res: Response) => {
    try {
        const category = await CategoryService.getAllCategories();
        return res.status(200).json(category);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// GET by id

categoryRouter.get("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const category = await CategoryService.getCategory(id);
        if (category) {
            return res.status(200).json(category);
        }
        return res.status(404).json("Can't find that category");
    } catch (error: any) {
        res.status(500).json(error.message);
    }
});

// POST 

categoryRouter.post("/", body("name").isString(), async(req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    try {
        const category = req.body;
        const newCategory = await CategoryService.createCategory(category);
        return res.status(201).json(newCategory);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// Update by id

categoryRouter.put("/:id", body("name").isString(), async(req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const id: number = parseInt(req.params.id, 10);
    try {
        const category = req.body
        const updatedCategory = await CategoryService.updateCategory(category, id);
        return res.status(200).json(updatedCategory)
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// Delete by id 

categoryRouter.delete("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        await CategoryService.deleteCategory(id);
        return res.status(204).json("Category succefully deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});
