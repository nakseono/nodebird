import React, { useCallback, useState } from "react";
import { Card, Button, Popover, Avatar } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [CommentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const id = useSelector((state) => state.user.me?.id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.user.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">수정</Button>
                  </>
                ) : (
                  <Button>수정</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        ></Card.Meta>
      </Card>
      {CommentFormOpened && <div>댓글 부분</div>}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
};

export default PostCard;
