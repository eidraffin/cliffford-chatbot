import { Link } from "react-router-dom";
import "./ChatList.css";
import { useQuery, useMutation, useQueryClient,  } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        method: "DELETE",
        credentials: "include",
      }).then((res) => res.text());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate("/dashboard"); 
      window.location.reload(); 
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDeleteHistory = () => {
    mutation.mutate();
  };

  return (
    <div className="chatList">
      <Link to="/dashboard">New chat</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div 
        className="delete-history"
        onClick={handleDeleteHistory}
      >
        Delete History
      </div>
    </div>
  );
};

export default ChatList;
