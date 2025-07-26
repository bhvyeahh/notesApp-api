import Card from "../models/card.model";

export const createCard = async (req, res, next) =>{
     try {
        const card = await Card.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({success: true, data: card})
     } catch (error) {
        next(error)
     }
}

export const getCards = async (req, res, next)=>{
    try {
        const card = await Card.find({user: req.user._id}).sort({createdAt: -1})

        if(!card){
            return res.status(404).json({message: "Cards not found"})
        }
        res.status(200).json({success: true, message: "Cards fetched successfully", data: card})
    } catch (error) {
        next(error)
    }
}

export const getCard = async (req, res, next)=>{
    try {
        const card = await Card.findById(req.params.id)

        if(!card){
            return res.status(404).json({message: "Card not found"})
        }

        res.status(200).json({
            success: true,
            message: "Card Found Successfully",
            data: card
        })
    } catch (error) {
        next(error)
    }
}

export const editCard = async (req, res, next)=>{
    try {
        const card = await Card.findByIdAndUpdate(req.params.id)

        if(!card){
            return res.status(404).json({message: "Card not found"})
        }

        // Update the card with the new data
        card.question = req.body.question || card.question;
        card.answer = req.body.answer || card.answer;
        card.nextReview = req.body.nextReview || card.nextReview;
        card.ease = req.body.ease || card.ease;
        card.interval = req.body.interval || card.interval;
        card.repetitions = req.body.repetitions || card.repetitions;
        
        await card.save();
        res.status(200).json({
            success: true,
            message: "Card updated successfully",
            data: card
        })

    } catch (error) {
        next(error)
    }
}

export const deleteCard = async (req, res, next)=>{
    try {
        const card = await Card.findByIdAndDelete(req.params.id)
        if(!card){
            return res.status(404).json({message: "Card not found"})
        }

        res.status(200).json({
            success: true,
            message: "Card deleted successfully",
            data: card
        })
    } catch (error) {
        next(error)
        
    }
}