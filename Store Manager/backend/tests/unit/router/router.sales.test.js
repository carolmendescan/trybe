const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../../src/routes/sales.routes');

describe('Testando a rota get(sales)', function () {
  describe('Usando o método GET em /', function () {
    it('testa a rota get sales', function () {
      chai
        .request(app)
        .get('/sales/')
        .end((err, res) => {
          expect(res.status).have.status(200);
          expect(err).have.status(404);
        });
    });
  });
});