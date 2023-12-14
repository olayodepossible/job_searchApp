import React from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity, Image} from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image 
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}

      />

    </TouchableOpacity>
  )
}

ScreenHeaderBtn.propTypes = {
  iconUrl: PropTypes.string.isReuired, 
  dimension: PropTypes.string.isReuired, 
  // handlePress: PropTypes.function TODO
}
export default ScreenHeaderBtn