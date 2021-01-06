import User from "./User";

export default function UserList(props) {
  const users = props.users;
  const list = [];
  for (const user of users) {
    list.push(
      <User 
        name = {user.name}
        dis = {user.dis}
        key= {user.name}
        url={user.url}
      />
    )
  }
  return <div>{list}</div>;
}