import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Switch } from '@mui/material';
import axios from 'axios';

function App() {
  const [toggleState, setToggleState] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      console.log(response.data);
      setSearchResults(response.data[0]);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    }
  };

  return (
    <Box sx={{ backgroundColor: toggleState ? 'black' : 'white', color: toggleState ? 'white' : 'black', width: 736,height: '100vh', margin: '63px auto 0'}}>
      <Box className="header" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',marginBottom:"54px"  }}>
        <img src="/logo.svg" alt="" />
        <Box sx={{ display: 'flex', flexDirection: 'row',gap:"10px", alignItems: 'center' }}>
          <p sx={{ color: toggleState ? 'white' : 'black' }}>Sans Serif </p>
          <img src="/icon-arrow-down.svg" alt="" />
          <Box sx={{ backgroundColor: '#E9E9E9', width: '1px', height: '32px' }} />
          <Switch checked={toggleState} onChange={handleToggle} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'white' }, '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': { backgroundColor: 'black' } }} />
          <img src="/icon-moon.svg" alt="" />
        </Box>
      </Box>
      <Box component='form' onSubmit={handleSearch} className='searchBar' sx={{height:'64px',marginBottom:'45px',paddingLeft:'24px',paddingRight:'24px',backgroundColor: toggleState ? '#1F1F1F' : '#F4F4F4',borderRadius:'16px',display:"flex",alignItems:'center',justifyContent:'space-between'}}>
        <input type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder='Search for a word' sx={{ backgroundColor: toggleState ? '#2D2D2D' : '#F4F4F4', color: toggleState ? 'white' : 'black', border: 0, borderRadius: 8, fontSize: 18, fontWeight: 400, padding: '12px 16px', width: '100%' }} />
        <button type='submit' sx={{ backgroundColor: toggleState ? '#444444' : '#E5E5E5', color: toggleState ? 'white' : 'black', border: 0, borderRadius: 8, fontSize: 18, fontWeight: 500, padding: '12px 24px' }}>
          <img src="/icon-search.svg" alt="" />
        </button>
      </Box>
      <Box className='main'>
        <Box className="audio_container" sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Box className="audio-left" sx={{display:'flex',flexDirection:'column'}}>
            <span>{searchResults.word}</span>
            <span>transcript</span>
          </Box>
          <Box className="audio-right">
            <img src="/icon-play.svg" alt="" />
          </Box>
        </Box>
        

      </Box>
    </Box>
  );
}

export default App;
