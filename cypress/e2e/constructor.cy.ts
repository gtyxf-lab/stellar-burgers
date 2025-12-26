Cypress.on('uncaught:exception', () => false);

beforeEach(() => {
  cy.setCookie('accessToken', 'fakeAccessToken');
  localStorage.setItem('refreshToken', 'fakeRefreshToken');

  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept('GET', '**/ingredients', ingredients).as('getIngredients');
  });

  cy.fixture('user.json').then((user) => {
    cy.intercept('GET', '**/auth/user', user).as('getUser');
  });

  cy.fixture('order.json').then((order) => {
    cy.intercept('POST', '**/orders', order).as('createOrder');
  });

  cy.visit('/');
  cy.wait('@getIngredients');
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

describe('Burger Constructor Page', () => {
  it('should add ingredients to constructor', () => {
    cy.get('[data-cy="bun"] > li')
      .first()
      .find('button')
      .click({ force: true });
    cy.get('[data-cy="constructor-bun-top"]').should('exist');

    cy.get('[data-cy="main"] > li')
      .first()
      .find('button')
      .click({ force: true });
    cy.get('[data-cy="constructor-ingredients"]')
      .children()
      .should('have.length', 1);
  });

  it('should create order, show modal with number and clear constructor after close', () => {
    cy.get('[data-cy="bun"] > li')
      .first()
      .find('button')
      .click({ force: true });
    cy.get('[data-cy="main"] > li')
      .first()
      .find('button')
      .click({ force: true });

    cy.get('[data-cy="order-button"]').click({ force: true });
    cy.wait('@createOrder');

    cy.get('[data-cy="order-number"]').should('contain.text', '12345');

    cy.get('[data-cy="modal-close"]').click({ force: true });

    cy.get('[data-cy="modal-overlay"]').should('not.exist');

    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
  });

  it('should open and close ingredient modal', () => {
    // Кликаем по КАРТОЧКЕ ингредиента (не по кнопке "Добавить")
    cy.get('[data-cy="bun"] [data-cy="ingredient-card"]')
      .first()
      .click({ force: true });

    // Проверяем, что модалка открыта
    cy.get('[data-cy="modal"]').should('be.visible');

    // Проверяем имя ингредиента
    cy.get('[data-cy="ingredient-name"]').should(
      'contain.text',
      'Краторная булка'
    );

    // Закрываем по крестику
    cy.get('[data-cy="modal-close"]').click({ force: true });

    // Проверяем, что модалка закрыта
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
