import { useEffect, useState } from "react";
import { Search } from "./Search";
import { CustomSelect } from "./CustomSelect";
import styled from "styled-components";

const options = [
    {value: 'Africa', label: 'Africa'},
    {value: 'America', label: 'America'},
    {value: 'Asia', label: 'Asia'},
    {value: 'Europe', label: 'Europe'},
    {value: 'Ocenia', label: 'Ocenia'},
]

const Wrapper = styled.div`
    display:flex;
    align-items:flex-start;
    flex-direction: column;

    @media(min-width:767px) {
        flex-direction:row;
        justify-content:space-between;
        align-items: center;
    }
`;

export const Controls = ({onSearch}) => {

    const [search,setSearch] = useState('');
    const [region,setRegion] =useState('');

    useEffect(() => {
        const regionValue = region?.value || '';
        onSearch(search,regionValue);
    },[search,region])

    return (
        <Wrapper>
            <Search search={search} setSearch={setSearch}/>
            <CustomSelect
                options={options}
                placeholder="Filter by region"
                isClearable
                isSearchable={false}
                value={region}
                onChange={setRegion}
            />
        </Wrapper>
    )
}