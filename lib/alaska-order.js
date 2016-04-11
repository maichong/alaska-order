'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderService extends _alaska2.default.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = __dirname;
    options.id = 'alaska-order';
    super(options, alaska);
  }
}
exports.default = OrderService; /**
                                 * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                 * @date 2016-04-06
                                 * @author Liang <liang@maichong.it>
                                 */