it('Ranking Test', function () {
  cy.server({
    delay: 1000
  });
  // elk request met cy.route of cy.request moet door deze 'server' gaan
  cy.route({
    method: 'GET',
    url: '/api/Tournament/GiveRanking/2',
    status: 200,
    response: 'fixtures:UsersMen.json'
  });

  cy.visit("/ranking");
  cy.get('[data-cy=rankingTable]')

});
