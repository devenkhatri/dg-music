import React from 'react';
import { useGlobal } from '../globalstore';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { isBrowser } from '../utils'
import { Grid } from 'semantic-ui-react';

const SongPlayer = ({ playList, playIndex, autoPlay }) => {
    const [globalState, globalActions] = useGlobal();
    return (
        <Grid>
            {isBrowser &&
                <ReactJkMusicPlayer
                    glassBg
                    preload
                    showMediaSession
                    clearPriorAudioLists
                    remove={false}
                    mode='full'
                    showDownload={false}
                    spaceBar={true}
                    defaultPosition={{
                        top: 80,
                        left: '80%',
                    }}
                    audioLists={playList}
                    autoPlay={false}
                    playIndex={playIndex || 0}
                    onAudioPlay={(audioInfo) => { audioInfo.recordId && globalActions.incrementPlayCountAirtable(audioInfo.recordId) }}
                />
            }
        </Grid>
    );
}

export default SongPlayer;