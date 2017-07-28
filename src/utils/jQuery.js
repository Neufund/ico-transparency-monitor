import jQuery from 'jquery';
import testJQuery from './jQueryMock';

const jquery = process.env.NODE_ENV === 'test' ? testJQuery.jQuery : jQuery;
export default jquery;
