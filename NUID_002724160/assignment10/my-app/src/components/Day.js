import React from 'react';
import Icon from './Icon';

const Day = ({ day }) => {
    const { temp_max, temp_min, weather } = day
    const weatherType = weather || 'unknown';
    return (
        <tr>
            <td>{temp_max}&deg;</td>
            <td>{temp_min}&deg;</td>
            <td>
                <Icon name={weatherType}>
                    {weatherType}
                </Icon>
            </td>
        </tr>
    );
};
  
export default Day;
