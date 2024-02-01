import React, { useEffect, useState } from "react"
import { BASE_URL } from "../constants";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';

interface Country {
    name: string,
    borders: string[],
    area: number,
    population: number
}

const Countries: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data: countries } = await axios.get(BASE_URL)
            setCountries(countries)
        }

        fetchData()
    }, [])

    const handleSelect = (country: Country) => {
        setSelectedCountry(country)
        console.log(country);
    };

    return (
        <div className="countriesBox d-flex">
            <div className="countries">
                <ListGroup>
                    {countries.map((country) => (
                        <ListGroup.Item onClick={() => handleSelect(country)}>{country.name.common}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>

            {selectedCountry && (
                <div className="country-info ml-5 border h-50 rounded p-3">
                    <h2>Country Information</h2>
                    <p>Name: {selectedCountry.name.common}</p>
                    <p>Borders: {selectedCountry?.borders?.join(', ') || 'No borders'}</p>
                    <p>Area: {selectedCountry.area} km²</p>
                    <p>Population: {selectedCountry.population}</p>
                </div>)}
        </div>
    )
}

export default Countries
