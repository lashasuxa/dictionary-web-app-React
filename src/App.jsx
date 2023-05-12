import { useState } from 'react';
import { Input, Switch } from '@mui/material';
import { Box,Button, List, ListItem, Typography } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import axios from 'axios';

function App() {
  const [toggleState, setToggleState] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [font, setFont] = useState('Sans Serif');



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
  const handleToggle = () => {
  setToggleState(!toggleState);
  if (!toggleState) {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
};

// This function finds the first phonetic object with a .mp3 audio URL.
const findAudioUrl = (phonetics) => {
  for (let i = 0; i < phonetics.length; i++) {
    if (phonetics[i].audio && phonetics[i].audio.endsWith('.mp3')) {
      return phonetics[i].audio;
    }
  }
  return null; // return null if no .mp3 audio URL is found
};

// This function will be called when the play button is clicked.
const playAudio = () => {
  const audioUrl = findAudioUrl(searchResults.phonetics);
  if (audioUrl) { // only try to play the audio if a .mp3 audio URL was found
    const audio = new Audio(audioUrl);
    audio.play();
  }
};
const phoneticText = searchResults && searchResults.phonetics && searchResults.phonetics.find(phonetic => phonetic.text);



  return (
    <Box sx={{ backgroundColor: toggleState ? 'black' : 'white', color: toggleState ? 'white' : 'black', width: 736,height: '100%', margin: '63px auto 0'}}>
      <Box className="header" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',marginBottom:"54px"  }}>
        <img src="/logo.svg" alt="" />
        <Box sx={{ display: 'flex', flexDirection: 'row',gap:"10px", alignItems: 'center' }}>
          
          <Select
              value={font}
              onChange={(event) => setFont(event.target.value)}
              sx={{ color: toggleState ? 'white' : 'black' }}
          >
              <MenuItem value={'Sans Serif'}>Sans Serif</MenuItem>
              <MenuItem value={'Serif'}>Serif</MenuItem>
              <MenuItem value={'Mono'}>Mono</MenuItem>
          </Select>
          
          <Box sx={{ backgroundColor: '#E9E9E9', width: '1px', height: '32px' }} />
          <Switch checked={toggleState} onChange={handleToggle} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'white' }, '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': { backgroundColor: 'black' } }} />
          <img src="/icon-moon.svg" alt="" />
       </Box>
      </Box>
      <Box component='form' onSubmit={handleSearch} className='searchBar' sx={{height:'64px',marginBottom:'45px',paddingLeft:'24px',paddingRight:'24px',backgroundColor: toggleState ? '#1F1F1F' : '#F4F4F4',borderRadius:'16px',display:"flex",alignItems:'center',justifyContent:'space-between'}}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for a word"
        inputProps={{ style: { borderBottom: 'red' } }}
      />

        <Button type='submit' >
          <img src="/icon-search.svg" alt="searchImg" />
        </Button>
      </Box>
    
       {searchResults ?( <Box className='main'>
            <Box className="audio_container" sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:'54px'}}>
            <Box className="audio-left" sx={{display:'flex',flexDirection:'column'}}>
            <Typography 
                className='main_word' 
                variant='body1' 
                sx={{fontSize:'64px', lineHeight:'77px', fontFamily: font}}
            >
                {searchResults.word}
            </Typography>
            <Typography variant='body1' sx={{color:'#A445ED',fontSize:'24px',lineHeight:'29px'}}>
              {phoneticText && phoneticText.text}
            </Typography>

            </Box>
            <Box className="audio-right">
            <img src="/icon-play.svg" alt="" onClick={playAudio} />
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
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    {definition.examples &&
                      definition.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex}>
                          {example}
                        </li>
                      ))}
                  </ul>
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
                {searchResults.sourceUrls && searchResults.sourceUrls[0] && (
                  <Typography component="a" href={searchResults.sourceUrls[0]} target="_blank" rel="noopener noreferrer" variant="body1" sx={{ textTransform: 'none',color:'#2D2D2D' }}>
                    {searchResults.sourceUrls[0]}
                  </Typography>
                )}
              </Button>
  
            </Box>
        </Box>):null}
    </Box>
  );
}

export default App;
