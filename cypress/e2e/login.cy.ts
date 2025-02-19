describe("Halaman Login", () => {
    it("Kunjungi Halaman Login", () => {
        cy.visit("/auth/login");
        cy.get('[ type="text"]').type("admin6");
        cy.get('[type="password"]').type("@P3ciwaWa");
        cy.get('[type="submit" ]').click();
    })
})