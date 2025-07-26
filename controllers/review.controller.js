import Card from "../models/card.model.js";
import moment from "moment";

export const reviewCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { quality } = req.body; // quality: 0 (forgot), 1 (hard), 2 (medium), 3 (easy)

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const now = new Date();
    const lastReviewDate = card.lastReviewed
      ? new Date(card.lastReviewed)
      : null;

    const isNewDayReview =
      !lastReviewDate ||
      moment(now)
        .startOf("day")
        .diff(moment(lastReviewDate).startOf("day"), "days") >= 1;

    if (quality > 0 && isNewDayReview) {
      card.streak = (card.streak || 0) + 1;
    } else if (quality === 0) {
      card.streak = 0;
    }
    
    // Spaced repetition logic (simple SM-2 algorithm)
    let interval = card.interval || 1;
    let ease = card.ease || 2.5;

    if (quality < 3) {
      ease = Math.max(1.3, ease - 0.2 + 0.08 * quality);
      interval = 1;
    } else {
      ease = ease + 0.1;
      interval = Math.round(interval * ease);
    }
    if (quality < 3) {
  card.repetitions = 0;
} else {
  card.repetitions = (card.repetitions || 0) + 1;
}

    card.ease = ease;
    card.interval = interval;
    card.nextReview = moment().add(interval, "days").toDate();
    card.lastReviewed = new Date();

    await card.save();

    res.json({
      message: "Card reviewed successfully",
      card,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error reviewing card", error: error.message });
  }
};
