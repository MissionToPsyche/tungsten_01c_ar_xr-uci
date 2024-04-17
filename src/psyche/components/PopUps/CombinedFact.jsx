import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BuildIcon from '@mui/icons-material/Build';

import ScaleImage from '../../../../public/assets/psyche_scale.svg';

import OrbitTrimImage from '../../../../public/assets/psyche_orbit_trim.png';
import OrbitImage from '../../../../public/assets/psyche_orbit.svg';

import FormationTrimImage from '../../../../public/assets/psyche_formation_trim.png';
import FormationImage from '../../../../public/assets/psyche_formation.svg';

import DimensionImage from '../../../../public/assets/psyche_dimension.svg';

import DiameterImage from '../../../../public/assets/psyche_diameter.svg';
import DensityImage from '../../../../public/assets/psyche_density.svg';
import SurfaceAreaImage from '../../../../public/assets/psyche_surface_area.svg';

import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Grid } from '@mui/material';


function CombinedFact() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
	
  return (
		<>
		<Grid container columnSpacing={6}>
			<Grid item xs={2}>
				<img src={DimensionImage} alt="DimensionImage" height='40'/>
			</Grid>
			<Grid item xs={10}>
				<Typography paragraph>
				Dimensions:
				<br />
				173 x 144 x 117 mi
				</Typography>
			</Grid>
		</Grid>
		<Grid container columnSpacing={6}>
			<Grid item xs={2}>
				<img src={DiameterImage} alt="DiameterImage" height='40'/>
			</Grid>
			<Grid item xs={10} >
				<Typography paragraph>
					Diameter:
					<br />
					140 mi (226 km) if shown as a perfect sphere
				</Typography>
			</Grid>
		</Grid>
		<Grid container columnSpacing={6}>
			<Grid item xs={2}>
				<img src={DensityImage} alt="DensityImage" height='40'/>
			</Grid>
			<Grid item xs={10}>
			<Typography paragraph>
				Density:
				<br />
				Estimated 3,400 to 4,100 kg/m³
			</Typography>
			</Grid>
		</Grid>
		<Grid container columnSpacing={6}>
			<Grid item xs={2}>
				<img src={SurfaceAreaImage} alt="SurfaceAreaImage" height='40'/>
			</Grid>
			<Grid item xs={10}>
				<Typography paragraph>
					Surface Area:
					<br />
					64,000 mi² (165,800 km²)
				</Typography>
			</Grid>
		</Grid>
	</>
  );
}

export default CombinedFact;