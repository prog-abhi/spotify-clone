import Main from "./main/index.jsx";
import Navbar from "./navbar/index.jsx";
import "./index.css";

const user = {
  id: 1,
  playlists: [
    {
      id: 1,
      title: "This is demo playlist",
    },
    {
      id: 2,
      title: "This is another demo playlist",
    },
  ],
};

export default function Homepage() {
  return (
    <>
      <Navbar user={user} />
      <Main />
    </>
  );
}
