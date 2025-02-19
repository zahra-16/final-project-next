import { get } from "http";

describe("Halaman Search", () => {
    it("search", () => {
      cy.visit("/");
      cy.get('[name="searchklik"]').click(); 
      cy.get("input[placeholder='Search tools...']").type("Lampu").type('{enter}');
      cy.get('[name="submit"]').click();
      cy.wait(5000)
      cy.get('[name="close"]').click();
    });
  });
  