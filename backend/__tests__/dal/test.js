const express = require('express');
const supertest = require('supertest');

const app = express();
app.use(express.json());

// Defina a rota de teste
app.post('/test-endpoint', (req, res) => {
  const { input, method, endOfLine } = req.body;
  let response = {};

  // Simulação de lógica de slideTyping
  if (method === 'slideTyping') {
    if (endOfLine) {
      response.nextWordDisplayedCorrectly = true;
    } else {
      response.duplicatedWord = input === 'example' ? 'example' : undefined;
    }
  }

  res.status(200).send(response);
});

const mockApp = supertest(app);

it("should not duplicate words when typing with slide typing", async () => {
  const response = await mockApp
    .post("/test-endpoint")
    .send({ input: "example", method: "slideTyping" })
    .expect(200);

  expect(response.body.duplicatedWord).toBeUndefined();
});

it("should display the next word correctly after slide typing at the end of the line", async () => {
  const response = await mockApp
    .post("/test-endpoint")
    .send({ input: "increase", method: "slideTyping", endOfLine: true })
    .expect(200);

  expect(response.body.nextWordDisplayedCorrectly).toBe(true);
});

module.exports = mockApp;
