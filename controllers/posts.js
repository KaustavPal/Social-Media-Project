const Posts = require("../models/posts");
const Comment = require("../models/comments");

const path = require("path");

exports.getMainPage = async (req, res, next) => {
  try {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../", "views", "index.html"));
  } catch (err) {
    console.log(err);
  }
};

exports.addPosts = async (req, res, next) => {
  try {
    const link = req.body.link;
    const description = req.body.description;

    if (!link || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await Posts.create({
      link: link,
      description: description,
    });
    console.log(`Post Added`);
    res.status(201).json({
      message: `Post Added`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addComments = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const comment = req.body.comment;

    if (!comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await Comment.create({
      comment: comment,
      postId: postId,
    });
    console.log(`Comment Added`);
    res.status(201).json({
      message: `Comment Added`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getComments = async (re, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.getBook = async (req, res, next) => {
//   const bookId = req.params.id;
//   try {
//     const book = await Books.findByPk(bookId);
//     res.status(200).json(book);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.returnedBooks = async (req, res, next) => {
//   const returnedId = req.params.id;
//   try {
//     const { name, takenTime, returnTime, returnedTime, fine } = req.body;

//     const returnedBook = await Books.findByPk(returnedId);

//     returnedBook.name = name;
//     returnedBook.takenTime = takenTime;
//     returnedBook.returnTime = returnTime;
//     returnedBook.returnedTime = returnedTime;
//     returnedBook.fine = fine;

//     await returnedBook.save();
//     res.status(200).json({ message: "Book Returned" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.deleteBooks = async (req, res, next) => {
//   const bookId = re.params.id;
//   try {
//     await Books.destroy({
//       wwhere: {
//         id: bookId,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
