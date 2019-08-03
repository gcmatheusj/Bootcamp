const Post = require("../models/Post");

const index = async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
};

const store = async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
};

const destroy = async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
};

module.exports = {
  index,
  store,
  destroy
};
