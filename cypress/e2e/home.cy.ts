describe('Halaman Home', () => {
    it("Kunjungi Halaman Home", () => {
        cy.visit("/");
        cy.get("#section2").scrollIntoView();
    }
)
})