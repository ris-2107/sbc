import { Box, Grid } from '@chakra-ui/react'
import React from 'react'
import sampleVideo from '../../assets/videos/sampleVdo.mp4';

const CoursePage = () => {
  return (
   <Grid minH={"90vh"} templateColumns={["1fr","3fr 1fr"]}>
    <Box>
    <video
    width={'100%'}
          src={sampleVideo}  
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
    </Box>
   </Grid>
  )
}

export default CoursePage
