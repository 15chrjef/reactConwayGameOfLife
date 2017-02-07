import React from 'react';

const BoardCell = (props) => {
	const { value } = props;
	var styles;
	if(value === 0) {
		styles = { backgroundColor: 'red'}
	}
	return(
		<div 
			style={{
				border: '1px solid black', 
				fontSize: '12px', 
				padding: '5px', 
				...styles
			}}
		/>
	)
}

export default BoardCell;