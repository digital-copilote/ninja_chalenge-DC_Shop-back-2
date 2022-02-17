'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var cors_1 = __importDefault(require('cors'));
var dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use(express_1.default.json());
app.get('/', function (req, res) {
  res.status(200).send('coucou');
});
app.listen(process.env.PORT, function () {
  console.log('Server ready at http://localhost:'.concat(process.env.PORT));
});
