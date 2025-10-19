import { useState } from "react";
import {faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Square({value, onSquareClick}){
    return (
        <button className="square" onClick={onSquareClick}>{value == "O"? <FontAwesomeIcon icon={faHeart} className="heart"/>: value}</button>
    );
}