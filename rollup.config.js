import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'

export default {
	input: 'src/frontend/main.tsx',
	output: {
		dir: 'dist',
		format: 'es'
	},
	plugins: [
		postcss(),
		external(),
		resolve(),
		commonjs(),
		babel(),
		typescript()
	]
};
