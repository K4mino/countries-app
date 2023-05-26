import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { searchByCountry } from "../config";
import styled from "styled-components";
import { Info } from "../components/Info";

export const Button = styled.button`
    padding: 0 1rem;
    background-color: var(--color-ui-base);
    box-shadow: var(--shadow);
    line-height: 2.5;
    border-radius: var(--radii);
    border:none;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    color: var(--colors-text);
    cursor:pointer;
`;

export const Details = ({match}) => {
    const [country,setCountry] = useState(null);

    const navigate = useNavigate();
    const {name} =useParams()


    useEffect(() => {
        axios.get(searchByCountry(name))
        .then(({data}) => setCountry(data[0]));
    },[name])

    return (
        <div>
            <Button onClick={() => navigate(-1)}><IoArrowBack/> Back</Button>
            {
               country && <Info {...country}></Info> 
            }
        </div>
    )
}