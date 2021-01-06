import { useEffect, useState } from "react";
import UserList from "./UserList";

export default function GPS() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [res, setRes] = useState("");
  const [dis, setDis] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const success = (pos) => {
      console.log("success");
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setLat(lat);
      setLng(lng);
      setRes("seikou")
    }
    const fail = (pos) => {
      console.log("sipai");
      setRes("SIppai");
    }
    navigator.geolocation.getCurrentPosition(success, fail);
  },[]);
  const click = () => {
    fetch(`/api/distance?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then((data) => setDis(data.dis));
  }
  const click2 = () => {
    fetch(`/api/nearby?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }
  return(
    <div>
      <p>lat: {lat}</p>
      <p>lng: {lng}</p>
      <p>suc: {res}</p>
      <p><iframe src="https://open.spotify.com/embed/track/5vnTYL1H4uGzNaMB14wagO" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>
      <p><iframe src="https://open.spotify.com/embed/episode/2Ej7BKE5R7MnuTDEqeY3dB" width="300" height="150" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>
      <p><button onClick={click}>click</button></p>
      <p>{dis}</p>
      <p><button onClick={click2}>showNearbyUser</button></p>
      <UserList users={users} />
    </div>
  )
}
