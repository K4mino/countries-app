import axios from 'axios'
import { useEffect, useState } from 'react';
import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { ALL_COUNTRIES } from '../config';
import { useNavigate, useParams } from 'react-router-dom';


export const HomePage = ({countries,setCountries}) => {
  
  const [filteredCountries,setFilteredCountries] = useState(countries);
 
  const navigate = useNavigate();

  const {name} = useParams();

  const handleSearch = (search,region) => {
    let data = [...countries];

    if(region) {
      data = data.filter((c) => c.region.includes(region))
    }

    if(search) {
      data = data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    setFilteredCountries(data)
  }

  useEffect(() => {
    if(!countries.length) 
      axios.get(ALL_COUNTRIES).then(({data}) => setCountries(data))
  },[]);

  useEffect(() => {
    handleSearch();
  },[countries])

    return ( 
        <>
            <Controls onSearch={handleSearch}></Controls>
      <List>
        {
          filteredCountries.map((el) => {
            const countryInfo = {
            img: el.flags.png,
            name: el.name,
            info: [
                {title: 'Population',
                description: el.population.toLocaleString()
                },
                {title: 'Region',
                description: el.region
                },
                {title: 'Capital',
                description: el.capital
                },
            ]
        }
          return (
            <Card key={el.name} onClick={() => navigate(`/country/${el.name}`)} {...countryInfo}></Card>
          )}
          )
        }
      </List>
        </>
    )
}