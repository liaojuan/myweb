// 导入封装好的网络请求类工具
import Network from './network';

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);
export const getTable1H2O = () => Network.get('/global_config', { version: '1' });
export const getTable2H2O = () => Network.get('/getStu', { tableName: 'table2H2O' });
