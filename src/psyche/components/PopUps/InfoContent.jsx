import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function InfoContent({ index, array}) {
	return (
		<>
				<Typography variant='h6' paragraph>
					<Box sx={{ fontWeight: 'bold' }}>{array[index].title}</Box>
				</Typography>
				
			<Typography paragraph>
				{array[index].text}
			</Typography>
			{index!==4 && (
      <img 
        src={array[index].image} 
        width='200vw' 
        style={{ display: 'block', margin: 'auto', padding: '2vh' }} 
        alt={array[index].alt} 
      />
    )}
			</>
	);
}

export default InfoContent;