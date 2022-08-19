import ScrollableFeed from "react-scrollable-feed";
import { isSameSenderMargin, isSameUser } from "../../Config/config/ChatLogics";

const ScrollableChat = ({ messages }) => {
  const user = JSON.parse(localStorage.getItem("user_id"));
  //console.log(messages);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", overflow: "hidden" }} key={m._id}>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user),
                marginTop: isSameUser(messages, m, i, user) ? 3 : 10,
                borderRadius: "10px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content.split(" ")[0].length > 20 ? m.content.substring(0, 20): m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
