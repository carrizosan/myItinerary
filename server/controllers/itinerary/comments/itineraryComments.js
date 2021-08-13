const { response } = require("../itineraryModule");
const itineraryRepository = require("../../../repositories/itineraryRepository");

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
        ok: true,
        message: "No comments",
        response: [],
      });
    }

    comments.forEach((comment) => {
      if (comment.userId.toString().trim() == user._id.toString().trim()) {
        commentsId.push(comment._id);
      }
    });

    res.status(200).json({
      ok: true,
      message: "Comments",
      response: {
        arrayOwnerCheck: commentsId,
        likedChek: userLiked,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

const addUserComment = async (req, res = response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const itineraryDB = await itineraryRepository.getOne(id);
    let commentsId = [];

    if (!itineraryDB) {
      return res.status(404).json({
        ok: false,
        message: "Itinerary not found",
        response: [],
      });
    }

    let { comments } = itineraryDB;

    const newComment = {
      userId: req.user._id,
      text: text,
      userName: req.user.firstName,
      userPic: req.user.userPic,
    };

    comments.push(newComment);

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
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

const deleteComment = async (req, res = response) => {
  try {
    const { id } = req.params; // Comment Id
    const { user } = req;

    const itineraryDB = await itineraryRepository.getOneByCommentId(id, user._id);

    console.log("itinerary:", itineraryDB);

    if (!itineraryDB) {
      return res.status(404).json({
        ok: true,
        message: "Comment not found",
        response: [],
      });
    }

    console.log(itineraryDB);

    let { comments } = itineraryDB;

    comments = comments.filter((comment) => comment._id.toString().trim() !== id.toString().trim());

    itineraryRepository.updateComments(comments, itineraryDB._id);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
      response: comments,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateComment = async (req, res = response) => {
  try {
    const { id } = req.params; // Comment Id
    const { user } = req;
    const { text } = req.body;

    let itineraryDB = await itineraryRepository.getOneByCommentId(id, user._id);

    if (!itineraryDB) {
      return res.status(404).json({
        ok: true,
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
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = { getUserCommentsByItinerary, addUserComment, deleteComment, updateComment };
