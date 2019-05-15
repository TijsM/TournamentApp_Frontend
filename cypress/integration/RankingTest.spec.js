describe('RankingTest', function () {
  beforeEach(function () {
    cy.login();
  });



  it('mock ranking', function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/Tournament/ranking/2',
      status: 200,
      response: 'fixtures:UsersMen.json'
    });
  });


  it('Go to ranking', function () {
    cy.visit('http://localhost:4200/ranking');

  });

  it("check Ranking is present", function () {
    cy.get('[data-cy=rankingTable]')
  })

});



// describe('Ranking Test', function () {
//   cy.server({
//     delay: 1000
//   });
//   // elk request met cy.route of cy.request moet door deze 'server' gaan
//   cy.route({
//     method: 'GET',
//     url: '/api/Tournament/GiveRanking/2',
//     status: 200,
//     response: 'fixtures:UsersMen.json'
//   });

//   cy.visit("/ranking");
//   cy.get('[data-cy=rankingTable]')

// });


// it('Eroror ', function() {
//     cy.server();
//     cy.route({
//       method: 'GET',
//       url: '/api/Tournament/GiveRanking/2',
//       status: 500,
//       response: 'ERROR'
//     });
//     cy.visit('/');
//     cy.get('[data-cy=appError]').should('be.visible');
//   });
