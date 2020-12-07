# NodeBird의 구조를 따라가보자.

update : 2020.12.07 [ 더미데이터와 포스트폼 만들기 ]

---

# pages

1. \_app.js
2. index.js
3. profile.js
4. signup.js

## \_app.js

pages의 모든 파일에 '기본적으로' 적용 될 내용이다.

head(탭 이름)를 기본적으로 nodebird라고 준다.

## index.js

가장 기본적으로 load 되는 파일이다.

`return` 내부의 값을 `AppLayout`으로 묶음으로써 페이지 전체에 `AppLayout`을 적용시켰다.

`AppLayout` 내부 `PostForm` 과 `PostCard`를 생성해 가져왔다.

`PostForm` 즉 글을 쓸 수 있는 공간은 isLoggedIn 이라는 조건(=로그인이 되어있는 상태) 를 충족해야만 보여지며,

mainPosts라는 항목을 map 함수를 id와 post값을 주고 PostCard로 뿌려준다.

## profile.js

head title(탭 이름)을 내 프로필 | NodeBird로 만듦.

페이지 전체를 AppLayout으로 묶고 각각

```jsx
<NicknameEditForm />
<FollowList data={followingList}/>
<FollowList data={followerList}/>
```

라고 만들어준다.

그러면 `import` 해온 `NicknameEditForm`, `FollowList`, `FollowList` 컴포넌트가 순차적으로 표시된다.

이 때, `FollowList`를 가져왔을 때 인자로 `followerList` `followeringList` (더미데이터들)를 넘겨준다.(컴포넌트를 함수처럼 쓰는 것)

## siunup.js

커스텀 훅이 사용되어 조금 어려운 부분이다.

`id`, `nickname`, `passowrd` 등은 원래 useState를 **중복** 사용했다.

```jsx
const [id, setId] = useState("");
const [password, setPassword] = useState("");
const [nickname, setNickname] = useState("");

const onChangeId = useCallback((e) => {
  setId(e.tartget.value);
}, []);
const onChangePassword = useCallback((e) => {
  setPassword(e.tartget.value);
}, []);
const onChangeNickname = useCallback((e) => {
  setNickname(e.tartget.value);
}, []);
```

위와같은 중복된 코드들을 줄이기 위해 hooks/useInput.js 파일을 만들어서 작업한다.

**signup.js**

```jsx
import useInput from "../hooks/useInput";

const [id, onChangeId] = useInput("");
const [nickname, onChangeNickname] = useInput("");
const [password, onChangePassword] = useInput("");
```

**useInput.js**

```jsx
import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler];
};
```

**value = id, handler = onChangeId 이므로 각 인자를 대입해서 useInput을 가져오면 e.target.value가 먹힌다.**

이후 다른 state들은 리액트 form에 따라서 계속 바뀌므로 커스텀 훅 사용은 어렵고, useState와 useCallback을 통해 조건을 걸어준다.

---

# components

1. AppLayout.js
2. FollowList.js
3. NicknameEditForm.js
4. UserProfile.js
5. LoginForm.js

## AppLayout.js

웹앱 전반적으로 적용되는 레이아웃이다.

상단 바는 Menu 를 통해 각각

`/`로 가는 노드버드,  
`/profile`로 가는 프로필,  
검색 버튼, `/signup`으로 가는 회원가입 버튼

을 만들었다.

이후 Row(가로, 세로는 Column)와 그 하위태그인 Col을 이용해 break point를 잡아준다.

1. `UserProfile` 과 `LoginForm Component`를 가져와, `isLoggedIn` 이라는 state가 `true`일때에만 삼항 연산자를 통해 다른 form을 보여준다.

`isLoggedIn = true` 이면, `UserProfile`을, `isLoggedIn = false`이면 `LoginForm`을 보여준다.

이 때, useSelector(from react-redux) 를 통해 store에서 user.isLoggedIn 이라는 state를 가져오는 것이다.

2. `{ children }` 을 보여준다.

-> pages에서 `<AppLayout>`으로 감싼 내용들.

현재 `const AppLayout = ({children}) => {}` 으로, `children`을 인자로 내려준다.

3. 전에 만들었던, `<a>` 를 보여준다.

-> 결국 로그인 유무를 떠나 바뀌는것은 2번밖에 없다. (각 페이지 변환, 로그인이 되었으면 1번은 profile로 바뀌긴한다.)

## FollowList.js

profile 페이지의 2번, 3번 컴포넌트이다.

```jsx
<AppLayout>
  <NicknameEditForm /> // 1번
  <FollowList header="팔로잉 목록" data={followingList} /> // 2번
  <FollowList header="팔로워 목록" data={followerList} /> // 3번
</AppLayout>
```

FollowList의 인자인 header와 data를 profile 페이지에서 전달해준다.

그럼 그 인자를 가지고 FollowList는 함수처럼 인자를 가지고 요리한다.

`팔로잉 목록 - followingList` 를 준 List와 `팔로워 목록 - followerList` 를 준 List는 출력값이 다르다.

## NicknameEditForm.js

FollowList 와 같이 profile 페이지에 보여지는 컴포넌트이다.

Input.search 를 이용해 검색창을 구현했다.

## UserProfile.js

로그인이 되었다면, 그러니까 `setIsLoggedIn = true` 라면 보여지는 창이다.

Card 라는 antd의 컴포넌트를 이용해 전체적인 틀을 잡고 채워넣는다.

맨 하단 Button의 onClick 속성에 onLogOut 이라는 함수를 가져왔고,

이 함수는 useCallback을 통해 reducer의 logoutAction을 가져와서 dispatch(reducer에 action 통과)를 시켰다.

-> state가 `{ isLoggedIn : false, user: null }` 로 바뀌었다.

## LoginForm.js

화면 좌측 로그인 창을 구성하는 컴포넌트이다.

`AppLayout.js`에서 만든 것 처럼, `setIsLoggedIn = false` 일 때 현재 페이지인 `LoginForm.js`가 표시된다.

`useInput` 이라는 커스텀 훅을 가져와서 id와 password에 `useState`를 쓰는 것을 줄였다.

`onSubmitForm`을 통해 `setIsLoggedIn = true`로 만들어주고, store에 id와 password를 건네준다.

`FormWrapper`는 `FormWrapper = styled(form)` 를 써서 css를 먹였다.

`ButtonWrapper` 도 마찬가지. 단, base는 Button이므로 `htmlType="submit"` 을 넣어서 Form에 `onFinish`를 넣도록 해준다.

## PostCard.js

pages 의 index.js에서 PostForm 아래에다가

mainPosts라는 state를 store에서 받아와서 id와 post라는 인자를 넘겨서 PostCard에 map으로 뿌려준다.

즉, 타임라인의 게시물이다!

## PostForm.js

게시물을 적는 컴포넌트이다. 여기다가 게시물을 적고 '짹짹' 버튼을 누르면 postcard가 등록된다.

post에서 addPost라는 action을 가져와서 짹짹버튼을 누르면 dispatch(reducer에 action을 통과시킨다.) 한다.
