const itineraryRepository = require("../../../repositories/itineraryRepository");
const { response } = require("../itineraryModule");

/**
 * Get All Comments by Itinerary Id
 * Send if user already liked them, and an array of the comments Ids of the request user.
 * @returns Status 200: Success, response: comments array or empty array if no comments found
 * @returns Status 500: Internal server error
 */
const getUserCommentsByItinerary = async (req, res = response) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const itineraryDB = await itineraryRepository.getOne(id);
    const userLiked = await itineraryRepository.getUserLiked(id, user._id);
    let { comments } = itineraryDB;
    let commentsId = [];

    if (!comments) {
      return res.status(200).json({
        success: true,
        message: "No comments",
        response: [],
      });
    }

    // Pushs only comments ids to new array if the request user is the author
    comments.forEach((comment) => {
      if (comment.userId.toString().trim() == user._id.toString().trim()) {
        commentsId.push(comment._id);
      }
    });

    res.status(200).json({
      success: true,
      message: "Comments",
      response: {
        arrayOwnerCheck: commentsId,
        likedChek: userLiked,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

/**
 * Add new comment
 * Send all the itinerary comments and an array of the comments Ids of the request user
 * @returns Status 200: Success, response: comments array or empty array if no comments found
 * @returns Status 404: Itinerary Id not found
 * @returns Status 500: Internal server error
 */
const addUserComment = async (req, res = response) => {
  const { id } = req.params;
  const { text } = req.body;
  const { user } = req;
  let commentsId = [];

  try {
    const itineraryDB = await itineraryRepository.getOne(id);

    if (!itineraryDB) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
        response: [],
      });
    }

    let { comments } = itineraryDB;

    const newComment = {
      userId: user._id,
      text: text,
      userName: user.firstName,
      userPic: user.userPic,
    };

    comments.push(newComment);
    // Pushs only comments ids to new array if the request user is the author
    comments.forEach((comment) => {
      if (comment.userId.toString().trim() == req.user._id.toString().trim()) {
        commentsId.push(comment._id);
      }
    });

    itineraryRepository.updateComments(comments, id);

    res.status(200).json({
      success: true,
      message: "Comments",
      response: comments,
      arrayOwnerCheck: commentsId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

/**
 * Delete one comment
 * Get comment id by request param
 * @returns Status 200: Success, response: Comments array
 * @returns Status 404: Comment not found.
 * @returns Status 500: Internal server error
 */
const deleteComment = async (req, res = response) => {
  try {
    const { id } = req.params; // Comment Id
    const { user } = req;

    // Get the itinerary
    const itineraryDB = await itineraryRepository.getOneByCommentId(id, user._id);

    if (!itineraryDB) {
      return res.status(404).json({
        success: true,
        message: "Comment not found",
        response: [],
      });
    }

    let { comments } = itineraryDB;

    // Deletes comment from array and update repository with filtered comments array
    comments = comments.filter((comment) => comment._id.toString().trim() !== id.toString().trim());

    itineraryRepository.updateComments(comments, itineraryDB._id);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
      response: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

/**
 * Update one comment
 * Get comment id by request param, and text by request body
 * @returns Status 200: Success, response: Comments array
 * @returns Status 404: Comment not found.
 * @returns Status 500: Internal server error
 */
const updateComment = async (req, res = response) => {
  try {
    const { id } = req.params; // Comment Id
    const { user } = req;
    const { text } = req.body;

    let itineraryDB = await itineraryRepository.getOneByCommentId(id, user._id);

    if (!itineraryDB) {
      return res.status(404).json({
        success: true,
        message: "Comment not found",
        response: [],
      });
    }

    itineraryDB = await itineraryRepository.updateComment(id, text);

    res.status(200).json({
      success: true,
      message: "Comment updated",
      response: itineraryDB.comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

/**
 * User likes/dislike an itinerary
 * Updates likes count and users like array
 * @returns Status 200: Success, response: likes quantity, user like (boolean)
 * @returns Status 500: Internal server error
 */
const likeItinerary = async (req, res = response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    // Verify if user already liked the itinerary and identify the action (like / dislike)
    const userLiked = await itineraryRepository.getUserLiked(id, user._id);
    const action = userLiked ? "$pull" : "$push";

    // Get likes and set new quantity
    const { likes } = (await itineraryRepository.getLikes(id)) || 0;
    const newLikes = userLiked ? likes - 1 : likes + 1;

    // Update users like array and likes quantity
    await itineraryRepository.addUserLike(id, user._id, action);
    const modifiedItinerary = await itineraryRepository.updateLikes(id, newLikes);

    if (modifiedItinerary) {
      return res.status(200).json({
        success: true,
        message: "Liked updated",
        response: {
          likes: newLikes,
          liked: !userLiked,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = { getUserCommentsByItinerary, addUserComment, deleteComment, updateComment, likeItinerary };
