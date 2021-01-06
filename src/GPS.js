import { useEffect, useState } from "react";
import UserList from "./UserList";

export default function GPS() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [res, setRes] = useState("");
  const [km, setKm] = useState(0);
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
  const click2 = () => {
    fetch(`/api/nearby?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }
  const inputText = (e) => {
    setKm(Number(e.target.value));
  }
  const filterClick = () => {
    fetch(`/api/filter?km=${km}&lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }
  return(
    <div>
      <p>lat: {lat}</p>
      <p>lng: {lng}</p>
      <p>suc: {res}</p>
      <p><button onClick={click2}>showNearbyUser</button></p>
      <div>
        <input type="text" onChange={inputText} /> km
        <button onClick={filterClick}>filter</button>
      </div>
      <UserList users={users} />
    </div>
  )
}
