import { useEffect, useState } from "react";

export default function GPS() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [res, setRes] = useState("")
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
  },[])
  return(
    <div>
      lat: {lat}
      lng: {lng}
      suc: {res}
    </div>
  )
}