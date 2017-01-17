import defaultConfig from './default';
import development from './development';
import staging from './staging';
import production from './production';

const envs = { development, staging, production };
const getConfig = (env) => (
  Object.assign({}, defaultConfig, envs[env])
);

export default getConfig(process.env.NODE_ENV);
