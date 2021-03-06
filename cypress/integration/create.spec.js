describe('Home', () => {
  it('should create a recommendation', () => {
    //arrange
    const song = {
      name: 'Bad Romance',
      youtubeLink: 'https://www.youtube.com/watch?v=qrO4YZeyl0I',
    };

    //act
    cy.visit('http://localhost:3000/');

    cy.get('input[placeholder=Name]').type(song.name);
    cy.get('input[id=youtubeLink]').type(song.youtubeLink);

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('create');
    cy.get('button[id=create]').click();
    cy.wait('@create');

    //assert
    cy.contains(song.name).should('not.be.undefined');
    cy.contains(song.youtubeLink).should('not.be.undefined');

    cy.end();
  });

  it('should add to likes when upvote button is clicked', () => {
    cy.get('article')
      .first()
      .find('> :last')
      .then(($likes) => {
        const previousLikes = parseInt($likes.text());

        cy.get('article').first().find('svg[id=up]').click().then(() => {
          const currentLikes = parseInt($likes.text())
          expect(currentLikes).to.above(previousLikes)
        });
      });
  });

  it('should subtract from likes when downvote button is clicked', () => {
    cy.get('article')
      .first()
      .find('> :last')
      .then(($likes) => {
        const previousLikes = parseInt($likes.text());

        cy.get('article').first().find('svg:last').click().then(() => {
          const currentLikes = parseInt($likes.text())
          expect(currentLikes).to.below(previousLikes)
        });
      });

  });
});

describe('Top', () => {
    it('should redirect to page', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Top').click();
        cy.url().should('equal', 'http://localhost:3000/top');
    })
})

describe('Random', () => {
    it('should redirect to page', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Random').click();
        cy.url().should('equal', 'http://localhost:3000/random');
    })
})