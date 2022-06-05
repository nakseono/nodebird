import shortId from "shortid";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "서노",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          id: shortId.generate(),
          src: "https://i.ibb.co/qW3395P/26.gif",
        },
        {
          id: shortId.generate(),
          src: "https://i.ibb.co/v4GQkWQ/28.png",
        },
        {
          id: shortId.generate(),
          src: "https://i.ibb.co/k9wGr0M/20.png",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "dlwlrma",
          },
          content: "Love Poem",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "이지금",
          },
          content: "이름에게",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "이지금",
  },
  Images: [],
  Comments: [],
});

const dummyComments = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "dlwlrma",
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        addPostLoading: false,
        addPostError: action.error,
      };

    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
      };
    case REMOVE_POST_FAILURE:
      return {
        removePostLoading: false,
        removePostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      const Comments = [dummyComments(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
