import React from 'react';
import {} from 'styled-components/cssprop';
import { css } from 'styled-components';

const Button: React.FC = () => (
	<button
		css={css`
			background-color: blue;
			&:hover{
				background-color:red;
			}
		`}
	>
		This is a test
	</button>
);

export default Button;
