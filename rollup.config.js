import babel from '@rollup/plugin-babel'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'

export default {
	input: 'src/frontend/main.tsx',
	output: {
		format: 'es',
		file: "./dist/frontend/main.js"
	},
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify( 'production' )
		}),
		postcss(),
		external(),
		resolve(),
		commonjs(),
		babel(),
		typescript()
	]
};
