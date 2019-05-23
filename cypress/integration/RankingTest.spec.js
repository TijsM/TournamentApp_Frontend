/// <reference types="Cypress" />

it('login page', () => {
  cy.visit("http://localhost:4200/");
  cy.get('[data-cy=txtLoginMail]').type('novak.djokovich@gmail.com');
  cy.get('[data-cy=txtLoginPassword]').type('P@ssword1111');
  cy.get('[data-cy=submitLogin]').click();

})

it('load ranking', () => {
  cy.server();
  cy.route({
    method: 'GET',
    url: 'https://tournamentappapi.azurewebsites.net/api/Tournament/GiveRanking/2',
    status: 200,
    response: 'fixture:UsersMen.json'
  });

  cy.get('[data-cy=rankingTable]');
})

it('check ranking', () => {
  cy.server();
  cy.route({
    method: 'GET',
    url: 'https://tournamentappapi.azurewebsites.net/api/Tournament/GiveRanking/2',
    status: 200,
    response: 'fixture:UsersMen.json'
  });


  cy.get('[data-cy=rankingTable]').find('tr').should('have.length', 6)



})

it('Find details button', () => {
  cy.server();
  cy.route({
    method: 'GET',
    url: 'http://localhost:4200/api/Tournament/GiveRanking/2',
    status: 200,
    response: 'fixture:UsersMen.json'
  });


  cy.get('[data-cy=viewDetails]').first().click()
})




