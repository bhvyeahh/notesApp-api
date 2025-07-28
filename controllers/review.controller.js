import Card from "../models/card.model.js";
import User from "../models/user.model.js";
import moment from "moment";

export const reviewCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { quality } = req.body;
    const userId = req.user._id;

    // Fetch card and validate
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Fetch user and update streak
    const user = await User.findById(userId);
    const now = moment.utc(); // Use UTC for consistency
    const today = now.startOf("day");

    // Initialize streak if needed
    if (user.currentStreak === undefined) {
      user.currentStreak = 0;
    }

    // Streak management logic
    if (!user.lastReviewDate) {
      // First review ever - increment from 0 to 1
      user.currentStreak = 1;
    } else {
      const lastReviewDay = moment.utc(user.lastReviewDate).startOf("day");
      const daysSinceLastReview = today.diff(lastReviewDay, "days");

      if (daysSinceLastReview === 1) {
        // Reviewed yesterday - increment streak
        user.currentStreak += 1;
      } else if (daysSinceLastReview > 1) {
        // Missed one or more days - reset streak to 0
        user.currentStreak = 0;
      }
      // If daysSinceLastReview === 0, do nothing (already reviewed today)
    }

    // Update longest streak if current is higher
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    // Update last review date (even if streak didn't change)
    user.lastReviewDate = now.toDate();
    await user.save();

    // Card review logic (SM-2 algorithm)
    let interval = card.interval || 1;
    let ease = card.ease || 2.5;

    if (typeof quality !== "number" || quality < 1 || quality > 3) {
      return res.status(400).json({
        message: "Quality must be a number between 1 (hard) and 3 (easy)",
      });
    }

    // SM-2 algorithm implementation
    if (quality < 3) {
      // For incorrect/partial recall (quality 1 or 2)
      ease = Math.max(1.3, ease - 0.2 + 0.08 * quality);
      interval = 1; // Reset interval
      card.repetitions = 0; // Reset repetitions count
    } else {
      // For perfect recall (quality 3)
      ease = Math.min(2.5, ease + 0.1); // Cap ease factor at 2.5
      interval = Math.round((interval || 1) * ease);
      card.repetitions = (card.repetitions || 0) + 1;
    }

    card.repetitions = quality < 3 ? 0 : (card.repetitions || 0) + 1;
    card.ease = ease;
    card.interval = interval;
    card.nextReview = moment.utc().add(interval, "days").toDate();
    card.lastReviewed = new Date();

    await card.save();

    res.json({
      message: "Card reviewed successfully",
      card,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error reviewing card",
      error: error.message,
    });
  }
};
