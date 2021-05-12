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
          src: "https://i.ibb.co/qW3395P/26.gif",
        },
        {
          src: "https://i.ibb.co/v4GQkWQ/28.png",
        },
        {
          src: "https://i.ibb.co/k9wGr0M/20.png",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "dlwlrma",
          },
          content: "Love Poem",
        },
        {
          User: {
            nickname: "이지금",
          },
          content: "이름에게",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "낙서노",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
