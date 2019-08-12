import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

// which files types to resolve
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'index.tsx',

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

		resolve({ extensions, preferBuiltins: true }),

    typescript({
      typescript: require('typescript'),
      clean: true,
    }),

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
