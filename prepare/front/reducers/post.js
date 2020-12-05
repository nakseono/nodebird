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
          src:
            "https://drive.google.com/file/d/1fmxSp_STq19zxpTOx3nyYdoIG8PQkpba/view?usp=sharing",
        },
        {
          src:
            "https://drive.google.com/file/d/1NEcJBWPhmtCk7Jg9mhbuPjIxxEq6k3pt/view?usp=sharing",
        },
        {
          src:
            "https://drive.google.com/file/d/1SX1x16CSOdXz2FEgfygqWoc54uJmq05k/view?usp=sharing",
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
