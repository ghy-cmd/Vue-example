import { postRequest } from "./request";

export function submitLoginForm(data = {}) {
  return postRequest("login", {
    userName: data.userName,
    password: data.password
  });
}

export function submitRegisterForm(data = {}) {
  return postRequest("register", {
    userName: data.userName,
    password: data.password,
    admin: data.admin
  });
}

export function space_loadUserInfo(userId) {
  return postRequest("loadUserInfo", {
    userId: userId
  });
}

export function space_loadArticles(userId, articleId) {
  return postRequest("loadArticles", {
    userId: userId,
    lastArticleId: articleId
  });
}

export function noRegister_loadArticles(articleId) {
  return postRequest("loadAllArticles", {
    lastArticleId: articleId
  });
}

export function isAdmin(userId) {
  return postRequest("isAdmin", {
    userId: userId
  });
}

export function isFrozen(userId) {
  return postRequest("isFrozen", {
    userId: userId
  });
}

export function freeze(userId, adminId) {
  return postRequest("freeze", {
    userId: userId,
    adminId: adminId
  });
}

export function unFreeze(userId, adminId) {
  return postRequest("unFreeze", {
    userId: userId,
    adminId: adminId
  });
}

export function chat_loadFriendList(userId, page) {
  return postRequest("loadFriendList", {
    userId: userId,
    friendListPage: page
  });
}

export function chat_loadChatMessage(thisUserId, thatUserId, lastMessageId) {
  return postRequest("loadChatMessage", {
    thisUserId: thisUserId,
    thatUserId: thatUserId,
    lastMessageId: lastMessageId
  });
}

export function chat_sendChatMessage(thisUserId, thatUserId, message) {
  return postRequest("sendChatMessage", {
    thisUserId: thisUserId,
    thatUserId: thatUserId,
    message: message
  });
}

export function chat_blacklist(thisUserId, thatUserId) {
  return postRequest("blacklist", {
    thisUserId: thisUserId,
    thatUserId: thatUserId
  });
}

export function chat_clearChatMessage(thisUserId, thatUserId) {
  return postRequest("clearChatMessage", {
    thisUserId: thisUserId,
    thatUserId: thatUserId
  });
}

export function album_getAlbums(userId) {
  return postRequest("getAlbums", {
    userId: userId
  });
}

export function album_newAlbum(userId, albumName) {
  return postRequest("newAlbum", {
    userId: userId,
    albumName: albumName
  });
}

export function album_delAlbum(albumId) {
  return postRequest("delAlbum", {
    albumId: albumId
  });
}

export function album_delPicture(albumId, pictureId, url) {
  return postRequest("delPicture", {
    albumId: albumId,
    pictureId: pictureId,
    url: url
  });
}

export function album_getPictures(albumId) {
  return postRequest("getPictures", {
    albumId: albumId
  });
}

export function circle_loadPosts(userId, lastPostId) {
  return postRequest("loadPosts", {
    userId: userId,
    lastPostId: lastPostId
  });
}

export function circle_loadComments(postId, lastCommentId) {
  return postRequest("loadComments", {
    postId: postId,
    lastCommentId: lastCommentId
  });
}

export function circle_commentPost(userId, postId, comment) {
  return postRequest("commentPost", {
    postId: postId,
    userId: userId,
    comment: comment
  });
}

export function circle_starPost(userId, postId) {
  return postRequest("starPost", {
    postId: postId,
    userId: userId
  });
}

export function circle_starComment(userId, commentId) {
  return postRequest("starComment", {
    commentId: commentId,
    userId: userId
  });
}

export function circle_commentComment(userId, commentId, comment) {
  return postRequest("commentComment", {
    userId: userId,
    commentId: commentId,
    comment: comment
  });
}

export function circle_newPost(userId, post) {
  return postRequest("newPost", {
    userId: userId,
    post: post
  });
}

export function circle_delPost(postId) {
  return postRequest("delPost", {
    postId: postId
  });
}

export function account_getUserImg(userId) {
  return postRequest("getUserImg", {
    userId: userId
  });
}

export function account_loadUserInfo(userId) {
  return postRequest("loadUserInfoBefore", {
    userId: userId
  });
}

export function account_submitUserInfo(userId, personalInformationForm) {
  return postRequest("submitUserInfo", {
    userId: userId,
    personalInformationForm: personalInformationForm
  });
}

export function account_loadContact(userId) {
  return postRequest("loadContact", {
    userId: userId
  });
}

export function account_submitUserContact(userId, contact) {
  return postRequest("submitUserContact", {
    userId: userId,
    contact: contact
  });
}

export function account_loadFriends(userId) {
  return postRequest("loadFriends", {
    userId: userId
  });
}

export function account_delFriend(thisUserId, thatUserId) {
  return postRequest("delFriend", {
    thisUserId: thisUserId,
    thatUserId: thatUserId
  });
}

export function account_loadBlackList(userId) {
  return postRequest("loadBlackList", {
    userId: userId
  });
}

export function account_removeFromBlackList(thisUserId, thatUserId) {
  return postRequest("removeFromBlackList", {
    thisUserId: thisUserId,
    thatUserId: thatUserId
  });
}

export function article_loadComments(articleId, lastCommentId) {
  return postRequest("loadArticleComments", {
    articleId: articleId,
    lastCommentId: lastCommentId
  });
}

export function article_commentArticle(userId, articleId, comment) {
  return postRequest("commentArticle", {
    articleId: articleId,
    userId: userId,
    comment: comment
  });
}

export function visit_watch(thisUserId, thatUserId) {
  return postRequest("follow", {
    thisUserId: thisUserId,
    thatUserId: thatUserId
  });
}

export function visit_followed(thisUserId, thatUserId) {
  return postRequest("followed", {
    thisUserId: thisUserId,
    thatUserId: thatUserId
  });
}

/* 返回我关注的用户的posts，格式与'/loadPosts'相同 */
export function world_loadPosts(userId, lastPostId) {
  return postRequest("loadPostsWorld", {
    userId: userId,
    lastPostId: lastPostId
  });
}

/* 返回与关键词相关的posts，格式与'/loadPosts'相同 */
export function search_posts(input, lastPostId) {
  return postRequest("searchPosts", {
    input: input,
    lastPostId: lastPostId
  });
}

/* 返回关键词相关的articles，格式与'/loadArticles'相同 */
export function search_articles(input, lastArticleId) {
  return postRequest("searchArticles", {
    input: input,
    lastArticleId: lastArticleId
  });
}

export function search_spots(input) {
  return postRequest("searchSpots", {
    input: input
  });
}

/* 返回与关键词相关的posts，格式与'/loadPosts'相同 */
export function spot_posts(spotId, lastPostId) {
  return postRequest("spotPosts", {
    spotId: spotId,
    lastPostId: lastPostId
  });
}

/* 返回关键词相关的articles，格式与'/loadArticles'相同 */
export function spot_articles(spotId, lastArticleId) {
  return postRequest("spotArticles", {
    spotId: spotId,
    lastArticleId: lastArticleId
  });
}

// 返回一个 String
export function login_getQuestions(userName) {
  return postRequest("getQuestions", {
    userName: userName
  });
}

// 200 答案正确
export function login_checkAnswer(userName, answer) {
  return postRequest("checkAnswer", {
    userName: userName,
    answer: answer
  });
}

export function login_refreshPassword(userName, newPassword) {
  return postRequest("refreshPassword", {
    userName: userName,
    newPassword: newPassword
  });
}

export function login_setQuestion(userId, question, answer) {
  return postRequest("setAnswer", {
    userId: userId,
    question: question,
    answer: answer
  });
}
