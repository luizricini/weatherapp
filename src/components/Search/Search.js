import React from 'react'
import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './Search.css'

function Search() {

  const [infos, setInfos] = useState([]);

  const [searchInfos, setSearchInfos] = useState(false);

  useEffect(verifyInfos, [infos])

  function verifyInfos(){
    if(infos.name){
        setSearchInfos(true);
    }
  }

  function searchInput(e){
    e.preventDefault();
    setSearchInfos(false);
    let currentValue = document.querySelector('input[name=searchInput]')
    .value;
    // Request API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=c16fd3e13a767e8a501c746e9391a410&units=metric&lang=pt_br`;
    fetch(url)
        .then(response=> response.json())
        .then(async data=> {
            const {main, name, sys, weather, wind, dt} = data;
            if(sys !== undefined){
                
                if(weather !== undefined){
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    weather[0]["icon"]}.svg`;

                    const dateToday = new Date(dt * 1000);

                    const values = {
                        name: name,
                        country: sys.country,
                        temp: main.temp,
                        feels_like: main.feels_like,
                        wind: wind['speed'],
                        description: weather[0]['description'],
                        date: dateToday.toLocaleDateString('pt-br'),
                        icon: icon
                    }

                    setInfos(values);
                }
            }else(setInfos([]))
        })
  }

  return (
    <div className='searchWraper'>
        <div className='search'>
            <h1>Weather App</h1>
            <h3>Digite a cidade para buscar a previsão:</h3>
            <form onSubmit={(e) => searchInput(e)}>
                <input type="text" className='inputSearch' name="searchInput" placeholder='Digite a cidade' />
                <input type='submit' className='inputSubmit' value='Pesquisar' />
            </form>
        </div>
        {
            (searchInfos)?
                <div className='containerWrapper'>
                    <h1>{infos?.name} - {infos?.country}</h1>
                    <h3>{infos?.date}</h3>
                    <div className='grid'>
                        <Card title='Temperatura' body={infos?.temp} /> 
                        <Card title='Sensação Térmica' body={infos?.feels_like} /> 
                    </div>
                    <div className='grid'>
                        <Card title='Valocidade do Vento' body={infos?.wind} /> 
                        <Card title={infos?.description} body={infos?.icon} isImg={true} /> 
                    </div>
                    {/* <div className='grid-1'>
                        <Card title={infos?.description} body={infos?.icon} isImg={true}/> 
                    </div> */}

                </div>:
            <div className='searchEmpty'>Nenhuma cidade na busca</div>
        }
    </div>
  )
}

export default Search