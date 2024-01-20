import { useProvider } from "../contextAPI/context";

export default function Profile() {
  const { loggedUser } = useProvider();
  return <div>{loggedUser.username}</div>;
}
