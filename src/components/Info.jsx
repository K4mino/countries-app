import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {Button} from '../pages/Details';
import axios from "axios";
import { useState,useEffect } from "react";
import { filterByCode } from "../config";
import { createBrowserHistory } from "@remix-run/router";

const Wrapper = styled.section`
    display:grid;
    justify-content: space-between;
    margin-top: 3rem;
    grid-template-columns: 100%;
    gap: 2rem;

    @media(min-width:767px) {
        grid-template-columns: minmax(100px,400px) 1fr;
        align-items:center;
        gap: 5rem;
    }

    @media(min-width:1024px) {
        grid-template-columns: minmax(400px,600px) 1fr;
    }
`;

const InfoImg = styled.img`
    display:block;
    width:100%;
    height:100%;
    object-fit:contain;
`;

const InfoTitle = styled.h1``;

const ListGroup =  styled.div`
    display:flex;
    flex-direction: column;
    gap:2rem;

    @media(min-width:1024px){
        flex-direction: row;
    }
`;

const List = styled.ul`
    padding:0;
    list-style:none;
`;

const ListItem = styled.li`
    line-height: 1.8;
    & > b{
        font-weight: var(--fw-bold);
    }
`;

const Meta = styled.div`
    display:flex;
    flex-direction: column;
    align-items:flex-start;

    & > b{
        font-weight: var(--fw-bold);
    }

    @media(max-width:767px){
        flex-direction: row;
        align-items: center;
    }
`;

const TagGroup =styled.div`
    padding-top: 1rem;
    display:flex;
    gap: 10px;
    width: 520px;
    flex-wrap:wrap;
`;

const Tag = styled.span`

`;


export const Info = (props) => {

    const history = createBrowserHistory();

    const {
        name,
        nativeName,
        flag,
        capital,
        population,
        region,
        subregion,
        topLevelDomain,
        currencies = [],
        languages =[],
        borders = [],
    } = props;

    const navigate = useNavigate();

    const [neighbors,setNeighbors] = useState([]);

    useEffect(() => {
        if(borders.length)
            axios.get(filterByCode(borders)).then(({data}) => setNeighbors(data.map(c => c.name)))
    },[borders])

    return (
    <Wrapper>
        <InfoImg src={flag}/>
        <div>
            <InfoTitle>{name}</InfoTitle>
            <ListGroup>
                <List>
                    <ListItem><b>Native name:</b> {nativeName}</ListItem>
                    <ListItem><b>Population:</b> {population}</ListItem>
                    <ListItem><b>Region:</b> {region}</ListItem>
                    <ListItem><b>Sub Region:</b> {subregion}</ListItem>
                    <ListItem><b>Capital:</b> {capital}</ListItem>
                </List>

                <List>
                    <ListItem><b>Top level Domain: </b> {topLevelDomain.map(d => <span key={d}>{d}</span>)}</ListItem>
                    <ListItem><b>Currency: </b> {currencies.map(c => <span key={c.code}>{c.name} </span>)}</ListItem>
                    <ListItem><b>Languages: </b>{languages.map(l => <span key={l.name}>{l.name} </span>)}</ListItem>
                </List>
            </ListGroup>

            <Meta>
                <b>Border countries:</b><br/>
                {
                    !borders.length ? (<span>There are no borders</span>)
                        :  ( <TagGroup>
                                {
                                    neighbors.map((b,i) => (
                                    <Button key={i} onClick={() => navigate(`/country/${b}`)}>{b}</Button>))
                                }
                              </TagGroup>
                            )
                }
            </Meta>
        </div>
    </Wrapper>
    )
}