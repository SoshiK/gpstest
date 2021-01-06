export default function User(props) {
  const urlProc = (url) => {
    const arr = url.split("/");
    const info = arr[3];
    const key = arr[4].split("?")[0];
    let res = "https://open.spotify.com/embed/";
    if (info === "track") {
      res += "track/";
    } else {
      res += "episode"
    }
    res += key;
    return res;
  }
  return(
    <div>
      <p>Name: {props.name}</p>
      <p><iframe src={urlProc(props.url)} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>
    </div>
  )
}