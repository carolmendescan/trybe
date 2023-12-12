const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/routes/products.routes');

describe('Testando a rota get(products)', function () {
  describe('Usando o método GET em /', function () {
    it('testa a rota get products', function () {
      chai
        .request(app)
        .get('/products/')
        .end((_err, res) => {
          expect(res.status).have.status(200);
        });
    });
  });
});