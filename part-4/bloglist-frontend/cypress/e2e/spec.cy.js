describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "test",
      name: "tester",
      password: "test123",
    };
    const newUser = {
      username: "hasNoBlogs",
      name: "User that has no blogs",
      password: "noBlogs",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.request("POST", "http://localhost:3003/api/users", newUser);
    cy.visit("http://localhost:5173");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("test");
      cy.get("#password").type("test123");
      cy.get("#login-button").click();

      cy.contains("tester logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("wrongUsername");
      cy.get("#password").type("test123");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("test");
      cy.get("#password").type("test123");
      cy.get("#login-button").click();

      cy.contains("new blog").click();
      cy.get("#form-title").type("cypress can create blog");
      cy.get("#form-author").type("Cypress");
      cy.get("#form-url").type("https://www.cypress.io/");
      cy.contains("create").click();
    });
    it("A blog can be created", function () {
      cy.get(".success")
        .should(
          "contain",
          `a new blog "cypress can create blog" by Cypress added`
        )
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });

    describe("after new blog added", function () {
      it("user can like that blog", function () {
        cy.contains("view").click();
        cy.contains("like").click();
        cy.get(".like-amount").contains("1");
      });

      it("user can delete that blog", async function () {
        await cy.contains("delete").click();
        cy.get(".blog-container").should("not.exist");
      });

      it("delete button only appears for user that active", function () {
        cy.contains("delete").should("exist");
        cy.contains("logout").click();
        cy.get("#username").type("hasNoBlogs");
        cy.get("#password").type("noBlogs");
        cy.get("#login-button").click();
        cy.get("delete").should("not.exist");
      });
    });
  });
});
