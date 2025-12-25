describe('Burger Constructor Page', () => {
  beforeEach(() => {
    // Перехват всех API-запросов
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Подстановка моковых токенов
    cy.setCookie('accessToken', 'fakeAccessToken');
    localStorage.setItem('refreshToken', 'fakeRefreshToken');

    // Открываем страницу конструктора
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // Очистка токенов
    cy.clearCookies();
    localStorage.clear();
  });

  it('should add ingredients to constructor', () => {
    // Добавление булки
    cy.get('[data-cy="bun"]').first().as('bunItem');
    cy.get('@bunItem').find('button').click(); // Кнопка "Добавить"
    cy.get('[data-cy="constructor-bun-top"]').should(
      'contain',
      'Краторная булка N-200i (верх)'
    );

    // Добавление начинки
    cy.get('[data-cy="main"]').first().as('mainItem');
    cy.get('@mainItem').find('button').click();
    cy.get('[data-cy="constructor-ingredients"]').should(
      'contain',
      'Говяжий метеорит (отбивная)'
    );

    // Добавление соуса
    cy.get('[data-cy="sauce"]').first().as('sauceItem');
    cy.get('@sauceItem').find('button').click();
    cy.get('[data-cy="constructor-ingredients"]').should(
      'contain',
      'Соус Spicy-X'
    );
  });

  it('should open and close ingredient modal', () => {
    // Открытие модалки ингредиента
    cy.get('[data-cy="ingredient"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-title"]').should('contain', 'Детали ингредиента');

    // Закрытие по крестику
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Открытие снова и закрытие по оверлею
    cy.get('[data-cy="ingredient"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should create order', () => {
    // Собираем бургер (добавляем ингредиенты)
    cy.get('[data-cy="bun"]').first().find('button').click();
    cy.get('[data-cy="main"]').first().find('button').click();

    // Клик по "Оформить заказ"
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');

    // Проверка модалки с номером заказа
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '12345');

    // Закрытие модалки
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверка, что конструктор пуст
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .children()
      .should('have.length', 0);
  });
});
