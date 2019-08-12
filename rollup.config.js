import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

// which files types to resolve
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  // Where the source input is
  input: 'index.tsx',

  // create 2 builds; one for commonJS and one for ES6 modules
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      freeze: false,
    },
  ],
  plugins: [

		// resolve only jsx? | tsx? files
		resolve({ extensions, preferBuiltins: true }),

    // run the typescript compiler with options from tsconfig.json
    typescript({
      typescript: require('typescript'),
      clean: true,
    }),

    // using `.babelrc` configuration, run the files through babel while including a runtime helper
    // and excluding anything located under node_modules (the latter won't be ran through babel)
    babel({
      extensions,
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false,
          },
        ],
      ],
      plugins: ['babel-plugin-styled-components'],
    }),

    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['cloneElement', 'createContext', 'Component', 'createElement'],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'isForwardRef',
          'ForwardRef',
        ],
      }
    }),

  ],
	externals: ['react']
};
