import {Router} from "express";
import { reviewCard } from "../controllers/review.controller.js";

import authorize from "../middleware/auth.middleware.js"

const reviewRouter = Router();

reviewRouter.post('/:cardId/review', authorize,  reviewCard)

export default reviewRouter

/*
To test the review API, use the following endpoint:

POST /api/v1/review/:cardId/review

Replace :cardId with the actual card ID you want to review.
*/