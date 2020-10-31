const PATH = "./data.json";
const fs = require("fs");

class Post {
  get() {
    // get posts
    return this.readData();
  }

  getIndividualBlog(postId) {
    // get one specific post
    let posts = this.readData();
    let individualPost = posts.find(({ id }) => id == postId);
    return individualPost;
  }

  add(newPost) {
    // add new post
    const currentPosts = this.readData();
    currentPosts.unshift(newPost);
    this.storeData(currentPosts);
  }

  readData() {
    let rawData = fs.readFileSync(PATH);
    let posts = JSON.parse(rawData);
    return posts;
  }

  storeData(rawData) {
    let data = JSON.stringify(rawData);
    fs.writeFileSync(PATH, data);
  }
}

module.exports = Post;
