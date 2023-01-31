import React, { useEffect } from "react";

//redux
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { storeFlightData } from "../redux/slices/flight.slice";
import { decrement, increment } from "../redux/slices/counter.slice";

//requests
import { httpgetAllFlight } from "../requests/flight";

export default function PgHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    httpgetAllFlight().then((data) => {
      dispatch(storeFlightData(data));
    });
  }, []);

  return <div></div>;
}
