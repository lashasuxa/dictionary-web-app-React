import { useState } from 'react';
import { Switch } from '@mui/material';
import { Box,Button, List, ListItem, Typography } from '@mui/material';
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
    <Box sx={{ backgroundColor: toggleState ? 'black' : 'white', color: toggleState ? 'white' : 'black', width: 736,height: '100%', margin: '63px auto 0'}}>
      <Box className="header" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',marginBottom:"54px"  }}>
        <img src="/logo.svg" alt="" />
        <Box sx={{ display: 'flex', flexDirection: 'row',gap:"10px", alignItems: 'center' }}>
          <p >Sans Serif </p>
          <img src="/icon-arrow-down.svg" alt="" />
          <Box sx={{ backgroundColor: '#E9E9E9', width: '1px', height: '32px' }} />
          <Switch checked={toggleState} onChange={handleToggle} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'white' }, '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': { backgroundColor: 'black' } }} />
          <img src="/icon-moon.svg" alt="" />
        </Box>
      </Box>
      <Box component='form' onSubmit={handleSearch} className='searchBar' sx={{height:'64px',marginBottom:'45px',paddingLeft:'24px',paddingRight:'24px',backgroundColor: toggleState ? '#1F1F1F' : '#F4F4F4',borderRadius:'16px',display:"flex",alignItems:'center',justifyContent:'space-between'}}>
        <input type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder='Search for a word'  />
        <button type='submit' >
          <img src="/icon-search.svg" alt="" />
        </button>
      </Box>
      <Box className='main'>
        <Box className="audio_container" sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:'54px'}}>
          <Box className="audio-left" sx={{display:'flex',flexDirection:'column'}}>
          <Typography variant='body1' sx={{fontSize:'64px',lineHeight:'77px'}}>{searchResults.word}</Typography>
          <Typography variant='body1' sx={{color:'#A445ED',fontSize:'24px',lineHeight:'29px'}}>{searchResults.phonetics && searchResults.phonetics[0] && searchResults.phonetics[0].text}</Typography>


          </Box>
          <Box className="audio-right">
            <img src="/icon-play.svg" alt="" />
          </Box>
        </Box>
          <Box sx={{display:'flex',flexDirection:'row', alignItems:'center',marginBottom:'40px'}}>
              <Typography variant='body1' sx={{fontSize:'24px',lineHeight:'29px'}}>
              {searchResults.meanings && searchResults.meanings[0] && searchResults.meanings[0].partOfSpeech}
              </Typography>
              <Box sx={{height: '1px', width: '656px', backgroundColor: '#E9E9E9', marginLeft: '20px'}} />
          </Box>
          <Typography variant="h6" sx={{ fontSize: '20px', lineHeight: '24px', color: '#757575' }}>
            Meaning
          </Typography>
          
          <List>
            {searchResults.meanings &&
              searchResults.meanings[0] &&
              searchResults.meanings[0].definitions &&
              searchResults.meanings[0].definitions.map((definition, index) => (
                <ListItem key={index}>
                  <h3>{definition.definition}</h3>
                  <List>
                    {definition.examples &&
                      definition.examples.map((example, exampleIndex) => (
                        <ListItem key={exampleIndex}>{example}</ListItem>
                      ))}
                  </List>
                </ListItem>
              ))}
          </List>








          <Box className='synonyms' sx={{display:'flex',flexDirection:'row', alignItems:'center',marginTop:'64px',marginBottom:'40px'}}>
          <Typography variant="h6" sx={{ fontSize: '20px', lineHeight: '24px', color: '#757575',marginRight:'20px' }}>
            Synonyms
          </Typography>
            <Typography variant="h6" sx={{ fontSize: '20px', lineHeight: '24px', color: '#A445ED', marginRight: '20px' }}>
            {searchResults.meanings &&
              searchResults.meanings[0] &&
              searchResults.meanings[0].synonyms &&
              searchResults.meanings[0].synonyms.join(', ')}
          </Typography>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row', alignItems:'center',marginBottom:'40px'}}>
              
              

            <Box sx={{display:'flex',flexDirection:'row', alignItems:'center',marginBottom:'40px'}}>
                <Typography variant='body1' sx={{fontSize:'24px',lineHeight:'29px'}}>
                {searchResults.meanings && searchResults.meanings[1] && searchResults.meanings[1].partOfSpeech}
                </Typography>
                <Box sx={{height: '1px', width: '656px', backgroundColor: '#E9E9E9', marginLeft: '20px'}} />
            </Box>






              <Box sx={{height: '1px', width: '656px', backgroundColor: '#E9E9E9', marginLeft: '20px'}} />
          </Box>
          <Box className="verb" sx={{marginBottom:'40px'}}>
            <Typography variant="h6" sx={{ fontSize: '20px', lineHeight: '24px', color: '#757575' }}>
              Meaning
            </Typography>
              


            <List>
            {searchResults.meanings &&
              searchResults.meanings[1] &&
              searchResults.meanings[1].definitions &&
              searchResults.meanings[1].definitions.map((definition, index) => (
                <ListItem key={index}>
                  <h3>{definition.definition}</h3>
                  <List>
                    {definition.examples &&
                      definition.examples.map((example, exampleIndex) => (
                        <ListItem key={exampleIndex}>{example}</ListItem>
                      ))}
                  </List>
                </ListItem>
              ))}
          </List>



                

          </Box>
            <Box className='line'sx={{height: '1px', width: '100%', backgroundColor: '#E9E9E9',marginBottom:'19px'}} >
            </Box>
            <Box className="source" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontSize: '14px', lineHeight: '17px', textDecorationLine: 'underline', color: '#757575',marginRight:'20px' }}>
                Source
              </Typography>
              <Button endIcon={<img src="/icon-new-window.svg" alt="" />}>
                  {searchResults.sourceUrls && searchResults.sourceUrls.map((url, index) => (
                    <Typography key={index} component="a" href={url} target="_blank" rel="noopener noreferrer" variant="body1"sx={{ textTransform: 'none',color:'#2D2D2D' }}>
                      {url}
                    </Typography>
                  ))}
              </Button>
  
            </Box>
            
        
            
        

      </Box>
    </Box>
  );
}

export default App;
